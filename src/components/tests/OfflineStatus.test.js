import OfflineStatus from "../OfflineStatus"
import {Zoom} from "@material-ui/core"
import useStore from "../../hooks/useStore"

jest.mock("../../hooks/useStore", () => jest.fn().mockReturnValue({isOffline: false}))


describe("OfflineStatus component", () => {

  it("renders correctly", () => {
    const wrapper = mount(<OfflineStatus/>)
    expect(wrapper).toHaveLength(1)
  })

  it("appears when no internet", () => {
    useStore.mockReturnValueOnce({isOffline: true})
    const wrapper = mount(<OfflineStatus/>)
    expect(wrapper.find(Zoom).prop("in")).toBe(true)
  })

  it("disappears when there is internet", () => {
    useStore.mockReturnValueOnce({isOffline: false})
    const wrapper = mount(<OfflineStatus/>)
    expect(wrapper.find(Zoom).prop("in")).toBe(false)
  })
})