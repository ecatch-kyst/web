import Dropdown from "../Dropdown"
import "../../../../hooks"
import {GEOPOINT} from "../../../../lib/firebase"


jest.mock("../../../../hooks", () => ({
  useStore: () => ({
    custom: {
      fishingSpots: [
        {
          label: "Label",
          value: {
            latitude: 0,
            longitude: 0
          }
        }
      ]
    }
  })
}))

describe("Dropdown component", () => {
  const props = {
    type: "expectedFishingSpot",
    value: GEOPOINT(0,0)
  }
  const wrapper = shallow(<Dropdown {...props}/>)

  it("renders correctly", () => {
    expect(wrapper.dive()).toHaveLength(1)
  })
})