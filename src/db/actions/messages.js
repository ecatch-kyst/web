import {AUTH, USERS_FS, TIMESTAMP} from "../../lib/firebase"
import {flattenDoc} from "../../utils"

/**
 * Handles message changes.
 * @param {string} key
 * @param {any} value
 */
export function handle(key, value) {
  this.setState(({fields}) => ({
    fields: {
      ...fields,
      [key]: value
    }
  }))
}

/**
 * Submits a message form
 */
export async function submit(type) {
  const {AC, DS, PO, expectedFishingSpot, departure} = this.state.fields

  let message = {
    TM: type,
    timestampReceived: TIMESTAMP
  }
  switch (type) { // TODO: Populate message by type
  case "DEP":
    message = {
      ...message,
      AC: AC.value,
      DS: DS.value,
      PO: PO.value,
      departure: new Date(departure),
      expectedFishingSpot: [
        expectedFishingSpot.latitude,
        expectedFishingSpot.longitude
      ]
    }
    break
  default:
    break
  }

  try {
    // TODO: Add final validation before sending to firebase
    await USERS_FS.doc(AUTH.currentUser.uid).collection("messages").add({
      ...message,
      timestampCreated: new Date()
    })
    console.log("data sent")
  } catch (error) {
    console.log(error) // TODO: Add error notification
  }

}

/**
 * Listen to messages in Firebase for the logged in user.
 */
export function subscribe() {
  USERS_FS.doc(AUTH.currentUser.uid)
    .collection("messages")
    .onSnapshot(snap => {
      this.setState({messages: snap.docs.map(flattenDoc)})
    }, error => console.error(error)
    ) //TODO: Add error notification
}