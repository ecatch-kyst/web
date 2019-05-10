import TableHead from "../TableHead"
import "react-i18next"
import {TableSortLabel} from "@material-ui/core"

jest.mock("react-i18next", () => ({
  useTranslation: () => ([
    () => ([
      {id: "col0"},
      {id: "col1", left: true},
      {id: "col2", sortable: false}
    ])
  ])
}))

describe("TableHead component", () => {
  const props = {
    orderBy: "col0",
    order: "asc",
    onRequestSort: jest.fn()
  }
  const wrapper = shallow(<TableHead {...props}/>)

  it("renders correctly", () => {
    expect(wrapper).toHaveLength(1)
  })

  describe("column click", () => {
    it("if sortable, change direction", () => {
      wrapper.find(TableSortLabel).first().simulate("click")
      expect(props.onRequestSort).toBeCalled()
      props.onRequestSort.mockReset()
    })

    it("if not sortable, do nothing", () => {
      wrapper.find(TableSortLabel).last().simulate("click")
      expect(props.onRequestSort).not.toBeCalled()
    })

  })

})