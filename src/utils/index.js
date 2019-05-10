import {format as formatDate, isBefore, addHours, isDate} from "date-fns"

export {flattenDoc} from "./firebase"
export {validate} from './validate'

/**
 * Calculates the deadline for a date.
 * @param {Date} timestamp
 * @param {number} [offset=12] offset in hours
 */
export function deadline(timestamp, offset=12) {
  return addHours(timestamp, offset)
}

/**
 * Is the deadline passed for a given timestamp
 * @param {Date} timestamp time to check
 */
export function deadlinePassed(timestamp) {
  return timestamp && isBefore(deadline(timestamp), new Date())
}

/**
 * Format
 * @param {'number'|'datetime-local'} type
 * @param {object} value
 */
export function format (type, value) {
  switch (type) {
  case "number":
    return isNaN(value) ? "" : parseFloat(value, 10)
  case "datetime-local": {
    const date = value ? new Date(value) : ""
    return isDate(date) ? formatDate(date, "YYYY-MM-dd'T'HH:mm", {awareOfUnicodeTokens: true}) : ""
  }
  default:
    return value || ""
  }
}