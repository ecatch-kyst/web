import {Page, withPage} from ".."
import {Redirect} from "react-router-dom"
import {Typography, CircularProgress} from "@material-ui/core"
import "../../../lib/firebase"

import "../../../db"

jest.mock("../../../db", () => ({
  withStore: Component => props => <Component {...props}/>
}))

const TestComponent = ({test}) => <div>{test}</div>


describe("Page component", () => {
  const props = {
    isProtected: false,
    children: <TestComponent test="test"/>,
    store: {
      isLoading: false
    }
  }
  const wrapper = shallow(<Page {...props}/>)

  afterEach(() => {
    wrapper.setProps({isProtected: false, store: {isLoading: false}})
  })

  it("renders correctly", () => {
    expect(wrapper.dive()).toHaveLength(1)
  })

  it("when loading, show spinner", () => {
    wrapper.setProps({store: {isLoading: true}})
    expect(wrapper.dive().find(CircularProgress)).toHaveLength(1)
  })

  it("default options", () => {
    expect(Page.defaultProps.isProtected).toBe(true)
    expect(Page.defaultProps.namespace).toBe("common")
  })

  describe("if protected", () => {

    beforeAll(() => {
      wrapper.setProps({isProtected: true})
    })

    it("no user is logged in redirects to root", () => {
      expect(wrapper.dive().children().type()).toBe(Redirect)
      expect(wrapper.dive().children().prop("to")).toBe("/")
    })

    it("user is logged no redirect", () => {
      jest.mock("../../../lib/firebase", () => ({
        AUTH: {currentUser: {}}
      }))
      expect(wrapper.dive().find(Redirect).length).toBe(0)
      expect(wrapper.dive().find(TestComponent)).toHaveLength(1)
    })

  })


  it("has title", () => {
    const titleComponent = wrapper.dive().find(Typography)
    expect(titleComponent).toHaveLength(1)
    expect(titleComponent.prop("children")).toBe("titles.main")
  })

  it("children renders correctly", () => {
    const testChild = wrapper.dive().find(TestComponent).dive()
    expect(testChild).toHaveLength(1)
    expect(testChild.prop("children")).toBe("test")
  })
})


describe("withPage HOC", () => {
  const TestComponentWithPage = withPage(TestComponent)
  const TestComponentWithPageWithOptions = withPage(
    TestComponent, {
      namespace: "namespace",
      isProtected: false
    }
  )

  it("renders wrapped component within Page", () => {
    const wrapper = shallow(<TestComponentWithPage/>)
    expect(wrapper.type()).toBe(Page)
    expect(wrapper.dive().find(TestComponent).length).toBe(1)
  })

  it("default options", () => {
    const wrapper = shallow(<TestComponentWithPage/>)
    expect(wrapper.prop("namespace")).toBe("common")
    expect(wrapper.prop("isProtected")).toBe(true)
  })

  it("options propagates to Page", () => {
    const wrapper = shallow(<TestComponentWithPageWithOptions/>)
    expect(wrapper.prop("namespace")).toBe("namespace")
    expect(wrapper.prop("isProtected")).toBe(false)
  })

})