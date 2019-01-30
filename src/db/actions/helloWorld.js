import initValues from "../initialValues.json"
import {DB} from "../../lib/firebase.js"

/**
 * Test function
 */
export default async function helloWorld() {
  try {
    await DB.ref("test").set(this.state.value)
    console.log(`${this.state.value} set`)
  } catch (error) {
    console.log(error)
  }
}

/**
 * Change store value
 * @param {string} value
 */
export function changeValue(value) {
  this.setState({value: value === "" ? initValues.value : value})
}