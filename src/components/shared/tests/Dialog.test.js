import {Dialog} from "../Dialog"
import {DestructButton} from ".."

describe("Dialog component", () => {
  const props = {store: {
    dialog: {
      open: false
    }
  }}
  const wrapper = shallow(<Dialog {...props}/>)

  it("renders correctly", () => {
    expect(wrapper).toHaveLength(1)
  })

  describe("destructive dialog", () => {
    it("false", () => {
      expect(wrapper.find(DestructButton).length).toBe(0)
    })

    it("true", () => {
      wrapper.setProps({
        store: {dialog: {
          open: true,
          isDestructive: true
        }}
      })
      expect(wrapper.find(DestructButton).length).toBe(1)
    })
  })

})