/* eslint-disable no-console */
import {AUTH, USERS_FS, TIMESTAMP_SERVER, TIMESTAMP_CLIENT, GEOPOINT, FS} from "../../lib/firebase"
import {flattenDoc, validate as validateField} from "../../utils"
import {routes} from "../../lib/router"


/**
 * Handles message changes. It can take either a name value pair,
 * or an Object, that can be merged into the global fields object.
 * Useful if you have more than one field change at the same time.
 * @param {string} key
 * @param {any} value
 */
export function handle(...args) {
  if (args.length === 1 && typeof args[0] === "object") {

    this.setState(({fields}) => ({
      fields: {
        ...fields,
        ...args[0]
      }
    }))
  } else {

    this.setState(({fields}) => ({
      fields: {
        ...fields,
        [args[0]]: args[1]
      }
    }))
  }
}


// TODO: Use schema.json to add fields correctly that are dependent on other fields.
/**
 * Generating a message according to type. It takes the content of
 * the fields object in the global Store Context, and returns a
 * fully formatted message, that is ready to be sent to firebase
 * @param {*} type message type
 */
export function construct(type) {
  const {
    fields: {AC, DS, PO, KG, OB,
      portArrival, LS,
      expectedFishingSpot, departure,
      expectedFishingStart, QI, fishingStart,
      ZO, startFishingSpot, GE, GP,
      endFishingSpot,
      DU, GS, ME, ...fields},
    messages
  } = this.state


  let message = {
    TM: type,
    RN: messages[messages.length - 1].RN + 1,
    /*
     * NOTE: This is not the same as TIMESTAMP_CLIENT! This will be evaluated
     * to an actual Timestamp object on server-side,
     * meaning it will hold the receival time of the message, not the sending.
     * Can be useful.
     */
    timestamp: TIMESTAMP_SERVER,
    MA: AUTH.currentUser.displayName
  }
  switch (type) {
  case "DEP":
    message = {
      ...message,
      AC,
      DS,
      PO,
      departure: new Date(departure),
      expectedFishingSpot: GEOPOINT(expectedFishingSpot.latitude, expectedFishingSpot.longitude),
      expectedFishingStart: new Date(expectedFishingStart),
      OB
    }
    break
  case "DCA": {

    message = {
      ...message,
      AC,
      AD: "NOR", // NOTE: Hardcoded
      QI,
      TS: "", // ???
      fishingStart: new Date(fishingStart),
      ZO,
      startFishingSpot,
      GE,
      GP,
      endFishingSpot,
      DU
    }
    /**
     * Helper function
     * Removes fish with 0 kg weight
     */
    const CA = Object.entries(fields.CA || {}).reduce((acc, [type, weight]) => {
      if(weight) acc[type] = weight
      return acc
    }, {})
    if (["FIS"].includes(AC)) message.CA = CA
    if (["OTB", "OTM", "TBS"].includes(GE)) message.GS = GS
    if (["OTB", "OTM", "SSC", "GEN", "TBS"].includes(GE)) message.ME = ME
    break
  }
  case "POR": //["timestamp", "TM", "AD", "PO", "portArrival", "OB", "LS", "KG"]
    message = {
      ...message,
      AD: "NOR", // NOTE: Hardcoded
      PO,
      portArrival: new Date(portArrival),
      OB,
      LS,
      KG
    }
    break
  default:
    break
  }
  return message
}


/**
 * Sending a message to Firebase.
 * @param {Object} message the message object to be sent, constructed with construct()
 */
export async function submit(message) {
  const type = message.TM
  this.changeFishOnBoard(type)
  try {
    /*
     * Notify user, if they are offline, that the message
     * will have a pending status, until online again.
     */
    if (!navigator.onLine) {
      this.notify({name: `message.sent.offline`, type: "warning", duration: 8000})
    }

    // Handling redirecting
    let successRoute = routes.TRIPS
    if (this.state.trips.length && !this.state.trips[0].isFinished) {
      successRoute = `${routes.TRIPS}/${this.state.trips[0].id}`
    }

    // Redirect the user to the right page.
    this.props.history.push(successRoute)

    // Send to firebase
    await USERS_FS.doc(AUTH.currentUser.uid).collection("messages").add({
      ...message,
      /*
       * Append timestamp at the last stage, right before sending
       * A Firebase Timestamp object
       * @see https://firebase.google.com/docs/reference/android/com/google/firebase/Timestamp
       */
      created: TIMESTAMP_CLIENT()
    })

    // Notify about successful sending. (Not the same as ACK)
    this.notify({name: `message.sent.${type}`, type: "success"})
    // Reset DCAStart. NOTE: move this to a more appropriate place?
    this.toggleDCAStart(false)
  } catch ({code, message}) {
    // Notify about sending errors
    this.notify({name: `message.sent.${type}`, type: "error", message: [code, message].join(": ")})
  }
}


/**
 * Go through all the fields, and validate them.
 * @param {ojbect} message
 * @param {boolean} DCAStart
 */
export function validate(message, DCAStart) {
  let error
  Object.entries(message).forEach(([field, value]) => {
    if (value === "DCA0" && field === "TM" && DCAStart) {
      return
    }
    const result = validateField(field, value) // Validating the field
    if (result.error) {
      error = true
      this.notify({name: `fields.${result.reason}`, type: "error"})
      this.handleFieldError(field, true)
    }
  })
  return !error
}

