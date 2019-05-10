import {Register, Input} from "../Register"
import {TextField, Button} from "@material-ui/core"
import {AUTH} from "../../lib/firebase"
import Store from "../../db"

jest.mock("../../lib/firebase", () => ({
  AUTH: {
    createUserWithEmailAndPassword: jest.fn().mockResolvedValue()
  }
}))


/**
 * @see https://github.com/airbnb/enzyme/issues/1553
 */
describe("Register component", () => {
  const context = {
    handleUserUpdateProfile: jest.fn()
  }
  const wrapper = mount(
    <Store.Provider value={context}>
      <Register t={() => ""}/>
    </Store.Provider>
  )


  it("renders correctly", () => {
    expect(wrapper).toHaveLength(1)
  })

  describe.skip("input field changes", () => {
    it("name", () => {
      expect(wrapper.state("name")).toBe("")
      wrapper.find(Input).first().simulate("change", {target: {name: "name", value: "newName"}})
      expect(wrapper.state("name")).toBe("newName")
    })

    it("password", () => {
      expect(wrapper.state("password")).toBe("")
      wrapper.find(Input).first().simulate("change", {target: {name: "password", value: "newPass"}})
      expect(wrapper.state("password")).toBe("newPass")
    })

    it("e-mail", () => {
      expect(wrapper.state("email")).toBe("")
      wrapper.find(Input).last().simulate("change", {target: {name: "email", value: "newEmail"}})
      expect(wrapper.state("email")).toBe("newEmail")
    })
  })

  it("submit is handled", () => {
    wrapper.findWhere(e => e.type() === Button && e.prop("type") === "submit").simulate("click", {preventDefault: jest.fn(), target: {name: "email", value: "newEmail"}})
    wrapper.find("form").simulate("submit", {preventDefault: jest.fn(), target: {name: "email", value: "newEmail"}})
    expect(AUTH.createUserWithEmailAndPassword).toBeCalledTimes(2)
    //expect(wrapper.find(Register).state("isSubmitted")).toBe(true)
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