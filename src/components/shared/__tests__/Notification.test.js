import {Notification} from ".."
import {Action} from "../Notification"

import "../../../hooks"
import {SnackbarContent} from "@material-ui/core"


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

  describe.skip("Notification is colored", () => { // TODO: Mock useNotification differently on each test
    [
      ["default", "#3f51b5"],
      ["info", "#00A9E7"],
      ["error", "#A8112B"],
      ["warning", "#FFCE00"],
      ["success", "#51c1b7"]
    ].forEach(([type, color]) => {
      it(`${type} is ${color}`, () => {
        wrapper.setProps({store: {notification: {type}}})
        expect(wrapper.dive().find(SnackbarContent).prop("style").backgroundColor).toBe(color)
      })
    })
  })
})


describe("Action component", () => {
  const props = {
    title: "title",
    onClick: jest.fn()
  }
  const wrapper = shallow(<Action {...props}/>)

  it("renders correctly", () => {
    expect(wrapper.dive()).toHaveLength(1)
  })

  it("children is title", () => {
    expect(wrapper.dive().prop("children")).toBe(props.title)
  })
  it("onClick propagates", () => {
    wrapper.simulate("click")
    expect(props.onClick).toBeCalled()
  })

})