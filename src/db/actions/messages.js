/* eslint-disable no-console */
import {AUTH, USERS_FS, TIMESTAMP_SERVER, TIMESTAMP_CLIENT, GEOPOINT, FS} from "../../lib/firebase"
import {flattenDoc, validate} from "../../utils"
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
 * Submits a message form
 */
export async function submit(type) {
  try {
    const {
      AC, DS, PO, OB, KG,
      portArrival, LS,
      expectedFishingSpot, departure,
      expectedFishingStart, QI, fishingStart,
      ZO, startFishingSpot, GE, GP,
      endFishingSpot,
      DU, CA, GS, ME
    } = this.state.fields

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

    let error
    Object.entries(message).forEach(([k, v]) => {
      const result = validate(k, v) // Validating the field
      if (result.error) {
        error = true
        this.handleFieldError(k, true)
      }
    })
    if (error) {
      this.notify({name: "fields.invalid-form", type: "error"})
      return
    }

    if (this.state.isOffline) {
      this.notify({name: `message.sent.offline`, type: "warning"})
    }

    let successRoute = routes.TRIPS
    if (this.state.trips.length && !this.state.trips[0].isFinished) {
      successRoute = `${routes.TRIPS}/${this.state.trips[0].id}`
    }

    console.log(message)

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