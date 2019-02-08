import Profile from "../Profile"
import {Button} from "@material-ui/core"
import {Redirect} from "react-router-dom"

describe("Profile component", () => {
  const props = {
    store: {
      user: {
        displayName: "Name",
        email: "Email"
      },
      handleUserLogout: jest.fn(),
      handleUserDelete: jest.fn()
    }
  }
  const wrapper = mount(<Profile {...props}/>)

  it("renders correctly", () => {
    expect(wrapper).toHaveLength(1)
  })

  it("logout is handled", () => {
    wrapper.find(Button).first().simulate("click")
    expect(props.store.handleUserLogout).toBeCalled()
  })

  it("user deletion is handled", () => {
    wrapper.find(Button).last().simulate("click")
    expect(props.store.handleUserDelete).toBeCalled()
  })

  it.skip("redirect to root if no user detected", () => {
    wrapper.setProps({
      store: {
        user: {}
      }
    })
    expect(wrapper.find(Redirect).length).toBe(1)
  })
})