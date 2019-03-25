import FishChip from "../FishChip"
import "react-i18next"
import {Chip} from "@material-ui/core"

jest.mock("react-i18next", () => ({
  useTranslation: () => ([() => ([{value: "TYPE", label: "LABEL"}])])
}))

describe("FishChip component", () => {
  const props = {
    type: "TYPE",
    weight: 1000
  }
  const wrapper = shallow(<FishChip {...props}/>)

  it("renders correctly", () => {
    expect(wrapper).toHaveLength(1)
  })
  it("label interpreted from fish type", () => {
    expect(wrapper.find(Chip).prop("label")).toContain("LABEL")
  })
  it("Chip label contains weight of fish", () => {
    expect(wrapper.find(Chip).prop("label")).toContain(1000)
  })
})