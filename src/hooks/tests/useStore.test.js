import useStore from '../useStore'
import {Database} from '../../db/Store'


jest.mock("../../db/initialValues.json", () => ({
  test: "I am an initial state in Database",
  notification: {open: false},
  dialog: {open: false}
}))

/**
 * Component that uses the hook.
 */
function MockComponent() {
  const store = useStore()
  return <div>{store.test}</div>
}

describe("useStore hook", () => {

  it("provider values made available in Components that use useStore()", () => {
    const wrapper = mount(<Database><MockComponent/></Database>)
    expect(wrapper.find("div").prop("children")).toBe("I am an initial state in Database")
  })

})