import React, {useState} from 'react'
import {TextField, InputAdornment} from "@material-ui/core"

export default ({dataId, label, onChange, type, value, unit}) => {

  const [localValue, setValue] = useState(value || "")

  // when user inputs something into the text field, update the state
  const handleChange = ({target: {value}}) => setValue(parseInt(value, 10) || value || "")

  // when user moves away from the field, update the global state
  const handleBlur = () => onChange(dataId, localValue)

  return (
    <TextField
      InputProps={{
        startAdornment: unit ? <InputAdornment position="start">{unit}</InputAdornment> : null
      }}
      label={label}
      onBlur={handleBlur}
      onChange={handleChange}
      type={type}
      value={localValue}
    />
  )
}