import LanguageChooser from "../LanguageChooser"
import {MenuItem} from "@material-ui/core"
import "../../../hooks"
import {useTranslation} from "react-i18next"

jest.mock("../../../hooks", () => ({
  useStore: () => ({
    notification: {},
    notify: jest.fn(),
    processQueue: [],
    close: jest.fn()
  })
}))

/*
 * jest.mock("react-i18next", () => ({
 *   useTranslation: () => ([
 *     t => t,
 *     {changeLanguage: jest.fn()}
 *   ])
 * }))
 */

describe("LanguageChooser component", () => {

  const wrapper = shallow(<LanguageChooser/>)

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

  it.skip("language changes", () => {
    wrapper.simulate("change", {target: {value: "newLanguage"}})
    expect(localStorage.getItem("preferredLanguage")).toBe("newLanguage")
    expect(useTranslation()[1].changeLanguage).toBeCalledWith("newLanguage")
  })
})