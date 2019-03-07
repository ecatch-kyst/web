import Form from "../Form"
import {Redirect} from "react-router-dom"
import {routes} from "../../../lib/router"
import Store from "../../../db"
import {Button} from "@material-ui/core"
import "../FormInput"

import "../../../lib/firebase"

jest.mock("../../../lib/firebase", () => ({
  AUTH: {
    currentUser: {}
  }
}))


jest.mock("../FormInput", () => () => <div>FormInput</div>)

describe("Form component", () => {

  describe("unknown form type", () => {
    const props = {
      match: {params: {
        type: "unknown-type"
      }}
    }

    const context = {isLoading: false, messages: []}

    const wrapper = mount(
      <Store.Provider value={context}>
        <Form {...props}/>
      </Store.Provider>
    )

    it("renders correctly", () => {
      expect(wrapper).toHaveLength(1)
    })
    it("redirect to the dashboard", () => {
      expect(wrapper.find(Redirect)).toHaveLength(1)
      expect(wrapper.find(Redirect).prop("to")).toBe(routes.DASHBOARD)
    })

  })

  describe("DEP form", () => {
    const props = {
      match: {params: {
        type: "DEP"
      }},
      t: (...args) => args.length === 2 ? [] : args.toString()
    }

    const context = {
      messages: [{TM: "DEP"}],
      isLoading: false,
      handleDialog: jest.fn(),
      handleFieldChange: jest.fn(),
      submitMessage: jest.fn()
    }

    const wrapper = mount(
      <Store.Provider value={context}>
        <Form {...props}/>
      </Store.Provider>
    )

    it("renders correctly", () => {
      expect(wrapper).toHaveLength(1)
    })

    it("values are preset", () => {
      //NOTE: extend
      expect(context.handleFieldChange).toBeCalled()
    })

    it("clicking on submit opens a dialog", () => {
      wrapper
        .findWhere(el => el.type() === Button && el.prop("type") === "submit")
        .simulate("click", {preventDefault: jest.fn()})

      expect(context.handleDialog).toBeCalled()
      //NOTE: extend
      // expect(context.handleDialog)
      //   .toBeCalledWith({type: props.match.params.type, submit: ???})
    })
  })
})