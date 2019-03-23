import {Message} from "../Message"


describe("Message component", () => {
  const props = {created: new Date()}
  const wrapper = shallow(<Message {...props}/>)

  it("renders correctly", () => {
    expect(wrapper).toHaveLength(1)
  })
})