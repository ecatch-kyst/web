import React, {useState, useEffect} from 'react'
import {TextField, InputAdornment} from "@material-ui/core"

export default ({dataId, label, onChange, type, value, unit, disabled}) => {

  const [localValue, setValue] = useState("")

  // update local state, when global is updated
  useEffect(() => {setValue(value || "")}, [value])

  // when user inputs something into the text field, update the local state
  const handleChange = ({target: {value}}) => {
    setValue(type === "number" ? parseInt(value, 10) : (value || ""))
  }

  // when user moves away from the field, update the global state
  const handleBlur = () => onChange(dataId, localValue)

  return (
    <TextField
      disabled={disabled}
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