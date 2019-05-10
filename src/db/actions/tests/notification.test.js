import {Component} from "react"
import * as notification from "../notification"

jest.useFakeTimers()
console.error = jest.fn()
/**
 * helps to mock class for functions
 * that needs to access 'this'
 */
class MockClass extends Component {

  state = {
    notification: {}
  }

  // Notification
  notificationQueue = []

  notify = notification.handle.bind(this)

  processNotificationQueue = notification.processQueue.bind(this)

  notificationClose = notification.close.bind(this)


  render() {
    return (
      <div
        onClick={
          () => this.notify(this.props.handlerArguments)
        }
      />
    )
  }
}

describe("notification functions", () => {

  describe("handle & processQueue function", () => {
    const wrapper = shallow(
      <MockClass handlerArguments={{name: "test"}}/>
    )

    it("if no notification currently displayed, show the new one immediatelly", () => {
      wrapper.simulate("click")
      expect(wrapper.state("notification").open).toBe(true)
      expect(wrapper.state("notification").name).toBe("test")
    })

    it("if notification is on display, start hiding the previous one", () => {
      wrapper.simulate("click")
      expect(wrapper.state("notification").open).toBe(false)
    })
  })

  describe("processQueue function", () => {
    const wrapper = shallow(
      <MockClass
        handlerArguments={{
          name: "test",
          action: jest.fn(),
          duration: null
        }}
      />
    )

    it("action propagates to notification state", () => {
      wrapper.simulate("click")
      expect(wrapper.state("notification").handleAction).not.toBe(undefined)
    })

    it("handleAction is async", () => {
      expect(wrapper.state("notification").handleAction()).toBeInstanceOf(Promise)
    })

    it("if handleAction errors, don't close the notification", async () => { //REVIEW: Add more meaningful error handling

      expect.assertions(1)
      const wrapper = shallow(
        <MockClass
          handlerArguments={{
            action: jest.fn().mockRejectedValue("action failed")
          }}
        />
      )
      wrapper.simulate("click")
      await wrapper.state("notification").handleAction()
      expect(console.error).toBeCalledWith("action failed")
    })

    it("if no duration is set, close notification 500ms after successfull action", () => {
      jest.advanceTimersByTime(500)
      expect(wrapper.state("notification").open).toBe(false)
    })

  })
})