import {Component} from "react"
import * as notification from "../notification"


/**
 * helps to mock class for functions
 * that needs to access 'this'
 */
class NotificationMockClass extends Component {


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
  const wrapper = shallow(<NotificationMockClass handlerArguments={{name: "test"}}/>)


  it("notification added to notification queue", () => {
    wrapper.simulate("click") // First one is added to queue, but immediately after taken out to be shown
    wrapper.simulate("click") // Added to queue, waiting for the other
    expect(wrapper.instance().notificationQueue.length).toBe(1)

  })
})