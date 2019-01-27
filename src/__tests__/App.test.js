import React from 'react'
import App from '../App'

describe("App component", () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<App t={key => key}/>)
    wrapper.unmount()
  })
})
