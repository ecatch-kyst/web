import {App, Navigation} from '../App'

describe("App component", () => {
  it('renders without crashing', () => {
    const props = {theme: {palette: {type: "dark"}}}
    const wrapper = shallow(<App {...props}/>)
    expect(wrapper).toHaveLength(1)
  })
})


describe("Navigation component", () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<Navigation/>).dive()
    expect(wrapper).toHaveLength(1)
  })
})