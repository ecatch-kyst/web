import Landing from ".."

describe("Landing component", () => {
  const wrapper = shallow(<Landing/>)

  it("renders correctly", () => {
    expect(wrapper).toMatchSnapshot()
  })

})