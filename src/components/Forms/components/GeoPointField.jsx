import React from 'react'
import {TextField, InputLabel, InputAdornment} from "@material-ui/core"
import {withTranslation} from 'react-i18next'

const GeoPointField = ({dataId, label, onChange, value, t}) => {
  const handleChange = ({target: {name, value: inputValue}}) => onChange(dataId, {...value, [name]: parseFloat(inputValue, 10)})
  return (
    <>
    <InputLabel>
      {label}
    </InputLabel>
    {["latitude", "longitude"].map(degree =>
      <TextField
        InputProps={{
          endAdornment: <InputAdornment position="start">˚</InputAdornment>
        }}
        key={degree}
        label={t(`labels.geopoint.${degree}`)}
        name={degree}
        onChange={handleChange}
        type="number"
        value={value[degree] || ""}
      />
    )}
  </>
  )
}

export default withTranslation("forms")(GeoPointField)