import React, {memo, useContext} from 'react'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import {withStyles, FormHelperText, Input, Select} from '@material-ui/core'
import {useTranslation} from 'react-i18next'
import {GEOPOINT} from '../../../lib/firebase'
import Store from '../../../db'


const style = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2
  }
})

const DropdownNative = ({disabled, label, type, onChange, dataId, value, error, classes}) => {

  const [t] = useTranslation("dropdowns")
  const {custom: {fishingSpots, ...custom}} = useContext(Store)

  let allOptions = t(type, {returnObjects: true})

  let selectOptions = allOptions

  const handleChange = ({target: {value}}) => onChange({name: dataId, value})

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
  }


  const selectOption = allOptions.find(option =>
    option.value === value ||
      //REVIEW: Better solution to match geopoints ?
      (option.value && option.value.latitude && value.latitude &&
        GEOPOINT(option.value.latitude, option.value.longitude)
          .isEqual(GEOPOINT(value.latitude, value.longitude))
      )
  )

  return (
    <FormControl className={classes.formControl} error={error}>
      <InputLabel htmlFor="name-native-error">{label}</InputLabel>
      <Select
        disabled={disabled}
        input={<Input id="name-native-error" />}
        name={dataId}
        native
        onChange={handleChange}
        value={selectOption ? selectOption.id || selectOption.value : ""}
      >
        <SelectOptions selectOptions={selectOptions}/>
        <option value="" />
      </Select>
      {error ? <FormHelperText>Error</FormHelperText> : null}
    </FormControl>
  )
}


const SelectOptions = memo(({selectOptions=[]}) =>
  selectOptions.map(({label, options, value}) =>
    !options ?
      <option key={value} value={value}>{label}</option> :
      <optgroup key={label} label={label}>
        {options.map(({value, label}) =>
          <option key={value} value={value}>{label}</option>
        )}
      </optgroup>
  ), ({selectOptions: [pOption]}, {selectOptions: [option]}) => pOption && option && option.value === pOption.value // REVIEW:
)

export default withStyles(style)(DropdownNative)