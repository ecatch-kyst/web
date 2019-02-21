import React, {Component, createContext} from "react"
import initValues from "./initialValues.json"
import toggleDarkMode from "./actions/darkMode"
import {CONNECTION_REF} from "../lib/firebase"
import {login, updateProfile, logout, deleteUser} from "./actions/users"

const Store = createContext()

export class Database extends Component {

  state = initValues

  async componentDidMount() {

    this.userLogin()

    CONNECTION_REF
      .on("value", snap => this.setState({isOffline: !snap.val()}))

  }

  toggleDarkMode = toggleDarkMode.bind(this)


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
          ...this.state
        }}
      >
        {this.props.children}
      </Store.Provider>
    )
  }
}

export default Store