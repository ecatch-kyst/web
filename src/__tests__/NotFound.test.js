import NotFound from "../NotFound"
import {Link} from "react-router-dom"

describe("NotFound component", () => {
  const wrapper = mount(<NotFound/>)

  it("renders correctly", () => {
    expect(wrapper).toMatchSnapshot()
  })

  it("Paragraph translated", () => {
    expect(wrapper.find("p").props("children").children).toBe("page.notfound")
  })

  it("Link translated", () => {
    expect(wrapper.find(Link).props("children").children).toBe("page.goBackToMain")
  })
})