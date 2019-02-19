
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
  const {fields} = this.state
  let message = {TM: type, DA: TIMESTAMP, TI: TIMESTAMP}
  switch (type) { // TODO: Populate message by type
  case "DCA":
    message = {
      ...message,
      ZD: fields.ZD,
      ZT: fields.ZT
    }
    break

  default:
    break
  }

  try {
    // TODO: Add final validation before sending to firebase
    await USERS_FS.doc(AUTH.currentUser.uid).collection("messages").add(message)
    console.log("data sent")
  } catch (error) {
    console.log(error) // TODO: Add error notification
  }

}