/* eslint-disable require-jsdoc */
import React from 'react'
import Select from 'react-select'
import {Grid, Typography} from '@material-ui/core'
import {useTranslation} from "react-i18next"
import {useStore} from '../../../hooks'

export const AddActivity = () => {
  const [t] = useTranslation("dropdowns")
  const type = "activity"
  const [presetT] = useTranslation("preset")
  const options = t(type, {returnObjects: true})
  const placeholder = presetT(`placeholders.${type}`)
  const disabled = false
  const {
    handleCustomListChange,
    addToCustomList,
    custom: {activity}
  } = useStore()


  function handleChange(option, index) {
    handleCustomListChange({
      name: "value",
      value: option.value,
      callback: () => addToCustomList(type, `${index}`)})
  }

  const selectStyles = {
    input: base => ({
      ...base,
      '& input': {
        font: 'inherit'
      }
    })
  }

  return (
    <div>
      <Typography variant="h6">{presetT(`headline.${type}`)}</Typography>
      <Grid alignItems="stretch" container direction="column" spacing={16}>
        <Grid item>
          {new Array(3).fill(null).map((_, i) =>
            <Select
              isDisabled={disabled}
              key={i}
              onChange={option => handleChange(option, i)}
              options={options}
              placeholder={placeholder}
              styles={selectStyles}
              textFieldProps={{InputLabelProps: {shrink: true}}}
              value={options.find(option => activity[i] && option.value === activity[i].value)}
            />
          )}
        </Grid>

      </Grid>
    </div>
  )
}


export default AddActivity