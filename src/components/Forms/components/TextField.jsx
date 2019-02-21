import React from 'react'
import {TextField as MUITextField} from "@material-ui/core"

const TextField = ({dataId,label, onChange, type, value, options}) => {
  const handleChange = ({target: {value}}) => onChange(dataId, value)

  return (
    <MUITextField
      label={label}
      onChange={handleChange}
      type={type}
      value={value}
      {...options}
    />
  )
}

export default TextField