import {AddFishingSpot} from "../AddFishingSpot"

import useStore from "../../../../hooks/useStore"

jest.mock("../../../../hooks/useStore", () =>
  jest.fn()
    .mockReturnValue({
      handleDialog: jest.fn(),
      custom: {
        editing: {}
      }
    })
)


describe("AddFishingSpot component", () => {

  const wrapper = shallow(<AddFishingSpot/>)

  it("renders correctly", () => expect(wrapper).toHaveLength(1))

  it("opens dialog on click", () => {
    wrapper.simulate("click")
    expect(useStore().handleDialog).toBeCalled()
  })
})