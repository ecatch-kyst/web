import React from 'react'
import {useTranslation} from 'react-i18next'
import AddFishingSpot from "./AddFishingSpot"
import {GEOPOINT} from '../../../lib/firebase'
import {useStore} from '../../../hooks'

import MuiSelect from "../../../vendor/ReactSelect"

export const Dropdown = ({disabled, isMulti, placeholder, type, onChange, dataId, value}) => {

  const [t] = useTranslation("dropdowns")
  const {custom: {fishingSpots, ...custom}} = useStore()

  const components = {}


  let allOptions = t(type, {returnObjects: true})


  let selectOptions = allOptions

  let handleChange
  let selectValue

  if (isMulti) {

    handleChange = options => {
      onChange(dataId, {...options.reduce((acc, option) => ({
        ...acc, [option.value]: value[option.value] || 0
      }), {})})
    }

    selectValue = allOptions.reduce((acc, option) => {
      if (Object.keys(value).includes(option.value)) return [...acc, option]
      else return acc
    }, [])

  } else {

    if (["ports", "fishingGear", "activity", "species", "fishingPermit", "ZO"].includes(type)) {
      const favorites = custom[type].map(p => allOptions.find(o => o.value === p.value))
      const newOptions = allOptions.filter(o => !favorites.find(p => p.value === o.value))
      selectOptions = [
        {
          label: t("labels.favorites"),
          options: favorites
        },
        {
          label: t("labels.all"), //TODO: Translate
          options: newOptions
        }
      ]
    } else if( type === "expectedFishingSpot") {
      allOptions = fishingSpots
      selectOptions = fishingSpots
      components.NoOptionsMessage = AddFishingSpot
      
    }
    
    handleChange = ({value}) => onChange(dataId, value)
    
    
    selectValue = allOptions.find(option =>
      option.value === value ||
      //REVIEW: Better solution to match geopoints ?
      (option.value.latitude && value.latitude &&
        GEOPOINT(option.value.latitude, option.value.longitude)
        .isEqual(GEOPOINT(value.latitude, value.longitude))
        )
    )
  }
  
  return(
    <MuiSelect
      components={components}
      isDisabled={disabled}
      isMulti={isMulti}
      onChange={handleChange}
      options={selectOptions}
      placeholder={placeholder}
      textFieldProps={{InputLabelProps: {shrink: true}}}
      value={selectValue}
    />
  )
}



export default Dropdown