import {isValid} from "date-fns"

const isString = e => typeof e === "string"
const isNumber = e => typeof e === "number"

const validSpot = spot => {
  if (!spot) return "invalid-format"
  else if (isNaN(spot.latitude) || isNaN(spot.longitude)) return "invalid-coordinates"
  else if (spot.latitude < -90 || spot.latitude > 90) return "invalid-latitude"
  else if (spot.longitude < -180 || spot.longitude > 180) return "invalid-longitude"
}


const validCatch = c => {
  let reason
  Object.values(c).some(weight => {
    if (isNaN(weight)) reason = "invalid-type"
    else if(weight < 0) reason = "invalid-weight"
    return typeof reason === "string"
  })
  return reason
}

const validDateTimeLocal = date => !isValid(new Date(date)) && "invalid-date"

export const valid = {
  "TM": v => !['DEP', 'DCA', 'POR'].includes(v) && "invalid-type", // Message type
  "timestamp": (v) => false, // Validated on server side
  "RC": v => !(isString(v) && (/^L?[LKM]\d{3,4}$/.test(v))) && "invalid-format", // Radio name
  "MA": v => !(isString(v) || v )&& "invalid-format", // Captain's name
  "NA": v => !(isString(v) && v ) && "invalid-format", // Ship's name
  "PO": v => !(isString(v) && v.length === 5) && "invalid-format", // Land & port
  "departure": (v) => validDateTimeLocal(v),
  "OB": v => validCatch(v),
  "expectedFishingStart": (v) => validDateTimeLocal(v),
  "expectedFishingSpot": (v) => validSpot(v), //validate GEOPOINT
  "fishingStart": (v) => validDateTimeLocal(v),
  "startFishingSpot": (v) => validSpot(v), //validate GEOPOINT
  "endFishingSpot": (v) => validSpot(v), //validate GEOPOINT
  "AC": v => !(isString(v) && v.length === 3) && "invalid-format", // Fishing activity
  "DS": v => !(isString(v) && v.length === 3) && "invalid-format", // Planned firh art
  "MV": v => !(isNumber(v) && v >= 0) && "invalid-format", // Message version
  "AD": v => !(isString(v) && v.length === 3) && "invalid-format",
  "XR": v => !(isString(v) && v ) && "invalid-format",
  "QI": v => !(isNumber(v) && (v <= 7 && v >= 0)) && "invalid-format", // Fishing permission int[1..7]
  "TS": () => null, // REVIEW;
  "ZO": v => !(isString(v) && v.length === 3) && "invalid-format", // starting zone
  "GE": v => !(isString(v)) && "invalid-format", // fishing tool
  "GP": v => !(isNumber(v) && (v < 7 && v >= 0)) && "invalid-format", // problem with tool
  "DU": v => !(isNumber(v) && v > 0) && "invalid-format", // Lengt of fishing (minutes)
  "CA": v => validCatch(v),
  "ME": v => !(isNumber(v) && v >= 0) && "invalid-format", //width of mask
  "GS": v => !(isNumber(v) && (v < 5 && v > 0)) && "invalid-format",
  "LS": v => !(isString(v) && v && v.length <= 60) && "invalid-format",
  "KG": v => validCatch(v),
  "portArrival": v => validDateTimeLocal(v)
}