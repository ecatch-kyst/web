import {AUTH} from "../../lib/firebase"

/**
 * Logs the user in
 */
export async function login(email, password) {
  try {
    await AUTH.signInWithEmailAndPassword(email, password)
  } catch (error) {
    if (error.code !== "auth/argument-error") {
      // TODO: Add translations for all possible error codes
      this.notify({name: "login", type: `error.${error.code}`, duration: 5000})
    }
  } finally {
    AUTH.onAuthStateChanged(user => {
      if (user) {
        this.notify({name: "login"})
        this.setState({isLoggedIn: true})
      }
      // else this.notify({name: "login", type: "warning", duration: 5000})
    }//, () => {this.notify({name: "login", type: "error", duration: 5000})}
    )
  }

}

/**
 * Logs the user out
 */
export async function logout() {
  try {
    await AUTH.signOut()
    this.notify({name:"logout"})
    this.setState({isLoggedIn: false})
  } catch (error) {
    this.notify({name:"logout", type: "error"})
  }
}


/**
 * Deletes the user
 */
export async function deleteUser() {
  try {
    await AUTH.currentUser.delete()
    this.setState({isLoggedIn: false, openModal: false})
    this.notify({name: "user.deleted"})
  } catch (error) {
    console.log(error)
  }
}


/**
 * Updates the user's name
 * @param {object} profile
 * @param {string} [profile.name] The user's name
 */
export async function updateProfile(profile) {
  try {
    await AUTH.currentUser.updateProfile(profile)
    this.notify({name: "user.updated"})
  } catch (error) {
    console.log(error)
  }
}