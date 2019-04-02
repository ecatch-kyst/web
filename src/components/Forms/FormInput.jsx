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
  const [tList] = useTranslation("dropdowns")

  const fishTool = tList("fishing-gear", {returnObjects: true})

  const fish = tList("species", {returnObjects: true})

  const activites = tList("activity", {returnObjects: true})

  const {handleFieldChange, fields} = useStore()
  const [t] = useTranslation("forms")

  /** IsString */
  function isString(s) {
    return (typeof s === 'string' || s instanceof String)
  }

  /** Validate fields */
  const validate = (name, value) => {
    switch (name){
    case "PO":
      return (isString(value) && value.length === 5)
    // Look up case fall-through for expalining the 3 case down bellow
    // TODO: Add check for expectedFishingStart is after depature osv
    case "expectedFishingStart":
    case "fishingStart":
    case "departure":
    case "portArrival":
      return (new Date(value)).getTime() > 0
    case "AC":
      return (activites.map(({value}) => value)).includes(value)
    case "endFishingSpot":
    case "startFishingSpot":
    case "expectedFishingSpot":
      // TODO: Find something better
      var patt = /^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/
      return !!(`${value.latitude },${ value.longitude}`).match(patt)
    case "DS":
      return (fish.map(({value}) => value)).includes(value)
    case "CA":
    case "OB":
    case "KG":
      // TODO: Fix NaN error when going from -1 to 0 and unfocus field
      var result = true
      for (var object in value){
        result = ((fish.map(({value}) => value)).includes(object) && (value[object] === "" || value[object] >= 0))
      }
      return result
    case "QI":
      return (value <= 7 && value >= 1)
    case "GS":
      return (value <= 4 && value >= 1)
    case "DU":
      return value >= 0
    case "GE":
      return (fishTool.map(({value}) => value)).includes(value)
    case "GP":
      return (value <= 6 && value >= 0)
    case "ZO":
      return (isString(value) && value.length === 3)
    case "LS":
      return (isString(value) && value.length > 0)
    case "ME":
      return value > 0
    default:
      return false
    }
  }

  const handleChange = (name, value) => {
    const error = validate(name, value) // TODO: validate[dataId](value) // Validating the field
    console.log(name, value)
    if (!error) {
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