import {valid} from './valid'

/**
 * @param {*} type
 * @param {*} value
 */
export function validate(type, value) {
  const result = valid[type](value)
  return {error: typeof result === "string", reason: result}
}