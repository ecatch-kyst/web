import React, {Component, createContext} from "react"
import initValues from "./initialValues.json"
import {CONNECTION_REF} from "../lib/firebase"

import {
  darkMode,
  user,
  location,
  dialog,
  messages,
  notification,
  customLists
} from "./actions"


const Store = createContext()

export class Database extends Component {

  state = {
    ...initValues,
    fields: {
      departure: null, // Time of departure
      PO: null, // Land & port
      expectedFishingStart: "", // Expected time of fishing start
      DS: "", // Expected fish art
      OB: {}, // Fish type and weight,
      KG: {}, // Fish type and weight,
      CA: {}, // Fish type and weight,
      expectedFishingSpot: {},
      startFishingSpot: {},
      endFishingSpot: {},
      QI: 1, // Fishing permit
      AC: "FIS", // Fishing activity
      GP: 0, // Gear problem
      ZO: "NOR", // Fishing zone
      DU: 0 // Duration of activity
    },
    custom: {
      editing: {},
      fishingSpots: []
    }
  }

  async componentDidMount() {

    this.initDarkMode()

    this.userLogin({afterLogin: () => {
      this.subscribeToMessages()
      this.subscribeToLocation()
      this.subscribeToCustomList("fishingSpots")
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

  // Custom lists

  addToCustomList = customLists.add.bind(this)

  handleCustomListChange = customLists.handle.bind(this)

  subscribeToCustomList = customLists.subscribe.bind(this)


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
  userLogin = user.login.bind(this)

  userLogout = user.logout.bind(this)

  userDelete = user.deleteUser.bind(this)

  // Location

  getLocation = location.get.bind(this)

  subscribeToLocation = location.subscribe.bind(this)

  unsubscribeFromLocation = location.unsubscribe.bind(this)

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
          addToCustomList: this.addToCustomList,
          handleCustomListChange: this.handleCustomListChange,
          ...this.state
        }}
      >
        {this.props.children}
      </Store.Provider>
    )
  }
}

export default Store