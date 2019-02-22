import React, {useContext} from 'react'
import {useTranslation} from 'react-i18next'

import Store from '../../db'
import Dropdown from './components/Dropdown.jsx'
import TextField from './components/TextField'


/**
 * Dynamic input field
 * @param {object} props
 * @param {string} props.id
 * @param {string} props.dataId
 * @param {string} props.type
 * @param {boolean} props.options
 */

const FormInput = ({id, dataId, type, options}) => {


  const [t] = useTranslation("forms")
  const {handleFieldChange, fields} = useContext(Store)

  const handleChange = (name, value) => {
    const error = null // TODO: Uncomment validate[dataId](value) // Validating the field
    if (error) {
      console.error(error) // TODO: Add error notification
    } else {
      handleFieldChange(name, value)
    }
  }

  const value = fields[dataId]

  switch (type) {
  case "select":
    return (
      <Dropdown
        dataId={id}
        onChange={handleChange}
        placeholder={t(`labels.${id}`)}
        type={dataId}
        value={value}
        {...options}
      />
    )
  case "select-key-value": // TODO: Implement
  default:
    return (
      <TextField
        dataId={dataId}
        label={t(`labels.${id}`)}
        onChange={handleChange}
        type={type}
        value={value}
        {...options}
      />
    )
  }
}


export default FormInput