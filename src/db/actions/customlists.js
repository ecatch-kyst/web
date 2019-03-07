import {AUTH, USERS_FS, GEOPOINT} from "../../lib/firebase"
import {flattenDoc} from "../../utils"


/**
 * Submit a users own fishingspot to store //TODO: send to firebase
 * @param {int} value
 * @param {string} name
 * @param {string} longitude
 * @param {string} latitude
 */
export async function addSpot(){
  const {editing} = this.state.custom

  await USERS_FS.doc(AUTH.currentUser.uid).collection("fishingSpots").add({label: editing.name, value: GEOPOINT(parseInt(editing.latitude,10), parseInt(editing.longitude,10)), longitude:  parseInt(editing.longitude, 10), latitude: parseInt(editing.latitude,10), id: [editing.name, editing.latitude, editing.longitude].join("")})
  //location = new firebase.firestore.GeoPoint(editing.latitude, editing.longitude)
  this.setState(({custom}) => ({
    custom: {
      ...custom,
      editing: {}
    }}))
  this.notify({name: "addSpot", type: "success"})
}

/**
 *
 * @param {string} name
 * @param {object} value
 * sets the value from input in the addfishingspot dialog in store.editing
 */
export function handle({target: {name, value}}) {
  this.setState(({custom}) => ({
    custom: {
      ...custom,
      editing: {
        ...custom.editing,
        [name]: value
      }
    }
  }))
}
/**
 * Gets the custom list from Firebase for the logged in user.
 */
export function subscribe(){
  USERS_FS.doc(AUTH.currentUser.uid).collection("fishingSpots")
    .onSnapshot(snap => {
      this.setState({fishingSpots: snap.docs.map(flattenDoc)})
    }, error => console.error(error)
    )
}


/**
 * Function for sending fishingspot to firebase WIP
 */
export async function sending(type){
  try{
    const{fishingSpots} = this.state.custom.fishingSpots

    await USERS_FS.doc(AUTH.currentUser.uid).collection("fishingSpots").add({
      ...fishingSpots,
      fishingSpots
    })
    this.notify({name: `message.sent.${type}`, type: "success"})
  } catch ({code, message}){
    this.notify({name: `message.sent.${type}`, type: "error", message: [code, message].join(": ")})
  }


}