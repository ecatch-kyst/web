import {AUTH} from "../../lib/firebase"

/**
 * Logs the user in
 */
export async function login(email, password) {
  if (email && password)
    await AUTH.signInWithEmailAndPassword(email, password)
  AUTH.onAuthStateChanged(user => {
    if (user) {
      console.log("Successful login")
      const {uid, displayName, email, emailVerified} = user
      this.setState({user: {
        uid, displayName, email, emailVerified
      }})

    } else console.log("Not logged in")

  })

}

/**
 * Logs the user out
 */
export async function logout() {
  try {
    await AUTH.signOut()
    this.setState({user: {}})
  } catch (error) {
    console.log(error)
  }
}


/**
 * Deletes the user
 */
export async function deleteUser() {
  try {
    AUTH.currentUser.delete()
    this.setState({user: {}})
  } catch (error) {
    console.log(error)
  }
}

/**
 * Updates the user's name and photo
 */
export async function updateProfile(profile) {
  try {
    await AUTH.currentUser.updateProfile(profile)

    const {uid, displayName, email, emailVerified} = AUTH.currentUser

    this.setState({user: {
      uid, displayName, email, emailVerified
    }})

    console.log("User profile updated")
  } catch (error) {
    console.log(error)

  }
}