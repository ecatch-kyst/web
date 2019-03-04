import Form from "../Form"
import {Redirect} from "react-router-dom"

import "../../../db"
import {routes} from "../../../lib/router"
import {Button} from "@material-ui/core"


jest.mock("../../../db", () => ({
  withStore: Component => props => <Component {...props}/>
}))

describe("Form component", () => {
  const props = {
    store: {
      handleDialog: jest.fn(),
      submitMessage: jest.fn()
    },
    match: {params: {type: "DEP"}}
  }
  const wrapper = shallow(<Form {...props}/>)


  it("renders correctly", () => {
    expect(wrapper.dive()).toHaveLength(1)
  })


  it("if invalid type, redirect to DASHBOARD", () => {
    wrapper.setProps({match: {params: {type: "INVALID"}}})
    expect(wrapper.dive().find(Redirect)).toHaveLength(1)
    expect(wrapper.dive().find(Redirect).prop("to")).toBe(routes.DASHBOARD)
    wrapper.setProps({match: {params: {type: "DEP"}}})
  })

  it("submitting form opens a dialog", () => {
    wrapper.dive().findWhere(el => el.type() === Button && el.prop("type") === "submit").simulate("click", {
      preventDefault: jest.fn()
    })
    expect(props.store.handleDialog).toBeCalled()
  })

})