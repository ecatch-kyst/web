import AddFavorite from "../AddFavorite"
import useStore from "../../../../hooks/useStore"
import MuiSelect from "../../../../vendor/ReactSelect"
import "react-i18next"

jest.mock("../../../../hooks/useStore", () => jest.fn().mockReturnValue({
  handleCustomListChange: jest.fn(),
  addToCustomList: jest.fn(),
  custom: {
    type: [{value: "value"}]
  }
}))

jest.mock("react-i18next", () => ({
  useTranslation: () => [(t, {returnObjects}={}) => returnObjects ? [{value: "value"}] : t]
}))

describe("AddFavorite component", () => {
  const props = {
    numberOfChoices: 1,
    type: "type"
  }
  const wrapper = mount(<AddFavorite {...props}/>)
  it("renders correctly", () => expect(wrapper).toHaveLength(1))

  describe.skip("selecting an element from the dropdown", () => {
    wrapper.find(MuiSelect).simulate("change", {value: "value"})
    it("propagates to Store context", () => {
      expect(useStore().handleCustomListChange).toBeCalled()
    })
  })
})