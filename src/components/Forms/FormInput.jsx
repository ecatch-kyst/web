import React from 'react'
import {useTranslation} from 'react-i18next'

import Dropdown from './components/Dropdown'
import TextInput from './components/TextInput'
import DropdownMap from './components/DropdownMap'
import GeoPointInput from './components/GeoPointInput'
import {useStore} from '../../hooks'

/**
 * Dynamic input field
 * @param {object} props
 * @param {string} props.id
 * @param {string} props.dataId
 * @param {string} props.type
 * @param {boolean} props.options
 */

export const FormInput = ({id, dataId, type, options}) => {

  const {handleFieldChange, fields} = useStore()
  const [t] = useTranslation("forms")

  const handleChange = (name, value) => {
    const error = null // TODO: Uncomment validate[dataId](value) // Validating the field
    if (error) {
      console.error(error) // TODO: Add error notification
    } else {
      handleFieldChange(name, value)
    }
  }

  const value = fields[id || dataId]

  const common = {
    onChange: handleChange,
    label: t(`labels.${id}`),
    placeholder: t(`labels.${id}`),
    value,
    disabled: !options.editable
  }

  switch (type) {
  case "select":
    return (
      <Dropdown
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