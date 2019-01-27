import React, {Component} from "react"
import helloWorld, {changeValue} from "./actions/helloWorld"
import initValues from "./initialValues.json"

const Store = React.createContext()

export class Database extends Component {

  state = {
    ...initValues
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