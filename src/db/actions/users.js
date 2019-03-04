import {AUTH} from "../../lib/firebase"

/**
 * Logs the user in
 */
export async function login({email, password, afterLogin=null}) {
  try {
    await AUTH.signInWithEmailAndPassword(email, password)
  } catch (error) {
    switch (error.code) {
    case "auth/invalid-email":
      this.notify({name: "login", type: `error.${error.code}`, duration: 5000})
      break
    case "auth/wrong-password":
      this.notify({name:"login", type: `error.${error.code}`, duration: 5000})
      break
    case "auth/user-disabled":
      this.notify({name:"login", type: `error.${error.code}`, duration: 5000})
      break
    case "auth/user-not-found":
      this.notify({name:"login", type: `error.${error.code}`, duration: 5000})
      break
    case "auth/invalid-password":
      this.notify({name:"login", type: `error.${error.code}`, duration: 5000})
      break
    case "auth/invalid-phone-number":
      this.notify({name:"login", type: `error.${error.code}`, duration: 5000})
      break
    case "auth/email-already-exists":
      this.notify({name:"login", type: `error.${error.code}`, duration: 5000})
      break
    default:
      console.log(error)
      break
    }
  } finally {
    AUTH.onAuthStateChanged(user => {
      if (user) {
        if (!this.state.isLoggedIn) { // First AuthStateChanged
          this.notify({name: "login"})
          this.setState({isLoggedIn: true, isLoading: false})
          if (afterLogin) afterLogin()
        }
      }
      else {
        this.setState({isLoading: false})
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