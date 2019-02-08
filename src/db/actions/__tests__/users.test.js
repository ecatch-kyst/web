import {login, logout, deleteUser, updateProfile} from "../users"
import {AUTH} from "../../../lib/firebase"


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


describe("login function", () => {
  it("sends credentials to firebase", async () => {
    expect.assertions(1)
    await login("email@email.hu", "password")
    expect(AUTH.signInWithEmailAndPassword).toBeCalledWith("email@email.hu", "password")
  })

  it("if no arguments, listen for AUTH changes", () => {
    login()
    expect(AUTH.onAuthStateChanged).toBeCalled()
  })
})


describe("logout function", () => {
  it("logs the user out from firebase", async () => {
    await logout()
    expect(AUTH.signOut).toBeCalled()
  })
})


describe("deleteUser function", () => {
  it("deletes a user from firebase", async () => {
    await deleteUser()
    expect(AUTH.currentUser.delete).toBeCalled()
  })
})


describe("updateProfile function", () => {
  it("updates user data in firebase", async () => {
    const newProfileData = {
      uid: "-kjds78",
      displayName: "name",
      email: "email@email.hu",
      emailVerified: false
    }
    await updateProfile(newProfileData)
    expect(AUTH.currentUser.updateProfile).toBeCalledWith(newProfileData)
  })
})