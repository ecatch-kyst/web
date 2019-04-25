/* eslint-disable no-console */
import {AUTH, USERS_FS, TIMESTAMP_SERVER, TIMESTAMP_CLIENT, GEOPOINT, FS} from "../../lib/firebase"
import {flattenDoc, validate as validateField} from "../../utils"
import {routes} from "../../lib/router"
/**
 * Handles message changes.
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

/**
 *
 * @param {*} type
 */
export function construct(type) {
  const {
    AC, DS, PO, KG, OB,
    portArrival, LS,
    expectedFishingSpot, departure,
    expectedFishingStart, QI, fishingStart,
    ZO, startFishingSpot, GE, GP,
    endFishingSpot,
    DU, GS, ME, ...fields
  } = this.state.fields

  /**
 * Helper function
 * Removes fish with 0 kg weight
 */
  const CA = Object.entries(fields.CA).reduce((acc, [type, weight]) => {
    if(weight) acc[type] = weight
    return acc
  }, {})

  let message = {
    TM: type,
    timestamp: TIMESTAMP_SERVER,
    MA: AUTH.currentUser.displayName
  }
  switch (type) { // TODO: Populate message by type
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
  case "DCA":
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
      DU,
      CA
    }
    if (["OTB", "OTM", "TBS"].includes(GE)) message.GS = GS
    if (["OTB", "OTM", "SSC", "GEN", "TBS"].includes(GE)) message.ME = ME
    break

  // TODO: ADD DCA0 case
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
 * Submits a message form
 */
export async function submit(message) {
  const type = message.TM
  this.changeFishOnBoard(type)
  try {

    if (this.state.isOffline) {
      this.notify({name: `message.sent.offline`, type: "warning"})
    }

    let successRoute = routes.TRIPS
    if (this.state.trips.length && !this.state.trips[0].isFinished) {
      successRoute = `${routes.TRIPS}/${this.state.trips[0].id}`
    }

    await USERS_FS.doc(AUTH.currentUser.uid).collection("messages").add({
      ...message,
      created: TIMESTAMP_CLIENT()
    })

    this.props.history.push(successRoute)
    this.notify({name: `message.sent.${type}`, type: "success"})
    this.toggleDCAStart(false)
  } catch ({code, message}) {
    this.notify({name: `message.sent.${type}`, type: "error", message: [code, message].join(": ")})
  }
}


/**
 *
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
          Object.entries(message.CA).forEach(([type, weight]) => {
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