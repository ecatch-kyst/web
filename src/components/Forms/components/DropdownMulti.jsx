import React, {useState, useEffect} from 'react'
import InputLabel from '@material-ui/core/InputLabel'
import {Dialog, Grid, Checkbox, DialogTitle, Button, DialogContent, DialogActions} from '@material-ui/core'
import {useTranslation} from 'react-i18next'


const DropdownMulti = ({disabled, label, type, onChange, dataId, value, error, classes}) => {

  const [t] = useTranslation("dropdowns")
  const [commonT] = useTranslation("common")

  const [open, setOpen] = useState(false)

  const selectOptions = t(type, {returnObjects: true})

  const [selectValues, setSelectValues] = useState({})

  useEffect(() => {
    setSelectValues(selectOptions.reduce((acc, o) =>
      ({...acc, [o.value]: Object.keys(value).includes(o.value)})
    ,{}))
  }, [Object.keys(value).length, open])

  const handleSelectChange = name => () => {
    setSelectValues(s => ({...s, [name]: !s[name]}))
  }

  const handleClose = () => {
    setOpen(false)
    setSelectValues({})
  }

  const handleChange = () => {
    const newValue = {...value}
    Object.entries(selectValues).forEach(([k, checked]) => {
      if (!checked && newValue[k] !== undefined) delete newValue[k]
      else if (checked && newValue[k] === undefined) newValue[k] = 0
    })
    onChange({name: dataId, value: newValue})
    handleClose()
  }


  return (
    <>
      {!disabled ? <Button color="secondary" onClick={() => setOpen(v => !v)} style={{margin: 16}} variant="contained">{t(`labels.${type}.button`)}</Button> : null}
      <Dialog {...{open}} onClose={handleClose}>
        <DialogTitle>{t(`labels.${type}.title`)}</DialogTitle>
        <DialogContent>
          <Grid container style={{padding: 16}}>
            {selectOptions.map(({value, label}) =>
              <Grid container item justify="space-between" key={value} onClick={handleSelectChange(value)} style={{cursor: "pointer"}}>
                <InputLabel>{label}</InputLabel>
                <Checkbox checked={selectValues[value] || false}/>
              </Grid>)
            }
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={handleClose} >
            {commonT(`negative.cancel-message`)}
          </Button>
          <Button color="secondary" onClick={handleChange} variant="contained">
            {commonT(`positive.submit`)}
          </Button>
        </DialogActions>
      </Dialog>

    </>
  )
}


export default DropdownMulti