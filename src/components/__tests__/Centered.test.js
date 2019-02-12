import {Centered} from ".."
import "../../hooks"

jest.mock("../../hooks", () => ({
  useDimensions: jest.fn().mockReturnValue({height: 1000})
}))

describe("Centered component", () => {
  const wrapper = shallow(<Centered/>)
  it("renders correctly", () => expect(wrapper).toHaveLength(1))
  it("height is the same as in window", () => {
    expect(wrapper.prop("style").minHeight).toBe(1000)
    expect(wrapper.prop("style").maxHeight).toBe(1000)
  })
})