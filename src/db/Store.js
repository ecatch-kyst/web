import React, {Component} from "react"
import helloWorld, {changeValue} from "./actions/helloWorld"
import initValues from "./initialValues.json"
import {DB} from "../lib/firebase"

const Store = React.createContext()

export class Database extends Component {

  state = {
    ...initValues
  }

  async componentDidMount() {
    try {
      const value = (await DB.ref("test").once("value")).val()
      this.setState({value})
    } catch (error) {
      console.log(error)
    }
  }

  helloWorld = helloWorld.bind(this)

  changeValue = changeValue.bind(this)

  render() {
    return (
      <Store.Provider
        value={{
          handleHelloWorld: this.helloWorld,
          handleChangeValue: this.changeValue,
          ...this.state
        }}
      >
        {this.props.children}
      </Store.Provider>
    )
  }
}

export default Store