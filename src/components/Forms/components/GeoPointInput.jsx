import React, {useState, useEffect} from 'react'
import {TextField, InputLabel, InputAdornment} from "@material-ui/core"
import {useTranslation} from 'react-i18next'
import {GEOPOINT} from '../../../lib/firebase'
import GoogleMaps from "../../GoogleMapsCustom/GoogleMapsSelectiveMarker"

const GeoPointInput = ({disabled, dataId, label, onChange, value: {latitude, longitude}}) => {

  const [t] = useTranslation("forms")
  const [localValue, setValue] = useState({})


  useEffect(() => {
    setValue(GEOPOINT(latitude || 0, longitude || 0))
  }, [latitude, longitude])


  //TODO: fix bug, the map coordinates only saves you click the text field afterwards
  const handleMapClick = (event) => {
    let latValue = parseFloat(event.latLng.lat())
    let longValue = parseFloat(event.latLng.lng())

//    let lat = localValue.latitude
//    let long = localValue.longitude

    let lat = latValue
    let long = longValue

    setValue(GEOPOINT(
      Math.min(Math.max(lat || 0, -90), 90),
      Math.min(Math.max(long || 0, -180), 180)
    ))
  }

  // when user inputs something into the text field, update the state
  const handleChange = ({target: {name, value}}) => {
    value = parseFloat(value, 10)
    let lat = localValue.latitude
    let long = localValue.longitude

    if (name === "latitude") lat = value
    else long = value

    setValue(GEOPOINT(
      Math.min(Math.max(lat || 0, -90), 90),
      Math.min(Math.max(long || 0, -180), 180)
    ))
  }

  // when user moves away from the field, update the global state
  const handleBlur = () => onChange(dataId, localValue)

  //TODO: calculate the size of the map, should be improved to update on window rescale

  return (
    <>
    <GoogleMaps
      handleMapClick = {handleMapClick}
      mapHeight = {window.innerHeight*0.5}
      mapWidth = {window.innerWidth*0.8}
    />
    <InputLabel>{label}</InputLabel>
    {["latitude", "longitude"].map(degree =>
      <TextField
        InputProps={{
          endAdornment: <InputAdornment position="start">˚</InputAdornment>
        }}
        disabled={disabled}
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

GeoPointInput.defaultProps = {
  value: {}
}

export default GeoPointInput
