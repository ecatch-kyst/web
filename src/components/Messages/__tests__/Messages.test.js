import Messages from '../Messages'
import "../../../db"
//{store: {messages}, match: {params: {messageId}}}

jest.mock("../../../db", () => ({
  withStore: Component => props => <Component {...props}/>
}))

describe("EditMessage component", () => {
  const props = {
    store: {messages:{}}
  }
  const wrapper = shallow(<Messages {... props}/>)

  it("renders correctly", () => {
    expect(wrapper).toHaveLength(1)
  })

  it("renders correctly", () => {
    expect(wrapper).toMatchSnapshot()
  })

})