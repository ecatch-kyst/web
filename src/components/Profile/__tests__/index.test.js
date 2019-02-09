import {Profile, Logout, Element} from ".."
import {Redirect} from "react-router-dom"


import "../../../lib/firebase"

jest.mock("../../../lib/firebase", () => ({
  AUTH: {currentUser: {}}
}))

describe("Profile component", () => {

  const props = {
    t: t => t,
    store: {isDarkMode: false}
  }

  const wrapper = shallow(<Profile {...props}/>)

  it("renders correctly", () => {
    expect(wrapper).toHaveLength(1)
  })

  // it("user deletion is handled", () => {
  //   wrapper.find(Button).last().simulate("click")
  //   expect(props.store.handleUserDelete).toBeCalled()
  // })

  it.skip("redirect to root if no user detected", () => {
    expect(wrapper.find(Redirect).length).toBe(1)
  })
})


describe("Element component", () => {
  const wrapper = shallow(<Element/>).dive()
  it("renders correctly", () => expect(wrapper).toHaveLength(1))
})


describe("Logout component", () => {
  const props = {
    store: {
      handleUserLogout: jest.fn()
    }
  }
  const wrapper = mount(<Logout {...props}/>)

  it("renders correctly", () => {
    expect(wrapper).toHaveLength(1)
  })

  it("logout is handled", () => {
    wrapper.simulate("click")
    expect(props.store.handleUserLogout).toBeCalled()
  })
})