import AddFishingSpot, {FishingSpotFields} from "../AddFishingSpot"
import {Button, TextField} from "@material-ui/core"


describe("AddFishingSpot component", () => {
  const props = {}
  const wrapper = shallow(<AddFishingSpot/>)
  it("renders correctly", () =>
    expect(wrapper.dive()).toHaveLength(1)
  )
})


describe("Addfishingspot snapshot", () => {
  const wrapper = shallow(<AddFishingSpot/>)
  it("Matches snapshot",() => {
    expect(wrapper).toMatchSnapshot()
  })
})
describe("FishingSpotFields", () => {
  const props = {
    onChange: jest.fn(),
    name: "name",
    latitude: "latitude",
    longitude: "longitude",
    textLabel: "labelName",
    longiLabel: "labelLongitude",
    latiLabel: "labelLatitude"
  }
  const wrapper = shallow(<FishingSpotFields props = {props}/>)
  it("renderes correctly", () => {
    expect(wrapper).toHaveLength(1)
  })
  it("Contains 3 textfields", () => {
    expect(wrapper.find(TextField)).toHaveLength(3)
  })
})
