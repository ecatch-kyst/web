import {login, logout, deleteUser, updateProfile} from "../user"
import {AUTH} from "../../../lib/firebase"
import {Component} from "react"


jest.mock("../../../lib/firebase", () => ({
  AUTH: {
    signInWithEmailAndPassword: jest.fn().mockResolvedValue(),
    onAuthStateChanged: jest.fn(),
    signOut: jest.fn().mockResolvedValue(),
    currentUser: {
      delete: jest.fn().mockResolvedValue(),
      updateProfile: jest.fn().mockResolvedValue()
    }
  }
}))


/**
 * helps to mock class for functions
 * that needs to access 'this'
 */
class ClickHandlerMockClass extends Component {
    static defaultProps = {handlerArguments: []}

    handleClick = this.props.clickHandler.bind(this)

    notify = jest.fn()

    render() {
      return <div onClick={() => this.handleClick(...this.props.handlerArguments)}/>
    }
}


describe("login function", () => {
  it("sends credentials to firebase", () => {
    mount(
      <ClickHandlerMockClass
        clickHandler={login}
        handlerArguments={[{email: "email@email.hu", password: "password"}]}
      />
    ).simulate("click")
    expect(AUTH.signInWithEmailAndPassword).toBeCalledWith("email@email.hu", "password")
  })

  it("if no arguments, listen for AUTH changes", () => {
    mount(
      <ClickHandlerMockClass
        clickHandler={login}
        handlerArguments={[]}
      />
    ).simulate("click")
    expect(AUTH.onAuthStateChanged).toBeCalled()
  })
})


describe("logout function", () => {
  it("logs the user out from firebase", () => {
    mount(<ClickHandlerMockClass clickHandler={logout}/>).simulate("click")
    expect(AUTH.signOut).toBeCalled()
  })
})


describe("deleteUser function", () => {
  it("deletes a user from firebase", () => {
    mount(<ClickHandlerMockClass clickHandler={deleteUser}/>).simulate("click")
    expect(AUTH.currentUser.delete).toBeCalled()
  })
})


describe("updateProfile function", () => {
  it("updates user data in firebase", () => {
    const newProfileData = {
      uid: "-kjds78",
      displayName: "name",
      email: "email@email.hu",
      emailVerified: false
    }
    mount(
      <ClickHandlerMockClass
        clickHandler={updateProfile}
        handlerArguments={[newProfileData]}
      />
    ).simulate("click")
    expect(AUTH.currentUser.updateProfile).toBeCalledWith(newProfileData)
  })
})