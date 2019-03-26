import React from 'react'
import {Grid} from '@material-ui/core'

import TextInput from './TextInput'
import Dropdown from './Dropdown'
import {useTranslation} from 'react-i18next'

const DropdownMap = props => {

  const handleKeyValueChange = (name, inputValue) => {
    const {onChange, dataId, value, inputType} = props
    const newValue = {...value}
    newValue[name] = (inputType === "number" ? parseInt(inputValue, 10) : inputValue) || ""
    onChange(dataId, newValue)
  }


  return (
    <>
      <Dropdown {...props}/>
      <Grid container direction="column" spacing={16} style={{padding: 16}}>
        {Object.entries(props.value).map(([key, value]) =>
          <KeyValueInput
            dataId={key}
            inputType={props.inputType}
            key={key}
            onChange={handleKeyValueChange}
            type={props.type}
            unit={props.unit}
            value={value}
          />
        )}
      </Grid>
    </>
  )
}

const KeyValueInput = ({dataId, inputType, type, ...props}) => {
  const [t] = useTranslation("dropdowns")
  const label = t(type, {returnObjects: true})
    .find(option => option.value === dataId).label

  return (
    <Grid
      {...props}
      component={TextInput}
      dataId={dataId}
      item
      label={label}
      type={inputType}
    />
  )
}

export default DropdownMap