import React, {useContext} from 'react'
import {Select, Card, CardHeader, CardContent, Typography, Grid} from '@material-ui/core'
import {useTranslation} from "react-i18next"
import Store from '../../../db'

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
  } = useContext(Store)

  // Handles the set or update of favorites in Firebase
  const handleChange = index => ({target: {value}}) =>
    handleCustomListChange({
      name: "value",
      value: isNaN(value) ? value : parseInt(value, 10),
      callback: () => addToCustomList(type, `${index}`)})

  // This will render a grid in a grid with numberOfChoice select for favorites
  const selectedOption = i => options.find(option => custom[type][i] && option.value === custom[type][i].value)
  return (
    <Card style={{marginBottom: 32, minWidth: "70vw", maxWidth: 640}}>
      <CardHeader title={presetT(`headline.${type}`)}/>
      <CardContent>
        {Array.from({length: numberOfChoices}).map((_, i) =>
          <Grid
            alignItems="center"
            container
            justify="space-between"
            key={i}
            style={{padding: "0 32px 0 16px"}}
          >
            <Typography>{i+1}</Typography>
            <Grid item xs={11}>
              <Select
                disabled={disabled}
                fullWidth
                native
                onChange={handleChange(i)}
                placeholder={placeholder}
                value={selectedOption(i) ? selectedOption(i).value : ""}
              >
                {options.map(({label, value}) =>
                  <option key={value} value={value}>{label}</option>
                )}
                <option value=""/>
              </Select>
            </Grid>
          </Grid>
        )}
      </CardContent>
    </Card>
  )
}