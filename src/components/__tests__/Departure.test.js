import Departure, {Input} from "../Departure"
import {shallow} from 'enzyme'

const context = {handleUserLogin: jest.fn()}

describe("Departure component", () => {
  const wrapper = shallow(<Departure />).dive()

  it(" departure port can be entered ", () => {
    wrapper
      .find(Input)
      .first()
      .simulate("change", {
        target: {
          name: "PO", value: "Trondheim"
        }
      })
    expect(wrapper.state("PO")).toBe("Trondheim")
  })

  it(" date of departure can be set ", () => {
    wrapper
      .find(Input)
      .first()
      .simulate("change", {
        target: {
          name: "ZD", value: "2019-01-01"
        }
      })
    expect(wrapper.state("ZD")).toBe("2019-01-01")
  })

  it(" time of departure can be set ", () => {
    wrapper
      .find(Input)
      .first()
      .simulate("change", {
        target: {
          name: "ZT", value: "01:01"
        }
      })
    expect(wrapper.state("ZT")).toBe("01:01")
  })

  it(" date of catchstart can be set ", () => {
    wrapper
      .find(Input)
      .first()
      .simulate("change", {
        target: {
          name: "PD", value: "2019-01-01"
        }
      })
    expect(wrapper.state("PD")).toBe("2019-01-01")
  })

  it(" time of departure can be set ", () => {
    wrapper
      .find(Input)
      .first()
      .simulate("change", {
        target: {
          name: "PT", value: "01:01"
        }
      })
    expect(wrapper.state("PT")).toBe("01:01")
  })

  it.skip("form submits", () => {
    wrapper.simulate("submit", {preventDefault: jest.fn()})
  })

})