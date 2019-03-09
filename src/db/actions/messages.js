import {AUTH, USERS_FS, TIMESTAMP_SERVER, TIMESTAMP_CLIENT, GEOPOINT} from "../../lib/firebase"
import {flattenDoc} from "../../utils"
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
      DU, CA, ME, GS
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
        AC: AC.value,
        DS: DS.value,
        PO: PO.value,
        departure: new Date(departure),
        expectedFishingSpot: GEOPOINT(
          expectedFishingSpot.latitude,
          expectedFishingSpot.longitude
        ),
        expectedFishingStart: new Date(expectedFishingStart),
        OB: OB.reduce((acc, {value, inputValue}) => ({...acc, [value]: inputValue}), {})
      }
      break
    case "DCA":
      message = {
        ...message,
        AC: AC.value,
        AD: "NOR", // NOTE: Hardcoded
        QI: QI.value,
        TS: "", // ???
        fishingStart: new Date(fishingStart),
        ZO: ZO.value,
        startFishingSpot: GEOPOINT(
          startFishingSpot.latitude,
          startFishingSpot.longitude
        ),
        GE: GE.value,
        GP: GP.value,
        endFishingSpot: GEOPOINT(
          endFishingSpot.latitude,
          endFishingSpot.longitude
        ),
        GS: GS.value,
        DU,
        CA: CA.reduce((acc, {value, inputValue}) => ({...acc, [value]: inputValue}), {}),
        ME
      }
      break
    case "POR": //["timestamp", "TM", "AD", "PO", "portArrival", "OB", "LS", "KG"]
      message = {
        ...message,
        AD: "NOR", // NOTE: Hardcoded
        PO: PO.value,
        portArrival: new Date(portArrival),
        OB: OB.reduce((acc, {value, inputValue}) => ({...acc, [value]: inputValue}), {}),
        LS,
        KG: KG.reduce((acc, {value, inputValue}) => ({...acc, [value]: inputValue}), {})
      }
      break
    default:
      break
    }
    // TODO: Add final validation before sending to firebase
    await USERS_FS.doc(AUTH.currentUser.uid).collection("messages").add({
      ...message,
      created: TIMESTAMP_CLIENT()
    })
    this.notify({name: `message.sent.${type}`, type: "success"})
  } catch ({code, message}) {
    this.notify({name: `message.sent.${type}`, type: "error", message: [code, message].join(": ")})
  }

}

/**
 * Listen to messages in Firebase for the logged in user.
 */
export function subscribe() {
  USERS_FS.doc(AUTH.currentUser.uid)
    .collection("messages")
    .onSnapshot(snap => {
      this.setState({
        messages: snap.docs.map(flattenDoc).sort(sortByTimestamp)
      })
    }, error => console.error(error)
    ) //TODO: Add error notification
}


const sortByTimestamp = (a, b) => b.timestamp.toDate() - a.timestamp.toDate()