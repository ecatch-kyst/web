import React from 'react'
import Select from 'react-select'
import {useTranslation} from 'react-i18next'
import AddFishingSpot from "./AddFishingSpot"
import {GEOPOINT} from '../../../lib/firebase'
import {useStore} from '../../../hooks'

import withStyle, {components, GroupLabel} from './vendor/ReactSelect'

export const Dropdown = ({disabled, classes, theme, isMulti, placeholder, type, onChange, dataId, value}) => {

  const [t] = useTranslation("dropdowns")
  const {custom: {fishingSpots, ports, tools, activities}} = useStore()


  const selectStyles = {
    input: base => ({
      ...base,
      color: theme.palette.text.primary,
      '& input': {
        font: 'inherit'
      }
    })
  }

  let allOptions = t(type, {returnObjects: true})
  console.log(allOptions, type)


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

    switch (type) {
    case "expectedFishingSpot":
      allOptions = fishingSpots
      selectOptions = fishingSpots
      components.NoOptionsMessage = AddFishingSpot
      break

    case "ports":
      const portOptions = ports.map(p => allOptions.find(o => o.value === p.value))
      const newOptions = allOptions.filter(o => !portOptions.find(p => p.value === o.value))
      selectOptions = [
        {
          label: t("labels.favorites"),
          options: portOptions
        },
        {
          label: t("labels.all"), //TODO: Translate
          options: newOptions
        }
      ]
      break

    case "fishing-gear":
      const fishingGearOptions = tools.map(p => allOptions.find(o => o.value === p.value))
      const newfishingGearOptions = allOptions.filter(o => !fishingGearOptions.find(p => p.value === o.value))
      selectOptions = [
        {
          label: t("labels.favorites"),
          options: fishingGearOptions
        },
        {
          label: t("labels.all"), //TODO: Translate
          options: newfishingGearOptions
        }
      ]
      break
    case "activity":
      const activityOptions = activities.map(p => allOptions.find(o => o.value === p.value))
      const newActivityOptions = allOptions.filter(o => !activityOptions.find(p => p.value === o.value))
      selectOptions = [
        {
          label: t("labels.favorites"),
          options: activityOptions
        },
        {
          label: t("labels.all"), //TODO: Translate
          options: newActivityOptions
        }
      ]
      break
    default:
      break
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
    <Select
      classes={classes}
      components={components}
      formatGroupLabel={GroupLabel}
      isDisabled={disabled}
      isMulti={isMulti}
      onChange={handleChange}
      options={selectOptions}
      placeholder={placeholder}
      styles={selectStyles}
      textFieldProps={{InputLabelProps: {shrink: true}}}
      value={selectValue}
    />
  )
}

export default withStyle(Dropdown)