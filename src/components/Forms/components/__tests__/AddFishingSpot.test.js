import {AddFishingSpot} from "../AddFishingSpot"


describe("AddFishingSpot component", () => {
  const props = {
    store: {
      handleDialog: jest.fn(),
      custom: {
        editing: {}
      }
    }
  }

  const wrapper = shallow(<AddFishingSpot {...props}/>)

  it("renders correctly", () => expect(wrapper.dive()).toHaveLength(1))

  it("opens dialog on click", () => {
    wrapper.dive().simulate("click")
    expect(props.store.handleDialog).toBeCalled()
  })
})