import {Messages} from '..'
import '../../../hooks/useStore'
import '../../shared/TableHead'

jest.mock("../../shared/TableHead", () => () => <thead/>)

jest.mock("../../../hooks/useStore", () => () => ({
  messages: [
    {id: 0, TM: "DCA", created: new Date("2000-01-01")},
    {id: 1, TM: "DEP", created: new Date("2019-03-11")},
    {id: 2, TM: "POR", created: new Date("2014-12-01")},
    {id: 3, TM: "POR", created: new Date("2014-12-01")}
  ]}
))


describe.skip("Messages component", () => {/**@see https://github.com/airbnb/enzyme/issues/1938 */
  const wrapper = shallow(<Messages/>)

  it("renders correctly", () => {
    expect(wrapper).toHaveLength(1)
  })
})