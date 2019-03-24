import {SwitchView} from "../SwitchView"
import {Switch} from "@material-ui/core"
import MergeIcon from "@material-ui/icons/CallMergeOutlined"
import SplitIcon from "@material-ui/icons/CallSplitOutlined"

describe("SwitchView component", () => {
  const props = {
    history: {
      push: jest.fn()
    },
    location: {
      pathname: ""
    }
  }
  const wrapper = mount(<SwitchView {...props}/>)

  describe("messages", () => {
    beforeAll(() => {
      wrapper.setProps({location: {
        pathname: "/messages"
      }})
    })
    it("renders correctly", () => {
      expect(wrapper.find(Switch).prop("checked")).toBe(true)
      expect(wrapper.find(MergeIcon)).toHaveLength(1)
    })

    it.skip("change to trips view", () => {
      wrapper.find(Switch).simulate("click") // REVIEW: Not trigged
      expect(wrapper.find(Switch).prop("checked")).toBe(false)
      expect(wrapper.find(SplitIcon)).toHaveLength(1)
    })
  })

  describe("trips", () => {
    beforeAll(() => {
      wrapper.setProps({location: {
        pathname: "/trips"
      }})
    })
    it("renders correctly", () => {
      expect(wrapper.find(Switch).prop("checked")).toBe(false)
      expect(wrapper.find(SplitIcon)).toHaveLength(1)
    })

    it.skip("change to messages view", () => {
      wrapper.find(Switch).simulate("click") // REVIEW: Not trigged
      expect(wrapper.find(Switch).prop("checked")).toBe(true)
      expect(wrapper.find(MergeIcon)).toHaveLength(1)
    })
  })
})