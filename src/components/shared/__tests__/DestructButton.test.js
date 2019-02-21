import {DestructButton} from ".."

describe("DestructButton component", () => {
  const props = {}
  const wrapper = shallow(<DestructButton {...props}/>)

  it("renders correctly", () => {
    expect(wrapper.dive()).toHaveLength(1)
  })

  it("children propagated", () => {
    wrapper.setProps({children: "test"})
    expect(wrapper.dive().prop("children")).toBe("test")
  })

  it("Button props propagated", () => {
    wrapper.setProps({color: "primary"})
    expect(wrapper.dive().prop("color")).toBe("primary")
  })
})