import OfflineStatus from "../OfflineStatus"
import {Zoom} from "@material-ui/core"

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
    expect(wrapper.find(Zoom).prop("in")).toBe(true)
  })

  it("disappears when there is internet", () => {
    wrapper.setProps({store: {isOffline: false}})
    expect(wrapper.find(Zoom).prop("in")).toBe(false)
  })
})