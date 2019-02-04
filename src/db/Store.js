import React, {Component, createContext} from "react"
import helloWorld, {changeValue} from "./actions/helloWorld"
import initValues from "./initialValues.json"
import {DB, CONNECTION_REF} from "../lib/firebase"
import {login, updateProfile, logout} from "./actions/users"

const Store = createContext()

export class Database extends Component {

  state = {
    ...initValues,
    isOffline: false
  }

  async componentDidMount() {

    this.userLogin()

    CONNECTION_REF
      .on("value", snap => this.setState({isOffline: !snap.val()}))

    try {
      const value = (await DB.ref("test").once("value")).val()
      this.setState({value})
    } catch (error) {
      console.log(error)
    }
  }


  helloWorld = helloWorld.bind(this)

  changeValue = changeValue.bind(this)


  // User
  userLogin = login.bind(this)

  userLogout = logout.bind(this)

  userUpdateProfile = updateProfile.bind(this)

  render() {
    return (
      <Store.Provider
        value={{
          handleHelloWorld: this.helloWorld,
          handleChangeValue: this.changeValue,
          handleUserUpdateProfile: this.userUpdateProfile,
          handleUserLogout: this.userLogout,
          handleUserLogin: this.userLogin,
          ...this.state
        }}
      >
        {this.props.children}
      </Store.Provider>
    )
  }
}

export default Store