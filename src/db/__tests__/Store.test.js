import {Database} from "../Store"

describe("Store component", () => {

  const wrapper = shallow(<Database/>)

  it("renders correctly", () => {
    expect(wrapper).toHaveLength(1)
  })

})