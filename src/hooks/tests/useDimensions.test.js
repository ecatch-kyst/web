import React from 'react'

import useDimensions from '../useDimensions'

/**
 * simulate window resize
 */
function fireResize(width, height) {
  window.innerWidth = width
  window.innerHeight = height
  window.dispatchEvent(new Event('resize'))
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

beforeAll(() =>
  jest.spyOn(React, 'useEffect').mockImplementation(React.useLayoutEffect)
)
afterAll(() => React.useEffect.mockRestore())

describe("useDimensions hook", () => {
  it('listen to window resize', () => {
    const wrapper = mount(<Component/>)

    fireResize(360, 240)
    wrapper.update()
    expect(wrapper.find("span").first().prop("children")).toBe(360)
    expect(wrapper.find("span").last().prop("children")).toBe(240)

    fireResize(480, 600)
    wrapper.update()
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