import GeoPointInput from "../GeoPointInput"
import {TextField} from "@material-ui/core"

describe("GeoPointInput component", () => {

  it("renders correctly with no props given", () => {
    const wrapper = mount(<GeoPointInput/>)
    expect(wrapper).toHaveLength(1)
    expect(wrapper.find(TextField).first().prop("value")).toBe("")
    expect(wrapper.find(TextField).last().prop("value")).toBe("")
  })

  it("renders correctly with props", () => {
    const wrapper = mount(<GeoPointInput value={{latitude: 10, longitude: 10}}/>)
    expect(wrapper).toHaveLength(1)
    expect(wrapper.find(TextField).first().prop("value")).toBe(10)
    expect(wrapper.find(TextField).last().prop("value")).toBe(10)
  })

  it.skip("field change updates local state, but not the global one", () => {
    // REVIEW: not working, add validation tests (-90, 90, -180, 180), change, and blur events
    const props = {
      onChange: jest.fn(),
      value: {latitude: 10, longitude: 10}
    }
    const wrapper = mount(<GeoPointInput {...props}/>)
    wrapper.find(TextField).first().simulate("change", {target: {name: "latitude", value: "20.45"}})
    expect(wrapper.find(TextField).first().prop("value")).toBe(20.45)
    expect(wrapper.find(TextField).last().prop("value")).toBe(10)
    wrapper.find(TextField).last().simulate("change", {target: {name: "longitude", value: "44.44"}})
    expect(wrapper.find(TextField).first().prop("value")).toBe(20.45)
    expect(wrapper.find(TextField).last().prop("value")).toBe(44.44)
    expect(props.onChange).not.toBeCalled()
  })


})