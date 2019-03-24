import {Dashboard} from "../Dashboard"

describe("Dashboard component", () => {
  const wrapper = shallow(<Dashboard/>)
  it("renders correctly", () => expect(wrapper).toHaveLength(1))
})