import {isValid, isAfter} from "date-fns"

export default {
  ZD: v => typeof v !== "string" && "error",
  ZT: v => typeof v !== "string" && "error",
  PD: v => typeof v !== "string" && "error",
  PT: v => typeof v !== "string" && "error",
  LA: v => typeof v !== "number" && "error",
  LO: v => typeof v !== "number" && "error",
  PO: v => typeof v !== "string" && "error", // Land & port
  AC: v => typeof v !== "string" && "error", // Fishing activity
  expectedFishingSpot: v => typeof v !== "string" && "error",
  expectedFishingStart: v => typeof v !== "string" && "error", // Expected time of fishing start
  DS: v => typeof v !== "string" && "error", // Expected fish art
  OB: v => typeof v !== "string" && "error", // Fish type and weight
  departure: v => {
    const date = new Date(v)
    return isValid(date) && isAfter(date, Date.now()) && "Date error"
  }
}