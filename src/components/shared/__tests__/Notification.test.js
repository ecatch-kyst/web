import {Notification} from ".."

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