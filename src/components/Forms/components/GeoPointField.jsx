import React from 'react'
import {TextField, InputLabel} from "@material-ui/core"
import {withTranslation} from 'react-i18next'

const GeoPointField = ({dataId, label, onChange, value, t}) => {
  const handleChange = ({target: {name, value: inputValue}}) => onChange(dataId, {...value, [name]: parseFloat(inputValue, 10)})
  return (
    <>
    <InputLabel>
      {label}
    </InputLabel>
    <TextField
      label={t("labels.geopoint.latitude")}
      name="latitude"
      onChange={handleChange}
      type="number"
      value={value.latitude || ""}
    />
    <TextField
      label={t("labels.geopoint.longitude")}
      name="longitude"
      onChange={handleChange}
      type="number"
      value={value.longitude || ""}
    />
  </>
  )
}

export default withTranslation("forms")(GeoPointField)