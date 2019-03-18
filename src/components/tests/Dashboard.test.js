import Dashboard from "../Dashboard"

import "../../lib/firebase"

jest.mock("../../lib/firebase", () => ({
  AUTH: {currentUser: {}}
}))


describe("Dashboard component", () => {
  const props = {t: text => text}
  const wrapper = shallow(<Dashboard {...props}/>).dive()
  it("renders correctly", () => expect(wrapper).toHaveLength(1))
})