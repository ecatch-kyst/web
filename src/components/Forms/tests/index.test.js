import Forms from ".."
import {Button} from "@material-ui/core"
import "../forms.json"

jest.mock("../forms.json", () => ({
  "Form1": {id: 0},
  "Form2": {id: 2},
  "Form3": {id: 2},
  "Form4": {id: 3}
}))


describe("Forms component", () => {
  const wrapper = shallow(<Forms/>)
  it("renders correctly", () =>
    expect(wrapper.dive()).toHaveLength(1)
  )

  it("renders all the buttons to all the forms", () => {
    expect(wrapper.dive().find(Button)).toHaveLength(4)
  })
})