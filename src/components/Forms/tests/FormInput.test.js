import {FormInput} from "../FormInput"
describe("FormInput component", () => {
  const props = {
    store: {
      handleFieldChange: jest.fn(),
      fields: {}
    }
  }

  describe("types", () => {
    ["select", "select-map", "geopoint", "default"].forEach(type => {
      const wrapper = shallow(<FormInput {...props} type={type}/>)
      it(`${type} renders correctly`, () => {
        expect(wrapper).toHaveLength(1)
      })
      it("handle field change", () => {
        wrapper.simulate("change", "NAME", "VALUE")
        expect(props.store.handleFieldChange).toBeCalledWith("NAME", "VALUE")
      })
    })

  })
})