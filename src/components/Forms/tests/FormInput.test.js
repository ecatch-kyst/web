import {FormInput} from "../FormInput"
import useStore from "../../../hooks/useStore"

jest.mock("../../../hooks/useStore", () => jest.fn().mockReturnValue({
  handleFieldChange: jest.fn(),
  fields: {}
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
        wrapper.simulate("change", "NAME", "VALUE")
        expect(useStore().handleFieldChange).toBeCalledWith("NAME", "VALUE")
      })
    })

  })
})