import Countdown from "../Countdown"
import {addHours} from "date-fns"

describe("Countdown component", () => {
  const props = {
    end: addHours(new Date(), 12)
  }
  const wrapper = shallow(<Countdown {...props}/>)

  it("renders correctly", () => {
    expect(wrapper).toHaveLength(1)
  })
})