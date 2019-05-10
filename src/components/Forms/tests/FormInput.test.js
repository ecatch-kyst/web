import {FormInput} from "../FormInput"
import useStore from "../../../hooks/useStore"
import "../../../utils/valid"

jest.mock("../../../hooks/useStore", () => jest.fn().mockReturnValue({
  handleFieldChange: jest.fn(),
  fields: {},
  errors: {},
  handleFieldError: jest.fn()

}))

jest.mock("../../../utils/valid", () => ({
  valid: {
    NAME: () => false
  }
}))

describe("FormInput component", () => {

  const props = {
    options: {}
  }
  describe("types", () => {
    ["select", "select-map", "geopoint", "default"].forEach(type => {
      const wrapper = shallow(<FormInput {...props} type={type}/>)
      it(`${type} renders correctly`, () => {
        expect(wrapper).toHaveLength(1)
      })
      it("handle field change", () => {
        wrapper.simulate("change", {name: "NAME", value: "VALUE"})
        expect(useStore().handleFieldChange).toBeCalledWith("NAME", "VALUE")
        expect(useStore().handleFieldError).toBeCalledWith("NAME", false)
      })
    })

  })
})