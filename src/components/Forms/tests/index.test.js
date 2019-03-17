import Forms, {FormButton} from ".."
import "../forms.json"
import useStore from "../../../hooks/useStore"


jest.mock("../../../hooks/useStore", () => jest.fn().mockReturnValue({
  trips: [],
  isEnRoute: true
}))


describe("Forms component", () => {

  describe("renders correctly", () => {

    describe("Is en route", () => {

      describe("no DCA yet", () => {

        it("show only DCA button", () => {
          const wrapper = shallow(<Forms/>)
          expect(wrapper).toHaveLength(1)
          expect(wrapper.find(FormButton)).toHaveLength(1)
          expect(wrapper.find(FormButton).prop("type")).toBe("DCA")
        })
      })

      describe("there is a DCA sent in already", () => {
        useStore.mockReturnValueOnce({
          trips: [{DCAList: [{}]}],
          isEnRoute: true
        })
        const wrapper = shallow(<Forms/>)

        it("show DCA button", () => {
          expect(wrapper.find(FormButton)).toHaveLength(2)
          expect(wrapper.findWhere(e => e.type() === FormButton && e.prop("type") === "DCA")).toHaveLength(1)
        })
        it("show POR button", () => {
          expect(wrapper.find(FormButton)).toHaveLength(2)
          expect(wrapper.findWhere(e => e.type() === FormButton && e.prop("type") === "POR")).toHaveLength(1)
        })
      })
    })

    describe("Not en route", () => {
      it("show only DEP button", () => {
        useStore.mockReturnValueOnce({
          trips: [],
          isEnRoute: false
        })
        const wrapper = shallow(<Forms/>)
        expect(wrapper.find(FormButton)).toHaveLength(1)
        expect(wrapper.findWhere(e => e.type() === FormButton && e.prop("type") === "DEP")).toHaveLength(1)
      })
    })
  })

})


describe("FormButton component", () => {
  const wrapper = shallow(<FormButton/>)
  it("renders correctly", () => expect(wrapper).toHaveLength(1))
})