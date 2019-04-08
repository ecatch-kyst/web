import useDimensions from '../useDimensions'

/**
 * simulate window resize
 */
function fireResize(width, height, wrapper) {
  act(() => {
    window.innerWidth = width
    window.innerHeight = height
    window.dispatchEvent(new Event('resize'))
  })
  wrapper.setProps({})
}

/**
 * Test component that uses the Hook
 */
function Component() {
  const {width, height} = useDimensions()
  return (
    <div>
      <span>{width}</span>
      <span>{height}</span>
    </div>
  )
}

describe("useDimensions hook", () => {
  let wrapper

  beforeEach(() => wrapper = mount(<Component/>))

  afterEach(() => wrapper = null)

  it('listen to window resize', () => {
    fireResize(360, 240, wrapper)

    expect(wrapper.find("span").first().prop("children")).toBe(360)
    expect(wrapper.find("span").last().prop("children")).toBe(240)

    fireResize(480, 600, wrapper)
    expect(wrapper.find("span").first().prop("children")).toBe(480)
    expect(wrapper.find("span").last().prop("children")).toBe(600)
  })

  it('remove listener at unmount', () => {
    const wrapper = mount(<Component/>)
    const spy = jest.spyOn(window, 'removeEventListener')
    wrapper.unmount()
    expect(spy).toBeCalled()
  })

})