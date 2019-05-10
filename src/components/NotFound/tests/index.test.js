import NotFound from ".."
import "../../../hooks"
import {Button} from "@material-ui/core"
import {routes} from "../../../lib/router"


jest.mock("../../../hooks", () => ({
  useDimensions: jest.fn().mockReturnValue({height: 768, width: 1024})
}))

describe("NotFound component", () => {
  const wrapper = shallow(<NotFound/>).dive()

  it("renders correctly", () => {
    expect(wrapper).toMatchSnapshot()
  })

  it("has button that points to the root", () => {
    expect(wrapper.find(Button).prop("to")).toBe(routes.ROOT)
  })

})