import {Form} from "../Form"
import {Redirect} from "react-router-dom"
import {routes} from "../../../lib/router"
import FormInput from "../FormInput"

describe("Form component", () => {
  const props = {
    store: {
      messages: [],
      fields: {
        AC: "FIS"
      },
      handleFieldChange: jest.fn(),
      handleDialog: jest.fn()
    },
    match: {params: {type: "DCA"}},
    t: t => t
  }

  describe("types", () => {
    ["DEP", "POR", "DCA", "INVALID"].forEach(type => {
      const wrapper = shallow(<Form {...props} match={{params: {type}}}/>)
      describe(type, () => {

        it(`renders correctly`, () => {
          expect(wrapper).toHaveLength(1)
        })
        if (type !== "INVALID") {
          it("handle submit", () => {
            wrapper.findWhere(e => e.prop("type") === "submit" ).simulate("click", {preventDefault: jest.fn()})
            expect(props.store.handleDialog).toBeCalledWith(expect.objectContaining({
              type,
              submit: expect.any(Function)
            }))
          })
        }
        switch (type) {
        case "INVALID": {
          it("redirects to dashboard", () => {
            expect(wrapper.find(Redirect)).toHaveLength(1)
            expect(wrapper.find(Redirect).prop("to")).toBe(routes.DASHBOARD)
          })
          break
        }
        case "DCA": {
          ["DU", "CA"].forEach(dependent => {
            it.skip(`${dependent} dependent field is rendered`, () => {
              expect(wrapper.findWhere(e => e.type() === FormInput && e.prop("id") === dependent))
                .toHaveLength(1)
            })
          })
          break
        }

        default:
          break
        }

      })

    })
  })

})