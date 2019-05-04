import React, {Component, createContext} from "react"
import {withRouter} from "react-router-dom"
import initValues from "./initialValues.json"

import {
  darkMode,
  user,
  dialog,
  messages,
  notification,
  customLists
} from "./actions"


/*
 * Used for global state management, (No Redux needed!)
 * @see https://reactjs.org/docs/context.html
 * If you can't live without Redux, still don' use it. You don't need it!
 * try the React hook useReducer(), that COMES WITH REACT already.
 * Smaller bundle, happy user. 😉
 * @see https://reactjs.org/docs/hooks-reference.html#usereducer
 */
const Store = createContext()

export const Database = withRouter(class extends Component {

  // The global state object
  state = initValues

  async componentDidMount() {
    this.initDarkMode()
    this.userLogin({afterLogin: () => {
      this.subscribeToMessages()
      // TODO: Simplify!
      this.subscribeToCustomList("fishingSpots")
      this.subscribeToCustomList("ports")
      this.subscribeToCustomList("fishingGear")
      this.subscribeToCustomList("activity")
      this.subscribeToCustomList("species")
      this.subscribeToCustomList("fishingPermit")
      this.subscribeToCustomList("ZO")
      this.subscribeToFishOnBoard()
    }})
  }


  /*
   * Binding these functions here, so they are aware of
   * the this conext, making it possible for them
   * to mutate global state, and call other Store functions
   */

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


  userUpdateProfile = user.updateProfile.bind(this)

  userDelete = user.deleteUser.bind(this)

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


  /*
   * Functions/state in the value object are globally accessible
   * in the whole app
   */
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