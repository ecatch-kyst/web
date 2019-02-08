import OfflineStatus from "../OfflineStatus"

describe("OfflineStatus component", () => {
  const props = {
    store: {isOffline: false}
  }
  const wrapper = mount(<OfflineStatus {...props}/>)

  it("renders correctly", () => {
    expect(wrapper).toHaveLength(1)
  })

  it("appears when no internet", () => {
    wrapper.setProps({store: {isOffline: true}})
    expect(wrapper.find(".is-offline").length).toBeGreaterThan(0)
  })
})