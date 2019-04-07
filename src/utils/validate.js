import {valid} from './valid'

/**
 *
 * @param {*} type
 * @param {*} value
 */
export function validate(type, value) {
  return !valid[type](value)
}
