import {TestStoreContext} from ".."

describe("TestStoreContext component", () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<TestStoreContext store={{value: "test value"}}/>)
    wrapper.unmount()
  })
})
