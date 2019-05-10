import React, {useContext} from 'react'
import {useTranslation} from 'react-i18next'

// import Dropdown from './components/Dropdown'
import TextInput from './components/TextInput'
import DropdownMap from './components/DropdownMap'
import GeoPointInput from './components/GeoPointInput'
import Store from '../../db'
import {validate} from '../../utils'
import DropdownNative from './components/DropdownNative'


// Generic component that connects different input fields with the Store context
export const FormInput = ({id, dataId, type, options}) => {

  const {handleFieldChange, fields, handleFieldError, errors, notify} = useContext(Store)
  const [t] = useTranslation("forms")

  const handleChange = ({name, value}) => {
    const {error, reason} = validate(name, value) // Validating the field
    handleFieldError(name, error)
    if (error) {
      // In case of error, notify the user.
      notify({name: `fields.${reason}`, type: "error"})
    } else {
      /*
       * If no error found, it can be added to
       * Store context and reset the error, if any
       */
      handleFieldError(name, false)
      handleFieldChange(name, value)
    }
  }

  const value = fields[id || dataId]
  const error = errors[id || dataId]

  const common = {
    onChange: handleChange,
    label:t(`labels.${id}`),
    // TODO: Add custom error labels //label: error ? t(`errors.${id}`) : t(`labels.${id}`),
    placeholder: t(`labels.${id}`),
    value,
    error,
    disabled: !options.editable
  }

  switch (type) {
  case "select":
    return (
      <DropdownNative
        dataId={id}
        type={dataId}
        {...common}
        {...options}
      />
    )
  case "select-map":
    return (
      <DropdownMap
        dataId={id}
        type={dataId}
        {...common}
        {...options}
      />
    )
  case "geopoint":
    return <GeoPointInput dataId={id} {...common}/>
  default:
    return (
      <TextInput
        dataId={dataId}
        type={type}
        {...common}
        {...options}
      />
    )
  }
}


export default FormInput