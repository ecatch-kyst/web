import Countdown from "../Countdown"
import {addMinutes} from "date-fns"
import {Typography} from "@material-ui/core"

jest.useFakeTimers()
const now = new Date()
describe("Countdown component", () => {

  const props = {
    end: addMinutes(now, 1)
  }
  const wrapper = shallow(<Countdown {...props}/>)

  it("renders correctly", () => {
    expect(wrapper).toHaveLength(1)
  })

  it("time elapsing", () => {
    expect(wrapper.find(Typography).prop("children")).toBe("0:00:00")
    jest.advanceTimersByTime(1000)
    expect(wrapper.find(Typography).prop("children")).toBe("0:00:59")
  })
})