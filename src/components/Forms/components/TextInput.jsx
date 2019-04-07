import React, {useState, useEffect} from 'react'
import {TextField, InputAdornment} from "@material-ui/core"
import {format} from '../../../utils'

export default ({dataId, label, onChange, type, value, unit, disabled, error}) => {

  const [localValue, setValue] = useState("")

  useEffect(() => {
    setValue(format(type, value))
  }, [value])

  // when user inputs something into the text field, update the local state
  const handleChange = ({target: {value}}) => setValue(format(type, value))

  // when user moves away from the field, update the global state
  const handleBlur = () => onChange(dataId, localValue)


  return (
    <TextField
      InputProps={{
        startAdornment: unit ? <InputAdornment position="start">{unit}</InputAdornment> : null
      }}
      disabled={disabled}
      error={error}
      label={label}
      onBlur={handleBlur}
      onChange={handleChange}
      type={type}
      value={localValue || ""}
    />
  )
}