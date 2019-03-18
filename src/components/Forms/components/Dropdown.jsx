import React from 'react'
import Select from 'react-select'
import {useTranslation} from 'react-i18next'
import AddFishingSpot from "./AddFishingSpot"
import {GEOPOINT} from '../../../lib/firebase'
import {useStore} from '../../../hooks'

import withStyle, {components} from './vendor/ReactSelect'

export const Dropdown = ({disabled, classes, theme, isMulti, placeholder, type, onChange, dataId, value}) => {

  const [t] = useTranslation("forms")
  const {custom: {fishingSpots}} = useStore()


  const selectStyles = {
    input: base => ({
      ...base,
      color: theme.palette.text.primary,
      '& input': {
        font: 'inherit'
      }
    })
  }

  let options = t(`dropdowns.${type}`, {returnObjects: true})
  let handleChange
  let selectValue

  if (isMulti) {

    handleChange = options => {
      onChange(dataId, {...options.reduce((acc, option) => ({
        ...acc, [option.value]: value[option.value] || 0
      }), {})})
    }

    selectValue = options.reduce((acc, option) => {
      if (Object.keys(value).includes(option.value)) return [...acc, option]
      else return acc
    }, [])

  } else {

    if(type === "expectedFishingSpot"){
      options = fishingSpots
      components.NoOptionsMessage = AddFishingSpot
    }

    handleChange = ({value}) => onChange(dataId, value)
    value = options.find(option =>
      option.value === value ||
      //REVIEW: Better solution to match geopoints ?
      (option.value.latitude && value.latitude &&
        GEOPOINT(option.value.latitude, option.value.longitude)
          .isEqual(GEOPOINT(value.latitude, value.longitude))
      )
    )
  }

  return(
    <Select
      classes={classes}
      components={components}
      isDisabled={disabled}
      isMulti={isMulti}
      onChange={handleChange}
      options={options}
      placeholder={placeholder}
      styles={selectStyles}
      textFieldProps={{InputLabelProps: {shrink: true}}}
      value={selectValue}
    />
  )
}

export default withStyle(Dropdown)