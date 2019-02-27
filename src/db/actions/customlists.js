import {AUTH, USERS_FS} from "../../lib/firebase"
import {flattenDoc} from "../../utils"


/**
 * Submit a users own fishingspot to store //TODO: send to firebase
 * @param {int} value
 * @param {string} name
 * @param {string} longitude
 * @param {string} latitude
 */
export function addSpot(){
  const {editing} = this.state.custom
  this.setState(({custom}) => ({
    custom: {
      ...custom,
      fishingspots: [
        ...custom.fishingspots,
        editing
      ],
      editing: {}
    }
  }))
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
export function retrieve(){
  USERS_FS.doc(AUTH.currentUser.uid).collection("fishingspots")
    .onSnapshot(snap => {
      this.setState({fishingspots: snap.docs.map(flattenDoc)})
    }, error => console.error(error)
    )
}


/**
 * Function for sending fishingspot to firebase WIP
 */
export async function sending(type){
  try{
    const{fishingspots} = this.state.custom.fishingspots

    await USERS_FS.doc(AUTH.currentUser.uid).collection("fishingspots").add({
      ...fishingspots,
      fishingspots
    })
    this.notify({name: `message.sent.${type}`, type: "success"})
  } catch ({code, message}){
    this.notify({name: `message.sent.${type}`, type: "error", message: [code, message].join(": ")})
  }


}