/* eslint-disable require-jsdoc */
import React from 'react'
import Select from 'react-select'
import {Grid} from '@material-ui/core'
import {withTranslation} from "react-i18next"
import {useStore} from '../../../hooks'
import {withPage} from '../../shared'

export const AddTool = ({t}) => {
  const options = t("fishing-gear", {returnObjects: true})
  const placeholder = "Favorite Tool"
  const disabled = false
  const {
    handleCustomListChange,
    addToCustomList,
    custom: {tools}
  } = useStore()


  function handleChange(option, index) {
    handleCustomListChange({
      name: "value",
      value: option.value,
      callback: () => addToCustomList("tools", `${index}`)})
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
    <Grid alignItems="stretch" container direction="column" spacing={16}>
      <Grid item>
        {new Array(3).fill(null).map((_, i) =>
          <Select
            isDisabled={disabled}
            key={i}
            label={t("customLists.fishingSpots.label")}
            onChange={option => handleChange(option, i)}
            options={options}
            placeholder={placeholder}
            styles={selectStyles}
            textFieldProps={{InputLabelProps: {shrink: true}}}
            value={options.find(option => tools[i] && option.value === tools[i].value)}
          />
        )}
      </Grid>
    </Grid>
  )
}


export default withPage(withTranslation("dropdowns"))(AddTool)