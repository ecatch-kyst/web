import {isValid} from "date-fns"

const isString = e => typeof e === "string"
const isNumber = e => typeof e === "number"

const validSpot = spot => !isNaN(spot.latitude) && !isNaN(spot.longitude) && Math.abs(spot.latitude) <= 90 && Math.abs(spot.longitude) <= 180
const validCatch = c => !Object.values(c).every(item => !isNaN(item) && item >= 0)

export const valid = {
  "TM": (v) => !(!['DEP', 'DCA', 'POR'].includes(v)), // Message type
  "PO": (v) => !(!(isString(v) && v.length === 5)), // Land & port
  "departure": (v) => !(isValid(v)),
  "OB": (v) => !(validCatch(v)),
  "expectedFishingStart": (v) => !(isValid(v)),
  "expectedFishingSpot": (v) => !(!validSpot(v)), //validate GEOPOINT
  "AC": (v) => !(!(isString(v) && v.length === 3)), // Fishing activity
  "DS": (v) => !(!(isString(v) && v.length === 3)), // Planned firh art
  "MV": (v) => !(!(isNumber(v) && v >= 0)), // Message version
  "AD": (v) => !(!(isString(v) && v.length === 3)),
  "XR": (v) => !(!(isString(v) && v !== "")),
  "QI": (v) => !(!(isNumber(v) && (v <= 7 && v >= 0))), // Fishing permission int[1..7]
  "TS": (v) => !(null), // REVIEW;
  "fishingStart": (v) => !(isValid(v)),
  "ZO": (v) => !(!(isString(v) && v.length === 3)), // starting zone
  "startFishingSpot": (v) => !(!validSpot(v)), //validate GEOPOINT
  "GE": (v) => !(!(isString(v))), // fishing tool
  "GP": (v) => !(!(isNumber(v) && (v < 7 && v >= 0))), // problem with tool
  "endFishingSpot": (v) => !(!validSpot(v)), //validate GEOPOINT
  "DU": (v) => !(!(isNumber(v) && v > 0)), // Length of fishing (minutes)
  "CA": (v) => !(!validCatch(v)),
  "ME": (v) => !(!(isNumber(v) && v >= 0)), //width of mask
  "GS": (v) => !(!(isNumber(v) && (v < 5 && v > 0))),
  "LS": (v) => !(!(isString(v) && v !== "")),
  "KG": (v) => !(!validCatch(v)) // Same as OB?
}