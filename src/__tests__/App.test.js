import React from 'react'
import App from '../App'

it('renders without crashing', () => {
  const wrapper = mount(<App t={key => key}/>)
  wrapper.unmount()
})
