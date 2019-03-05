import EditMessage from '../EditMessage'
//{store: {messages}, match: {params: {messageId}}}

describe("EditMessage component", () => {
  const props = {
    store: {messages:{
      RN: 1,
      TM: "DEP",
      created: new Date(2014, 6, 10, 23, 0)
    }},
    match: {params: {messageId:{}}}
  }
  const wrapper = shallow(<EditMessage {... props}/>)

  it("renders correctly", () => {
    expect(wrapper).toHaveLength(1)
  })

  it("created", () => {
    wrapper.setProps({messages:{created: new Date(2014, 6, 10, 23, 0)}})
    expect(wrapper.prop("created")).toBe(new Date(2014, 6, 10, 23, 0))
  })

})

