import LanguageChooser from "../LanguageChooser"
import {MenuItem} from "@material-ui/core"

describe("LanguageChooser component", () => {
  const props = {
    i18n: {
      changeLanguage: jest.fn()
    }
  }
  const wrapper = shallow(<LanguageChooser {...props}/>).dive()

  it("renders correctly", () => expect(wrapper).toHaveLength(1))

  it("has Norwegian", () => {
    expect(
      wrapper
        .findWhere(
          el => el.type() === MenuItem && el.prop("value") === "no"
        ).length
    ).toBe(1)
  })

  it("has English", () => {
    expect(
      wrapper
        .findWhere(
          el => el.type() === MenuItem && el.prop("value") === "en"
        ).length
    ).toBe(1)
  })

  it("language changes", () => {
    wrapper.simulate("change", {target: {value: "newLanguage"}})
    expect(localStorage.getItem("preferredLanguage")).toBe("newLanguage")
    expect(props.i18n.changeLanguage).toBeCalledWith("newLanguage")
  })
})