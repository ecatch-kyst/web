import React from 'react'
import {TextField as MUITextField, InputAdornment} from "@material-ui/core"

const TextField = ({dataId, label, onChange, type, value, unit}) => {
  const handleChange = ({target: {value}}) =>
    onChange(dataId, type === "number" ? parseInt(value, 10) : value)

  return (
    <MUITextField
      InputProps={{
        startAdornment: unit ? <InputAdornment position="start">{unit}</InputAdornment> : null
      }}
      label={label}
      onChange={handleChange}
      type={type}
      value={value}
    />
  )
}

export default TextField