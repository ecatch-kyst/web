import TextInput from "../TextInput"

import {TextField} from "@material-ui/core"

describe("TextInput component", () => {

  it("renders correctly with no props given", () => {
    const wrapper = mount(<TextInput/>)
    expect(wrapper).toHaveLength(1)
    expect(wrapper.find(TextField).prop("value")).toBe("")
  })

  it("renders correctly with props", () => {
    const wrapper = mount(<TextInput value="VALUE"/>)
    expect(wrapper).toHaveLength(1)
    expect(wrapper.find(TextField).prop("value")).toBe("VALUE")
  })

  it.skip("field change updates local state, but not the global one", () => {
    // REVIEW: not working, change, and blur events
    const props = {
      onChange: jest.fn(),
      value: "VALUE"
    }
    const wrapper = mount(<TextInput {...props}/>)
    wrapper.simulate("change", {target: {value: "NEW VALUE"}})
    expect(wrapper.find(TextField).prop("value")).toBe("NEW VALUE")
    expect(props.onChange).not.toBeCalled()
  })


})