import {Status} from "../Status"

describe("Status component", () => {
  describe("renders different statuses", () => {
    ["ACK", "NAK", undefined].forEach(status => {
      const wrapper = shallow(<Status result={{RS: status}}/>)
      it(`renders ${status} correctly`, () => expect(wrapper).toHaveLength(1))
    })
  })
})