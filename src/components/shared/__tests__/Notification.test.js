import {Notification} from ".."
import {Action} from "../Notification"

import "../../../hooks"


// TODO: Finish

jest.mock("../../../hooks", () => ({
  useNotification: () => ({
    handleAction: jest.fn(),
    notify: jest.fn(),
    processQueue: [],
    close: jest.fn()
  })
}))

describe("Notification component", () => {
  const props = {}
  const wrapper = shallow(<Notification {...props}/>)

  it("renders correctly", () => {
    expect(wrapper).toHaveLength(1)
  })

  describe("handle Notification close", () => {
    it("clickaway should do nothing", () => {
      wrapper.simulate("close", {}, "clickaway")
    })
    it("closing the notification", () => {
      wrapper.simulate("close")
    })
  })
})


describe("Action component", () => {
  const wrapper = shallow(<Action/>)

  it("renders correctly", () => {
    expect(wrapper.dive()).toHaveLength(1)
  })

  describe("Button is colored", () => {
    [
      ["default", "#3f51b5"],
      ["info", "#00A9E7"],
      ["error", "#A8112B"],
      ["warning", "#FFCE00"],
      ["success", "#51c1b7"]
    ].forEach(([type, color]) => {
      it(`${type} is ${color}`, () => {
        wrapper.setProps({type})
        expect(wrapper.dive().prop("style").color).toBe(color)
      })
    })
  })
})