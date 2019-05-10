import {isValid} from "date-fns"

const isString = e => typeof e === "string"
const isNumber = e => typeof e === "number"

const validSpot = spot => {
  if (!spot) return ERROR_REASONS.FORMAT
  else if (isNaN(spot.latitude) || isNaN(spot.longitude)) return ERROR_REASONS.COORDS
  else if (spot.latitude < -90 || spot.latitude > 90) return ERROR_REASONS.LAT
  else if (spot.longitude < -180 || spot.longitude > 180) return ERROR_REASONS.LNG
}


const validCatch = c => {
  let reason
  Object.values(c).some(weight => {
    if (isNaN(weight)) reason = ERROR_REASONS.TYPE
    else if(weight < 0) reason = ERROR_REASONS.WEIGHT // REVIEW: 0kg should not be accepted either
    return typeof reason === "string"
  })
  return reason
}

const validDateTimeLocal = date => !isValid(new Date(date)) && ERROR_REASONS.DATE


/*
 * The valid Object contains the functionality to actually validate
 * given message fields. NOTE: if an error was detected,
 * it should return the reason for that error.
 */
export const valid = {
  "TM": v => !['DEP', 'DCA', 'POR'].includes(v) && ERROR_REASONS.TYPE, // Message type
  "timestamp": () => false, // Validated on server side
  "RN": () => false, // Validated on server side
  "RC": v => !(isString(v) && (/^L?[LKM]\d{3,4}$/.test(v))) && ERROR_REASONS.FORMAT, // Radio name
  "MA": v => !(isString(v) || v )&& ERROR_REASONS.FORMAT, // Captain's name
  "NA": v => !(isString(v) && v ) && ERROR_REASONS.FORMAT, // Ship's name
  "PO": v => !(isString(v) && v.length === 5) && ERROR_REASONS.FORMAT, // Land & port
  "departure": v => validDateTimeLocal(v),
  "OB": v => validCatch(v),
  "expectedFishingStart": v => validDateTimeLocal(v),
  "expectedFishingSpot": v => validSpot(v), //validate GEOPOINT
  "fishingStart": v => validDateTimeLocal(v),
  "startFishingSpot": v => validSpot(v), //validate GEOPOINT
  "endFishingSpot": v => validSpot(v), //validate GEOPOINT
  "AC": v => !(isString(v) && v.length === 3) && ERROR_REASONS.FORMAT, // Fishing activity
  "DS": v => !(isString(v) && v.length === 3) && ERROR_REASONS.FORMAT, // Planned firh art
  "MV": v => !(isNumber(v) && v >= 0) && ERROR_REASONS.FORMAT, // Message version
  "AD": v => !(isString(v) && v.length === 3) && ERROR_REASONS.FORMAT,
  "XR": v => !(isString(v) && v ) && ERROR_REASONS.FORMAT,
  "QI": v => !(isNumber(v) && (v <= 7 && v >= 0)) && ERROR_REASONS.FORMAT, // Fishing permission int[1..7]
  "TS": () => null, // REVIEW;
  "ZO": v => !(isString(v) && v.length === 3) && ERROR_REASONS.FORMAT, // starting zone
  "GE": v => !(isString(v)) && ERROR_REASONS.FORMAT, // fishing tool
  "GP": v => !(isNumber(v) && (v < 7 && v >= 0)) && ERROR_REASONS.FORMAT, // problem with tool
  "DU": v => !(isNumber(v) && v > 0) && ERROR_REASONS.FORMAT, // Lengt of fishing (minutes)
  "CA": v => validCatch(v),
  "ME": v => !(isNumber(v) && v >= 0) && ERROR_REASONS.FORMAT, //width of mask
  "GS": v => !(isNumber(v) && (v < 5 && v > 0)) && ERROR_REASONS.FORMAT,
  "LS": v => !(isString(v) && v && v.length <= 60) && ERROR_REASONS.FORMAT,
  "KG": v => validCatch(v),
  "portArrival": v => validDateTimeLocal(v)
}

const ERROR_REASONS = {
  DATE: "invalid-date",
  TYPE: "invalid-type",
  FORMAT: "invalid-format",
  WEIGHT: "invalid-weight",
  COORDS: "invalid-coordinates",
  LAT: "invalid-latitude",
  LNG: "invalid-longitude"
}