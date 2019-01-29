import Landing from ".."
import {Link} from "react-router-dom"

describe("Landing component", () => {
  const wrapper = shallow(<Landing/>)

  it("renders correctly", () => {
    expect(wrapper).toMatchSnapshot()
  })

})