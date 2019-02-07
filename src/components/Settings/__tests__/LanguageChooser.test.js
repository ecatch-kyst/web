import LanguageChooser from "../LanguageChooser"

describe("LanguageChooser component", () => {
  const wrapper = mount(<LanguageChooser/>)

  it("renders correctly", () => expect(wrapper).toHaveLength(1))

  it.skip("has Norwegian", () => {
    expect(
      wrapper
        .findWhere(
          el => el.type() === "button" && el.prop("key") === "no"
        ).length
    ).toBe(1)
  })

  it.skip("has English", () => {
    expect(
      wrapper
        .findWhere(
          el => el.type() === "button" && el.prop("key") === "en"
        ).length
    ).toBe(1)
  })

  // NOTE: Add language change test
})