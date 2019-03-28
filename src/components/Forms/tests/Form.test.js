import {Form} from "../Form"
import {Redirect} from "react-router-dom"
import {routes} from "../../../lib/router"
import FormInput from "../FormInput"
import useStore from "../../../hooks/useStore"


jest.mock("../../../hooks/useStore", () =>
  jest.fn()
    .mockReturnValue({
      messages: [],
      fields: {
        AC: "FIS"
      },
      handleFieldChange: jest.fn(),
      handleDialog: jest.fn()
    })
)


describe("Form component", () => {
  const props = {
    match: {params: {type: "DCA"}}
  }

  describe.skip("types", () => {/**@see https://github.com/airbnb/enzyme/issues/1938 */
    ["DEP", "POR", "DCA", "INVALID"].forEach(type => {
      const wrapper = shallow(<Form {...props} match={{params: {type}}}/>)
      describe(type, () => {

        it(`renders correctly`, () => {
          expect(wrapper).toHaveLength(1)
        })
        if (type !== "INVALID") {
          it("handle submit", () => {
            wrapper.findWhere(e => e.prop("type") === "submit" ).simulate("click", {preventDefault: jest.fn()})
            expect(useStore().handleDialog).toBeCalledWith(expect.objectContaining({
              type,
              submit: expect.any(Function)
            }))
          })
        }
        switch (type) {
        case "INVALID": {
          it("redirects to homepage", () => {
            expect(wrapper.find(Redirect)).toHaveLength(1)
            expect(wrapper.find(Redirect).prop("to")).toBe(routes.HOMEPAGE)
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