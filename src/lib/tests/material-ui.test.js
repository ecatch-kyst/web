import {light, dark} from "../material-ui"

it("light theme exists", () => {
  expect(light).not.toBe(undefined)
})

it("dark theme exists", () => {
  expect(dark).not.toBe(undefined)
})