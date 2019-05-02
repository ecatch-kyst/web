import React, {useContext} from 'react'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import {withStyles, Input, Select, Grid} from '@material-ui/core'
import {useTranslation} from 'react-i18next'
import {GEOPOINT} from '../../../lib/firebase'
import Store from '../../../db'
import {AddFishingSpot} from "./AddFishingSpot"

const style = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  formControl: {
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2
  }
})

// REVIEW: expectedFishingSpot makes the component a bit bloated. Separate into a DropwodnLocation?

const DropdownNative = ({disabled, label, type, onChange, dataId, value, error, classes}) => {

  let AddOption
  const [t] = useTranslation("dropdowns")
  const {custom: {fishingSpots, ...custom}} = useContext(Store)

  let allOptions = t(type, {returnObjects: true})

  let selectOptions = allOptions

  const handleChange = ({target: {value}}) => {
    if (type === "expectedFishingSpot") {
      value = selectOptions.find(s => s.id === value)
      if(value) onChange({name: dataId, value: value.value})
    } else {
      onChange({name: dataId, value: isNaN(value) ? value : parseInt(value, 10)})
    }
  }

  if (["ports", "fishingGear", "activity", "species", "fishingPermit", "ZO"].includes(type)) {
    const favorites = custom[type].map(p => allOptions.find(o => o.value === p.value))
    const newOptions = allOptions.filter(o => !favorites.find(p => p.value === o.value))
    selectOptions = [
      {
        label: t("labels.favorites"),
        options: favorites
      },
      {
        label: t("labels.all"),
        options: newOptions
      }
    ]
  } else if( type === "expectedFishingSpot") {
    allOptions = fishingSpots
    selectOptions = fishingSpots
    AddOption = AddFishingSpot
  }


  const selectOption = allOptions.find(option =>
    option.value === value ||
      /*
       * BUG:, REVIEW: Better solution to match geopoints ?
       */
      (option.value && option.value.latitude && value.latitude &&
        GEOPOINT(option.value.latitude || 0, option.value.longitude || 0)
          .isEqual(GEOPOINT(value.latitude, value.longitude))
      )
  )

  return (
    <FormControl className={classes.formControl} error={error}>
      <InputLabel htmlFor="name-native-error">{label}</InputLabel>
      <Grid container direction="column" style={{marginTop: 16}}>
        <Grid item xs={11}>
          <Select
            disabled={disabled}
            fullWidth
            input={<Input id="name-native-error" />}
            name={dataId}
            native
            onChange={handleChange}
            value={selectOption ? selectOption.id || selectOption.value : ""}
          >
            <SelectOptions selectOptions={selectOptions}/>
          </Select>
        </Grid>
        <Grid item style={{padding: "16px 8px 8px"}}>
          {AddOption ? <AddOption/> : null}
        </Grid>
      </Grid>
      {/* {error ? <FormHelperText>This is an error</FormHelperText> : null} TODO: Show error message*/}
    </FormControl>
  )
}


const SelectOptions = ({selectOptions=[]}) =>
  selectOptions.map(({label, options, value, id}) =>
    !options ?
      <option key={id || value} value={id || value}>{label}</option> :
      <optgroup key={label} label={label}>
        {options.map(({id, value, label}) =>
          <option key={id || value} value={id || value}>{label}</option>
        )}
      </optgroup>
  )

export default withStyles(style)(DropdownNative)