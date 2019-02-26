import Landing from ".."
import {TextField} from "@material-ui/core"

const context = {handleUserLogin: jest.fn()}

describe("Landing component", () => {
  const wrapper = shallow(<Landing/>, {context}).dive()

  it("renders correctly", () => {
    expect(wrapper).toMatchSnapshot()
  })

  it("input change works ", () => {
    wrapper
      .find(TextField)
      .first()
      .simulate("change", {
        target: {
          name: "email", value: "email@email.com"
        }
      })
    expect(wrapper.state("email")).toBe("email@email.com")
  })

  it.skip("form submits", () => {
    wrapper.simulate("submit", {preventDefault: jest.fn()})
    const {email, password} = wrapper.state()
    expect(context.handleUserLogin).toBeCalledWith({email, password})
  })
})