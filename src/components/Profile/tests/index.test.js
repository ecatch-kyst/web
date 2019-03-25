import {Profile, Logout, Element} from ".."
import useStore from "../../../hooks/useStore"


jest.mock("../../../hooks/useStore", () => jest.fn()
  .mockReturnValue({
    isDarkMode: false,
    handleUserLogout: jest.fn()
  }))

describe("Profile component", () => {

  const wrapper = shallow(<Profile/>)

  it("renders correctly", () => {
    expect(wrapper).toHaveLength(1)
  })

  // it("user deletion is handled", () => {
  //   wrapper.find(Button).last().simulate("click")
  //   expect(props.store.handleUserDelete).toBeCalled()
  // })

})


describe("Element component", () => {
  const wrapper = shallow(<Element/>).dive()
  it("renders correctly", () => expect(wrapper).toHaveLength(1))
})


describe("Logout component", () => {

  const wrapper = shallow(<Logout/>)

  it("renders correctly", () => {
    expect(wrapper).toHaveLength(1)
  })

  it("logout is handled", () => {
    wrapper.simulate("click")
    expect(useStore().handleUserLogout).toBeCalled()
  })
})