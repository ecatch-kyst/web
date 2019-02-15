import React, {Component, createContext} from "react"
import initValues from "./initialValues.json"
import {CONNECTION_REF} from "../lib/firebase"

import * as darkMode from "./actions/darkMode"
import {login, updateProfile, logout, deleteUser} from "./actions/users"
import * as dialog from './actions/dialog'
import * as notification from './actions/notification'

const Store = createContext()

export class Database extends Component {

  state = initValues

  async componentDidMount() {

    this.initDarkMode()

    this.userLogin()

    setTimeout(() => {
      CONNECTION_REF
        .on("value", snap => {
          const isOffline = !snap.val()
          isOffline ?
            this.notify({name: "offline", type: "error", action: () => window.location.reload(), duration: Infinity}) :
            this.resetNotification()
          this.setState({isOffline})
        })
    }, 2000
    )

  }

  // Dark mode
  initDarkMode = darkMode.init.bind(this)

  toggleDarkMode = darkMode.toggle.bind(this)

  // Dialog
  handleDialog = dialog.handle.bind(this)

  resetDialog = dialog.reset.bind(this)

  // Notification
  notify = notification.handle.bind(this)

  resetNotification = notification.reset.bind(this)


  // User
  userLogin = login.bind(this)

  userLogout = logout.bind(this)

  userDelete = deleteUser.bind(this)

  userUpdateProfile = updateProfile.bind(this)

  render() {
    return (
      <Store.Provider
        value={{
          handleToggleDarkMode: this.toggleDarkMode,
          handleUserUpdateProfile: this.userUpdateProfile,
          handleUserLogout: this.userLogout,
          handleUserLogin: this.userLogin,
          handleUserDelete: this.userDelete,
          handleDialog: this.handleDialog,
          notify: this.notify,
          handleNotificationReset: this.resetNotification,
          ...this.state
        }}
      >
        {this.props.children}
      </Store.Provider>
    )
  }
}

export default Store