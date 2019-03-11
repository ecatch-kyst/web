import React, {useState, useEffect} from 'react'
import {TextField, InputLabel, InputAdornment} from "@material-ui/core"
import {withTranslation} from 'react-i18next'
import {GEOPOINT} from '../../../lib/firebase'

const defaultGeoPoint = {
  latitude: 0,
  longitude: 0
}
const GeoPointField = ({dataId, label, onChange, value, t}) => {

  const [localValue, setValue] = useState(defaultGeoPoint)

  // update local state, when global is updated
  useEffect(() => {setValue(value || defaultGeoPoint)}, [value])

  // when user inputs something into the text field, update the state
  const handleChange = ({target: {name, value: inputValue}}) => {
    let lat, long
    if (name === "latitude") {
      lat = parseFloat(inputValue)
      long = value.longitude
    } else {
      lat = value.latitude
      long = parseFloat(inputValue)
    }
    setValue(GEOPOINT(
      Math.min(Math.max(lat || 0, -90), 90),
      Math.min(Math.max(long || 0, -180), 180)
    ))
  }

  // when user moves away from the field, update the global state
  const handleBlur = () => onChange(dataId, localValue)

  return (
    <>
    <InputLabel>{label}</InputLabel>
    {["latitude", "longitude"].map(degree =>
      <TextField
        InputProps={{
          endAdornment: <InputAdornment position="start">˚</InputAdornment>
        }}
        key={degree}
        label={t(`labels.geopoint.${degree}`)}
        name={degree}
        onBlur={handleBlur}
        onChange={handleChange}
        type="number"
        value={localValue[degree] || ""}
      />
    )}
  </>
  )
}

export default withTranslation("forms")(GeoPointField)