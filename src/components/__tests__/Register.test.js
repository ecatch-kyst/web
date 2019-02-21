import {Register, Input} from "../Register"
import {TextField} from "@material-ui/core"

/**
 * @see https://github.com/airbnb/enzyme/issues/1553
 */
describe.skip("Register component", () => {
  const props = {
    t: jest.fn()
  }
  const wrapper = shallow(<Register {...props}/>, {context: {user: {}}})


  it("renders correctly", () => {
    expect(wrapper).toHaveLength(1)
  })

  describe("input field changes", () => {
    it("name", () => {
      expect(wrapper.state("name")).toBe("")
      wrapper.find(Input).first().simulate("change", {target: {name: "name", value: "newName"}})
      expect(wrapper.state("name")).toBe("newName")
    })

    it("password", () => {
      expect(wrapper.state("password")).toBe("")
      wrapper.find(Input).first(1).simulate("change", {target: {name: "password", value: "newPass"}})
      expect(wrapper.state("password")).toBe("newPass")
    })

    it("e-mail", () => {
      expect(wrapper.state("email")).toBe("")
      wrapper.find(Input).last().simulate("change", {target: {name: "email", value: "newEmail"}})
      expect(wrapper.state("email")).toBe("newEmail")
    })
  })

  it("submit is handled", () => {
    wrapper.find(Input).first().simulate("change", {target: {name: "email", value: "newEmail"}})
    expect()
  })
})


describe("Input component", () => {
  const props = {
    name: "test"
  }
  const wrapper = shallow(<Input {...props}/>)

  it("renders correctly", () => {
    expect(wrapper).toHaveLength(1)
  })

  it("default type is name", () => {
    expect(wrapper.find(TextField).prop("type")).toBe(props.name)
  })

  it("type is type", () => {
    wrapper.setProps({type: "testType"})
    expect(wrapper.find(TextField).prop("type")).toBe("testType")
  })
})