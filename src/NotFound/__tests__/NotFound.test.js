import NotFound from ".."
import {Link} from "react-router-dom"

describe("NotFound component", () => {
  const wrapper = shallow(<NotFound/>)

  it("renders correctly", () => {
    expect(wrapper).toMatchSnapshot()
  })

})