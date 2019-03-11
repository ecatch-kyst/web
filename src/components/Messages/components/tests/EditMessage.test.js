import {EditMessage} from '../EditMessage'
import {Redirect} from "react-router-dom"
import {routes} from '../../../../lib/router'
import Form from '../../../Forms/Form'

describe("EditMessage component", () => {
  const props = {
    store: {
      messages: [
        {
          RN: 1,
          TM: "DCA",
          created: {
            toDate: () => new Date()
          }
        }
      ]
    },
    match: {params: {messageId: ""}}
  }

  const wrapper = shallow(<EditMessage {...props}/>)

  it("renders correctly", () => {
    expect(wrapper).toHaveLength(1)
    wrapper.setProps({match: {params: {messageId: "1"}}})
    expect(wrapper).toHaveLength(1)
    expect(wrapper.find(Form)).toHaveLength(1)
    expect(wrapper.find(Form).prop("match").params)
      .toEqual({
        messageId: "1",
        type: "DCA"
      })
  })

  describe("editable", () => {
    it("created is less than 12 hours from now", () => {
      expect(wrapper.find(Redirect)).toHaveLength(0)
    })
    it("created is over 12 hours from now", () => {
      wrapper.setProps({
        store: {
          messages: [{RN: 1, created: {toDate: () => new Date("2000-01-01")}}]
        }
      })
      expect(wrapper.find(Redirect)).toHaveLength(1)
      expect(wrapper.find(Redirect).prop("to")).toBe(routes.MESSAGES)
    })

    it("can only edit DCA", () => {
      wrapper.setProps({store: {
        messages: [
          {
            RN: 1,
            TM: "DEP",
            created: {
              toDate: () => new Date()
            }
          }
        ]
      }})
      expect(wrapper.find(Redirect)).toHaveLength(1)
      expect(wrapper.find(Redirect).prop("to")).toBe(routes.MESSAGES)
    })
  })


})

