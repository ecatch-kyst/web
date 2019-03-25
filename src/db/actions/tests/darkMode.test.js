import {Component} from "react"
import {init, toggle} from "../darkMode"

localStorage.setItem("isDarkMode", true)

class TestClass extends Component {

  componentDidMount() {
    this.initDarkMode()
  }

  notify = jest.fn()

  initDarkMode = init.bind(this)

  handleToggleDarkMode = toggle.bind(this)

  render() {
    return <div onClick={this.handleToggleDarkMode}/>
  }
}

it("darkMode is initiated", () => {
  const wrapper = shallow(<TestClass/>)
  expect(wrapper.state("isDarkMode")).toBe(true)
})

it("darkMode is toggled", () => {
  const wrapper = shallow(<TestClass/>)
  wrapper.simulate("click")
  expect(JSON.parse(localStorage.getItem("isDarkMode"))).toBe(false)
  expect(wrapper.state("isDarkMode")).toBe(false)

  wrapper.simulate("click")
  expect(JSON.parse(localStorage.getItem("isDarkMode"))).toBe(true)
  expect(wrapper.state("isDarkMode")).toBe(true)
})