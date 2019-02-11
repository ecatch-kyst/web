import {Loading} from ".."

describe("Loading component", () => {
  const wrapper = shallow(<Loading/>).dive()
  it("renders correctly", () => expect(wrapper).toHaveLength(1))
})