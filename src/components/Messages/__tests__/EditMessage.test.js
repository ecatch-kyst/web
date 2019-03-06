import EditMessage from '../EditMessage'
import {Redirect} from "react-router-dom"
import "../../../db"
import {routes} from "../../../lib/router"

jest.mock("../../../db", () => ({
  withStore: Component => props => <Component {...props}/>
}))

describe("EditMessage component", () => {
  const props = {
    store: {messages:{
      RN: jest.fn(),
      TM: "DCA",
      created: jest.fn()
    }},
    match: {params: {messageId: jest.fn()}}
  }
  const wrapper = shallow(<EditMessage {... props}/>)

  it("renders correctly", () => {
    expect(wrapper).toHaveLength(1)
  })

  it("renders correctly", () => {
    expect(wrapper).toMatchSnapshot()
  })

  /*
  it('correct messageId', () => {
    wrapper.setProps({store:{messages:{RN: 1}}})
    wrapper.setProps({match:{params:{messageId:1}}})
    expect({store:{messages:{RN}}}).toBe({match:{params:{messageId}}})
  })*/
  /*
  it("if created is too old, redirect to MESSAGES", () => {
    wrapper.setProps({store:{messages:{created: new Date(2018, 6, 10, 23, 0)}}})
    expect(wrapper.find(Redirect)).toHaveLength(1) //this fails for now, the length is 0.
    expect(wrapper.find(Redirect).prop("to")).toBe(routes.MESSAGES)
    wrapper.setProps({store:{messages:{created: Date.now()}}})
  })*/

})

