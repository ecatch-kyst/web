import {handle, reset} from "../dialog"
import {Component} from "react"


const submit = jest.fn()
const cancel = jest.fn()

class TestClass extends Component {

  resetDialog = reset.bind(this)

  handleDialog = handle.bind(this)

  render() {
    return <div onClick={() => this.handleDialog({type: "type", submit, cancel, isDestructive: this.props.isDestructive})}/>
  }
}

describe("handle function", () => {
  it("dialog is constructed correctly", async () => {
    const wrapper = shallow(<TestClass isDestructive/>)
    wrapper.simulate("click")

    expect(wrapper.state("dialog").open).toBe(true)
    expect(wrapper.state("dialog").type).toBe("type")
    expect(wrapper.state("dialog").isDestructive).toBe(true)

    await wrapper.state("dialog").handleSubmit()
    expect(submit).toBeCalled()
    expect(wrapper.state("dialog").open).toBe(false)

    const wrapper2 = shallow(<TestClass/>)
    wrapper2.simulate("click")

    await wrapper2.state("dialog").handleCancel()
    expect(cancel).toBeCalled()
    expect(wrapper2.state("dialog").open).toBe(false)

    wrapper2.simulate("click")
    expect(wrapper2.state("dialog").isDestructive).toBe(false)
  })
})