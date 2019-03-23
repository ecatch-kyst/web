import {EditCatch} from '../EditCatch'
import {Redirect} from "react-router-dom"
import {routes} from '../../../../lib/router'
import Form from '../../../Forms/Form'
import useStore from '../../../../hooks/useStore'

jest.mock('../../../../hooks/useStore', () => jest.fn().mockReturnValue({
  messages: [{RN: 1, TM: "DCA", created: new Date()}]
}))

describe("EditCatch component", () => {
  const props = {
    match: {params: {messageId: "1", type: "DCA"}}
  }


  it("renders correctly", () => {
    const wrapper = shallow(<EditCatch {...props}/>)
    expect(wrapper).toHaveLength(1)
    expect(wrapper.find(Form)).toHaveLength(1)
    expect(wrapper.find(Form).prop("match").params)
      .toEqual({
        messageId: "1",
        type: "DCA"
      })
  })


  describe("editable", () => {

    beforeEach(() => jest.resetModules())

    it("can only edit DCA", () => {
      useStore.mockReturnValueOnce({messages: []})
      const props = {match: {params: {messageId: "1", type: "POR"}}}
      const wrapper = shallow(<EditCatch {...props}/>)
      expect(wrapper.find(Redirect)).toHaveLength(1)
      expect(wrapper.find(Redirect).prop("to")).toBe(routes.TRIPS)
    })

    it("created less than 12 hours ago", () => {
      const wrapper = shallow(<EditCatch {...props}/>)
      expect(wrapper.find(Redirect)).toHaveLength(0)
    })


    it("created more than 12 hours ago", () => {
      useStore.mockReturnValueOnce({
        messages: [{RN: 1, TM: "DCA", created: new Date("2000-01-01")}]
      })
      const wrapper = shallow(<EditCatch {...props}/>)
      expect(wrapper.find(Redirect)).toHaveLength(1)
      expect(wrapper.find(Redirect).prop("to")).toBe(routes.TRIPS)
    })

  })


})

