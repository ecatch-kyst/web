import {format as formatDate, isBefore, addHours, isDate} from "date-fns"

export {flattenDoc} from "./firebase"

export function deadline(timestamp) {
  return addHours(timestamp, 12)
}

/**
 * @param {Timestamp} timestamp time to check
 */
export function deadlinePassed(timestamp) {
  return timestamp && isBefore(addHours(timestamp, 12), new Date())
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