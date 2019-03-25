import React from "react"
import {act} from "react-dom/test-utils"
import {configure, mount, shallow} from "enzyme"
import Adapter from "enzyme-adapter-react-16"
configure({adapter: new Adapter()})

global.React = React
global.mount = mount
global.shallow = shallow
global.act = act

Object.defineProperty(navigator, 'language', {
  get: () => undefined
})