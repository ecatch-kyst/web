import React from 'react'
import {useTranslation} from 'react-i18next'

import {withStore} from '../../db'
import Dropdown from './components/Dropdown'
import TextInput from './components/TextInput'
import DropdownMap from './components/DropdownMap'
import GeoPointField from './components/GeoPointField'

/**
 * Dynamic input field
 * @param {object} props
 * @param {string} props.id
 * @param {string} props.dataId
 * @param {string} props.type
 * @param {boolean} props.options
 */

export const FormInput = ({id, dataId, type, options, store: {handleFieldChange, fields}}) => {

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
  case "select-map":
    return (
      <DropdownMap
        dataId={id}
        onChange={handleChange}
        placeholder={t(`labels.${id}`)}
        type={dataId}
        value={value}
        {...options}
      />
    )
  case "geopoint":
    return (
      <GeoPointField
        dataId={id}
        label={t(`labels.${id}`)}
        onChange={handleChange}
        value={value}
      />
    )
  default:
    return (
      <TextInput
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


export default withStore(FormInput)