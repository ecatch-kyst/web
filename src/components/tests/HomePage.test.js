import {HomePage} from "../HomePage"

describe("Hommpage component", () => {
  const wrapper = shallow(<HomePage/>)
  it("renders correctly", () => expect(wrapper).toHaveLength(1))
})