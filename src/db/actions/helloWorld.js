import initValues from "../initialValues.json"

/**
 * Test function
 */
export default function helloWorld() {
  alert(this.state.value)
}

/**
 * Change store value
 * @param {string} value
 */
export function changeValue(value) {
  this.setState({value: value === "" ? initValues.value : value})
}