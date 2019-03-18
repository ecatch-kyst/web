import {AUTH, USERS_FS} from "../../lib/firebase"
import {flattenDoc} from "../../utils"


/**
 * Submit a custom input to a custom list to firebase
 * @param {string} type type of custom list
 */
export async function add(type){
  try {
    await USERS_FS.doc(AUTH.currentUser.uid).collection(type)
      .add(this.state.custom.editing)
    this.setState(({custom}) => ({ // reset edited custom input
      custom: {
        ...custom,
        editing: {}
      }
    }))

    this.notify({
      name: `customLists.${type}.added`,
      type: "success"
    })

  } catch (e) {
    this.notify({
      name: `customLists.${type}.added`,
      type: "error",
      message: [e.code, e.message].join(": ")
    })
    console.error(e)
  }

}

/**
 *
 * @param {string} name
 * @param {string | number} value
 * @param {'string' | 'number'} [type="string"]
 * Handles custom list inputs
 */
export function handle(name, value, type="string") {
  this.setState(({custom}) => ({
    custom: {
      ...custom,
      editing: {
        ...custom.editing,
        [name]: type==="number" ? parseInt(value, 10) : value
      }
    }
  }))
}

/**
 * Subscribe to custom lists in Firebase
 * @param {string} type type of the list
 */
export function subscribe(type){
  USERS_FS.doc(AUTH.currentUser.uid).collection(type)
    .onSnapshot(snap => {
      this.setState(({custom}) => ({
        custom: {
          ...custom,
          [type]: snap.docs.map(flattenDoc)
        }
      }))
    }, ({code, message}) => {
      this.notify({name: "customLists.subscribe", type: "error", message: [code, message].join(": ")})
    }
    )
}