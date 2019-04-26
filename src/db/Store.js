import React, {Component, createContext} from "react"
import {withRouter} from "react-router-dom"
import initValues from "./initialValues.json"
import {CONNECTION_REF} from "../lib/firebase"

import {
  firstTime,
  darkMode,
  user,
  location,
  dialog,
  messages,
  notification,
  customLists
} from "./actions"


const Store = createContext()

export const Database = withRouter(class extends Component {

  state = initValues

  async componentDidMount() {

    this.initDarkMode()
    this.initFirstTimeLogin()

    this.userLogin({afterLogin: () => {
      this.subscribeToMessages()
      this.subscribeToLocation()
      this.subscribeToCustomList("fishingSpots")
      this.subscribeToCustomList("ports")
      this.subscribeToCustomList("fishingGear")
      this.subscribeToCustomList("activity")
      this.subscribeToCustomList("species")
      this.subscribeToCustomList("fishingPermit")
      this.subscribeToCustomList("ZO")
      this.subscribeToFishOnBoard()
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

  // First Time Login
  initFirstTimeLogin = firstTime.init.bind(this)

  toggleFirstTimeLogin = firstTime.toggle.bind(this)

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


  userUpdateProfile = user.updateProfile.bind(this)

  userDelete = user.deleteUser.bind(this)

  // Location

  getLocation = location.get.bind(this)

  subscribeToLocation = location.subscribe.bind(this)

  unsubscribeFromLocation = location.unsubscribe.bind(this)

  // Messages

  constructMessage = messages.construct.bind(this)

  validateMessage = messages.validate.bind(this)

  handleFieldChange = messages.handle.bind(this)

  handleFieldError = messages.error.bind(this)

  submitMessage = messages.submit.bind(this)

  subscribeToMessages = messages.subscribe.bind(this)

  toggleDCAStart = messages.toggleDCAStart.bind(this)

  handleCancelTrip = messages.cancelTrip.bind(this)

  notifyAboutLastMessageStatus = messages.notifyAboutLastMessageStatus.bind(this)

  // Fish

  subscribeToFishOnBoard = messages.subscribeToFish.bind(this)

  changeFishOnBoard = messages.changeFish.bind(this)

  render() {
    return (
      <Store.Provider
        value={{
          handleToggleDarkMode: this.toggleDarkMode,
          handleToggleFirstTimeLogin: this.toggleFirstTimeLogin,
          handleUserUpdateProfile: this.userUpdateProfile,
          handleUserLogout: this.userLogout,
          handleUserLogin: this.userLogin,
          handleUserDelete: this.userDelete,
          handleDialog: this.handleDialog,
          notify: this.notify, // Call this, when a notification shold be shown. @see src/db/actions/notification for implementation
          processNotificationQueue: this.processNotificationQueue,
          notificationClose: this.notificationClose,
          handleFieldChange: this.handleFieldChange,
          handleFieldError: this.handleFieldError,
          handleCancelTrip: this.handleCancelTrip,
          submitMessage: this.submitMessage,
          validateMessage: this.validateMessage,
          constructMessage: this.constructMessage,
          addToCustomList: this.addToCustomList,
          handleCustomListChange: this.handleCustomListChange,
          toggleDCAStart: this.toggleDCAStart,
          changeFishOnBoard: this.changeFishOnBoard,
          ...this.state
        }}
      >
        {this.props.children}
      </Store.Provider>
    )
  }
})

export default Store