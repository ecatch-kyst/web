import React from 'react'
import {Grid, Typography} from '@material-ui/core'
import {useTranslation} from "react-i18next"
import {useStore} from '../../../hooks'
import MuiSelect from "../../../vendor/ReactSelect"


export default ({type, numberOfChoices}) => {
  const [t] = useTranslation("dropdowns")
  const [presetT] = useTranslation("preset")
  const options = t(type, {returnObjects: true})
  const placeholder = presetT(`placeholders.${type}`)
  const disabled = false
  const {
    handleCustomListChange,
    addToCustomList,
    custom
  } = useStore()

  // Handles the set or update of favorites in Firebase
  const handleChange = (option, index) =>
    handleCustomListChange({
      name: "value",
      value: option.value,
      callback: () => addToCustomList(type, `${index}`)})

  // This will render a grid in a grid with numberOfChoice select for favorites
  return (
    <div>
      <Typography variant="h6">{presetT(`headline.${type}`)}</Typography>
      <Grid alignItems="stretch" container direction="column" spacing={16}>
        <Grid item>
          {Array.from({length: numberOfChoices}).map((_, i) =>
            <MuiSelect
              isDisabled={disabled}
              key={i}
              onChange={option => handleChange(option, i)}
              options={options}
              placeholder={placeholder}
              textFieldProps={{InputLabelProps: {shrink: true}}}
              value={options.find(option => custom[type][i] && option.value === custom[type][i].value)}
            />
          )}
        </Grid>
      </Grid>
    </div>
  )
}