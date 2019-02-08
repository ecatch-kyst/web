import {AUTH} from "../../lib/firebase"

/**
 * Logs the user in
 */
export async function login(email, password) {
  if (email && password) {
    await AUTH.signInWithEmailAndPassword(email, password)
  }
  else {
    AUTH.onAuthStateChanged(user => {
      if (user) {
        console.log("Successful login")
        this.setState({isLoggedIn: false})
      }
      else console.log("Not logged in")
    })
  }

}

/**
 * Logs the user out
 */
export async function logout() {
  try {
    await AUTH.signOut()
    console.log("Successful logout")
    this.setState({isLoggedIn: false})
  } catch (error) {
    console.log(error)
  }
}


/**
 * Deletes the user
 */
export async function deleteUser() {
  try {
    await AUTH.currentUser.delete()
    this.setState({isLoggedIn: false})
    console.log("User deleted")
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
    console.log("User profile updated")
  } catch (error) {
    console.log(error)
  }
}