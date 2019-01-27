import React from "react"
import {configure, mount, shallow} from "enzyme"
import Adapter from "enzyme-adapter-react-16"
configure({adapter: new Adapter()})

global.React = React
global.mount = mount
global.shallow = shallow

Object.defineProperty(navigator, 'language', {
  get: () => undefined
})