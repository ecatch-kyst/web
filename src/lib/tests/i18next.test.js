import i18next from "../i18next"


describe("i18next", () => {
  it("has been initialized", () => expect(i18next.isInitialized).toBe(true))

  it("has Norwegian", () => expect(i18next.options.resources.no).not.toBe(undefined))

  it("has English", () => expect(i18next.options.resources.en).not.toBe(undefined))

  it("default language is Norwegian", () => expect(i18next.options.lng).toBe("no"))
})