import Form from "../Form"
import {Redirect} from "react-router-dom"
import {routes} from "../../../lib/router"
import Store from "../../../db"
import {Button} from "@material-ui/core"
import "../FormInput"

import "../../../lib/firebase"
import {format} from "date-fns"

const MOCKGEOPOINT = () => ({
  isEqual: () => true,
  latitude: 0,
  longitude: 0
})

jest.mock("../../../lib/firebase", () => ({
  AUTH: {
    currentUser: {}
  },
  GEOPOINT : () => ({
    isEqual: () => true,
    latitude: 0,
    longitude: 0
  })
}))


jest.mock("../FormInput", () => () => <div>FormInput</div>)

describe("Form component", () => {

  describe("unknown form type", () => {
    const props = {
      match: {params: {
        type: "unknown-type"
      }}
    }

    const context = {isLoading: false, messages: [], handleFieldChange: jest.fn()
    }

    const wrapper = mount(
      <Store.Provider value={context}>
        <Form {...props}/>
      </Store.Provider>
    )

    it("renders correctly", () => {
      expect(wrapper).toHaveLength(1)
    })

    it("handleFieldChange not called", () => {
      expect(context.handleFieldChange).not.toBeCalled()
    })

    it("redirect to the dashboard", () => {
      expect(wrapper.find(Redirect)).toHaveLength(1)
      expect(wrapper.find(Redirect).prop("to")).toBe(routes.DASHBOARD)
    })

  })

  describe("DEP form", () => {
    const props = {
      match: {params: {type: "DEP"}},
      t: (...args) => args.length === 2 ? [{value: "TEST", latitude: 0, longitude: 0}] : args.toString()
    }

    const context = {
      messages: [],
      isLoading: false,
      handleDialog: jest.fn(),
      handleFieldChange: jest.fn(),
      submitMessage: jest.fn()
    }

    let wrapper = mount(
      <Store.Provider value={context}>
        <Form {...props}/>
      </Store.Provider>
    )

    it("renders correctly", () => {
      expect(wrapper).toHaveLength(1)
    })

    describe("values are preset", () => {
      it("no last message", () => {
        expect(context.handleFieldChange).toBeCalledWith(
          expect.objectContaining({
            departure: format(Date.now(), "yyyy-MM-dd'T'HH:mm", {awareOfUnicodeTokens: true}) // REVIEW:
          }))
      })
      it("can extract data from last message", () => {
        wrapper = mount(
          <Store.Provider value={{
            ...context,
            messages: [
              {
                TM: "DEP",
                expectedFishingSpot: MOCKGEOPOINT,
                PO: "TEST",
                AC: "TEST",
                DS: "TEST",
                OB: {TEST: 1}
              }
            ]
          }}
          >
            <Form {...props}/>
          </Store.Provider>
        )
        expect(context.handleFieldChange).toBeCalledWith(
          expect.objectContaining({
            AC: "TEST",
            DS: "TEST",
            OB: {TEST: 1},
            PO: "TEST",
            departure: format(Date.now(), "yyyy-MM-dd'T'HH:mm", {awareOfUnicodeTokens: true}), // REVIEW:
            expectedFishingSpot: {
              latitude: 0,
              longitude: 0,
              value: "TEST"
            }
          }))
      })
    })

    it("clicking on submit opens a dialog", () => {
      wrapper
        .findWhere(el => el.type() === Button && el.prop("type") === "submit")
        .simulate("click", {preventDefault: jest.fn()})

      expect(context.handleDialog).toBeCalledWith(expect.objectContaining({
        type: props.match.params.type, submit: expect.any(Function) // REVIEW: Should call submitMessage
      }))
    })
  })


  describe("DCA form", () => {
    const props = {
      match: {params: {type: "DCA"}},
      t: (...args) => args.length === 2 ? [{value: "TEST"}] : args.toString()
    }

    const context = {
      messages: [],
      position: "position",
      fields: {
        AC: 1
      },
      isLoading: false,
      handleDialog: jest.fn(),
      handleFieldChange: jest.fn(),
      submitMessage: jest.fn()
    }

    let wrapper = mount(
      <Store.Provider value={context}>
        <Form {...props}/>
      </Store.Provider>
    )

    it("renders correctly", () => {
      expect(wrapper).toHaveLength(1)
    })

    describe("values are preset", () => {
      it("no last message", () => {
        expect(context.handleFieldChange).toBeCalledWith(
          expect.objectContaining({
            fishingStart: format(Date.now(), "yyyy-MM-dd'T'HH:mm", {awareOfUnicodeTokens: true}), // REVIEW:
            endFishingSpot: context.position
          }))
      })
      it("can extract data from last message", () => {
        wrapper = mount(
          <Store.Provider value={{
            ...context,
            messages: [{TM: "DCA", QI: "TEST"}]
          }}
          >
            <Form {...props}/>
          </Store.Provider>
        )
        expect(context.handleFieldChange).toBeCalledWith(
          expect.objectContaining({
            QI: "TEST",
            fishingStart: format(Date.now(), "yyyy-MM-dd'T'HH:mm", {awareOfUnicodeTokens: true}), // REVIEW:
            endFishingSpot: context.position
          }))
      })
    })
  })
})