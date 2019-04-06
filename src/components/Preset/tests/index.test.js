import {Preset, favorites} from ".."
import AddFavorite from "../components/AddFavorite"

describe("Preset component", () => {
  const wrapper = shallow(<Preset/>)
  it("renders correctly", () => {
    expect(wrapper.find(AddFavorite).length).toBe(favorites.length)
  })
})