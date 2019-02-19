import React, {Component, createContext} from "react"
import {format} from "date-fns"
import initValues from "./initialValues.json"
import {CONNECTION_REF} from "../lib/firebase"

import * as darkMode from "./actions/darkMode"
import {login, updateProfile, logout, deleteUser} from "./actions/users"
import * as dialog from './actions/dialog'
import * as messages from './actions/messages'
import * as notification from './actions/notification'

const Store = createContext()

export class Database extends Component {

  state = {
    ...initValues,
    fields: {
      ZD: format(Date.now(), "yyyy-MM-dd"),
      ZT: format(Date.now(), "HH:mm:ss")
    }
  }

  async componentDidMount() {

    this.initDarkMode()

    this.userLogin({afterLogin: () => {
      this.subscribeToMessages()
    }})


    setTimeout(() => {
      CONNECTION_REF
        .on("value", snap => {
          const isOffline = !snap.val()

          isOffline &&
            this.notify({
              name: "offline", type: "error", action: () => window.location.reload(), duration: 5000
            })
          this.setState({isOffline})
        })
    }, 2500
    )

  }

  // Dark mode
  initDarkMode = darkMode.init.bind(this)

  toggleDarkMode = darkMode.toggle.bind(this)

  // Dialog
  handleDialog = dialog.handle.bind(this)

  resetDialog = dialog.reset.bind(this)

  // Notification
  notificationQueue = []

  notify = notification.handle.bind(this)

  processNotificationQueue = notification.processQueue.bind(this)

  notificationClose = notification.close.bind(this)


  // User
  userLogin = login.bind(this)

  userLogout = logout.bind(this)

  userDelete = deleteUser.bind(this)

  userUpdateProfile = updateProfile.bind(this)


  // Messages

  handleFieldChange = messages.handle.bind(this)

  submitMessage = messages.submit.bind(this)

  subscribeToMessages = messages.subscribe.bind(this)

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
          notify: this.notify, // Call this, when a notification shold be shown. @see src/db/actions/notification for implementation
          processNotificationQueue: this.processNotificationQueue,
          notificationClose: this.notificationClose,
          handleFieldChange: this.handleFieldChange,
          submitMessage: this.submitMessage,
          ...this.state
        }}
      >
        {this.props.children}
      </Store.Provider>
    )
  }
}

export default Store