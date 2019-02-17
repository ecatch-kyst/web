import React, {useContext} from 'react'
import {Link, Redirect} from "react-router-dom"
import forms from "./forms.json"
import {Grid, TextField, Button, Divider, Typography} from '@material-ui/core'
import {routes} from '../../lib/router.js'
import {useTranslation} from 'react-i18next'
import {Page} from '../shared'
import Store from '../../db'

const Form = ({match: {params: {type}}}) => {
  const [t] = useTranslation("forms")
  const store = useContext(Store)
  const form = forms[type]
  const handleSubmit = e => {
    e.preventDefault && e.preventDefault()
    // TODO: Submit form with dialog and notification.
    store.handleDialog(type, () => Promise.resolve())
  }
  return (
    <Page style={{marginBottom: 64}} title={t(`${type}.title`)}>
      <Grid alignItems="center" container direction="column" spacing={16}>
        <Grid component="form" item onSubmit={handleSubmit}>
          {form && form.length ? form.map(({id, fields}) =>
            <Grid container direction="column" key={id} spacing={16} style={{paddingBottom: 32}}>
              <Grid component={Typography} item variant="subtitle2">{t(`${type}.steps.${id}`)}</Grid>
              {fields.map(({id, name, type}) =>
                <Grid item key={id}>
                  <TextField // TODO: Extract into FormInput component. Add validation, change handlers etc. Use Store to store values for each forms.
                    name={name}
                    placeholder={name}
                    type={type}
                  />
                </Grid>
              )}
              <Divider style={{marginTop: 16}}/>
            </Grid>
          ) : <Redirect to={routes.DASHBOARD}/>}
        </Grid>
        <Grid container item>
          <Grid item>
            <Button
              color="secondary"
              component={Link}
              size="large"
              to={routes.DASHBOARD}
            >
              {t("links.back")}
            </Button>
          </Grid>
          <Grid item>
            <Button
              color="primary"
              onClick={handleSubmit}
              size="large"
              variant="contained"
            >
              {t(`${type}.submit`)}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Page>
  )
}

export default Form