/**
 * Creates an "empty" DCA and a POR message based on the DEP
 * DCA and POR are batched for integrity.
 */
export async function cancelTrip() {
  try {
    const activeTrips = this.state.trips[0]
    console.log(activeTrips)
    const messageBatch = FS.batch()
    messageBatch.set({}) // Empty DCA

    messageBatch.set({}) // POR from DEP
    await messageBatch.commit()
    this.notify({name: `message.sent.cancel`, type: "success"})
  } catch (error) {
  }
}

/**
 * Calculates current fish onboard
 * @param {string} type
 */
export function changeFish(type){
  let fish = {}
  let direction = 1
  switch (type) {
  case "DCA":
    fish = this.state.fields.CA
    break
  case "POR":
    fish = this.state.fields.KG
    direction = -1
    break
  default:
    return
  }
  const fishOnBoard = {...this.state.fishOnBoard}
  Object.entries(fish).forEach(([type, weight]) => {
    fishOnBoard[type] = (fishOnBoard[type] || 0) + direction * weight
    !fishOnBoard[type] && delete fishOnBoard[type]
  })
  USERS_FS.doc(AUTH.currentUser.uid).update({
    fishOnBoard
  })
}

/**
 * Listen to messages in Firebase for the logged in user.
 */
export function subscribe() {
  USERS_FS.doc(AUTH.currentUser.uid)
    .collection("messages")
    .orderBy("timestamp", "asc")
    .onSnapshot(
      snap => {
        if (!snap.empty) {
          const messages = snap.docs.map(flattenDoc).map(m => Object.entries(m).reduce((acc, [key,value]) => {
            return ({...acc, [key]: key !== "timestamp" && value.toDate ? value.toDate() : value})
          }
          , {}))
          this.notifyAboutLastMessageStatus(this.state.messages[this.state.messages.length - 1], messages[messages.length - 1] )
          const trips = generateTrips(messages)
          const isEnRoute = !trips[0].isFinished
          this.setState({messages, isEnRoute, trips})
        }
      },
      error => {
        this.notify({name: "yooo", type: "error"})
        console.error(error)
      }
    ) //TODO: Add error notification
}
/***/
export function subscribeToFish() {
  USERS_FS.doc(AUTH.currentUser.uid)
    .onSnapshot(
      snap => {
        if (!snap.empty) {
          const fishOnBoard = snap.data().fishOnBoard
          if(fishOnBoard) this.setState({fishOnBoard})
        }
      },
      error => console.error(error)
    ) //TODO: Add error notification
}
/**
 * Send notification to the user about the last message's status
 * @param {*} oldMessage
 * @param {*} newMessage
 */
export function notifyAboutLastMessageStatus (oldMessage, newMessage) {
  if ((oldMessage && !oldMessage.result) && newMessage.result) {
    this.notify({
      duration: 8000,
      name: `message.responses.${newMessage.result.RS}`,
      message: newMessage.RN,
      type: newMessage.result.RS === "ACK" ? "success" : "error"
    })
  }
}

/**
 * A full Trip object contains
 * a POR, a DEP, and one or more DCA messages.
 * In time, POR is the earliest, DCA is the latest,
 * with DCAs between those two.
 * @typedef Trip
 * @property {DEP} DEP
 * @property {DCA[]} DCAList
 * @property {POR} POR
 * @property {Date} start
 * @property {Date} end
 * @property {object} fish
 *
 *
 * @param {Message[]} messages
 * @returns {Trip[]}
 */
const generateTrips = messages => {
  let isTripFinished = false
  return messages
    .reduce((acc, message) => {
      const lastTripIndex = acc.length-1
      switch (message.TM) {
      case "DEP": {
        isTripFinished = false
        acc.push({
          id: message.id,
          DEP: message,
          POR: null,
          start: message.created,
          startPort: message.PO,
          DCAList: [],
          end: null,
          isFinished: false,
          fish: {}
        })
        return acc
      }
      case "DCA": {
        if (!isTripFinished) {
          Object.entries(message.CA || {}).forEach(([type, weight]) => {
            if (acc[lastTripIndex].fish[type]) {
              acc[lastTripIndex].fish[type] += weight
            } else {
              acc[lastTripIndex].fish[type] = weight
            }
          })
          acc[lastTripIndex].DCAList.push(message)
        }
        return acc
      }
      case "POR": {
        isTripFinished = true
        acc[lastTripIndex] = {
          ...acc[lastTripIndex],
          POR: message,
          end: message.portArrival,
          endPort: message.PO,
          isFinished: true
        }
        return acc
      }

      default:
        return acc
      }
    }, [])
    .sort((a, b) => b.start - a.start)
}

export function toggleDCAStart(DCAStarted){
  this.setState({DCAStarted})
}

/**
 *
 * @param  {...any} args
 */
export function error(...args) {
  if (args.length === 1 && typeof args[0] === "object") {

    this.setState(({errors}) => ({
      errors: {
        ...errors,
        ...args[0]
      }
    }))
  } else {

    this.setState(({errors}) => ({
      errors: {
        ...errors,
        [args[0]]: args[1]
      }
    }))
  }
}