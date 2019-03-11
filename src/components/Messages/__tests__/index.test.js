import {Messages} from '..'
import Message from '../components/Message'
import {InputBase} from '@material-ui/core'
import TableHead from '../components/TableHead'

describe("EditMessage component", () => {
  const props = {
    store: {messages: [
      {TM: "DCA", created: new Date("2000-01-01")},
      {TM: "DEP", created: new Date("2019-03-11")},
      {TM: "POR", created: new Date("2014-12-01")},
      {TM: "POR", created: new Date("2014-12-01")}
    ]}
  }
  const wrapper = shallow(<Messages {...props}/>)

  it("renders correctly", () => {
    expect(wrapper).toHaveLength(1)
  })

  describe("search", () => {
    it("nothing is filtered in default", () => {
      expect(wrapper.find(Message)).toHaveLength(props.store.messages.length)
    })

    it("filter messages by search query", () => {
      wrapper.find(InputBase).simulate("change", {target: {value: "THIS QUERY MATCHES NOTHING"}})
      expect(wrapper.find(Message)).toHaveLength(0)
      wrapper.find(InputBase).simulate("change", {target: {value: "dep"}})
      expect(wrapper.find(Message)).toHaveLength(1)
      wrapper.find(InputBase).simulate("change", {target: {value: ""}}) // Reset query
    })
  })

  describe("sorting", () => {
    it("default is descending on created", () => {
      expect(wrapper.find(Message).first().prop("TM")).toBe("DEP")
    })

    describe("handle sort", () => {
      it("TM", () => {
        wrapper.find(TableHead).simulate("requestSort", "TM")
        expect(wrapper.find(Message).first().prop("TM")).toBe("DCA")
        wrapper.find(TableHead).simulate("requestSort", "TM")
        expect(wrapper.find(Message).first().prop("TM")).toBe("POR")
      })
    })
  })
})