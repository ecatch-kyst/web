import Dashboard from "../Dashboard"

describe("Dashboard component", () => {
  const props = {
    t: text => text,
    store: {user: {displayName: "name"}}
  }
  const wrapper = mount(<Dashboard {...props}/>)
  it("renders correctly", () => expect(wrapper).toHaveLength(1))
})