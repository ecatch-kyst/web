import React, {useContext} from 'react'

import {Link, Redirect, withRouter} from "react-router-dom"
import forms from "./forms.json"
import {Grid, Button, Divider, Typography} from '@material-ui/core'
import {routes} from '../../lib/router.js'
import {useTranslation} from 'react-i18next'
import {Page} from '../shared'
import Store from '../../db'

import FormInput from './FormInput.jsx'

/**
 * Form component
 * @param {object} props
 * @param {object} props.match
 * @param {object} props.match.params
 * @param {'DEP'|'DCA'|'POR'} props.match.params.type - Type of form
 */
function Form ({match: {params: {type}}}) {
  const [t] = useTranslation("forms")
  const store = useContext(Store)
  const form = forms[type] // Extract form from forms.js

  /**
   * Submits the filled out form.
   */
  function handleSubmit (e) {
    e.preventDefault && e.preventDefault()
    store.handleDialog({type, submit: () => store.submitMessage(type)})
  }
  return (
    <Page style={{marginBottom: 64}} title={t(`${type}.title`)}>
      <Grid alignItems="center" container direction="column" spacing={16}>
        <Grid component="form" item onSubmit={handleSubmit}>
          {form && form.length ? form.map(({id, fields}) => // If a valid form, iterate over its blocks
            <Grid container direction="column" key={id} spacing={16} style={{paddingBottom: 32}}>
              <Grid component={Typography} item variant="subtitle2">{t(`${type}.steps.${id}`)}</Grid>
              {fields.map(({id, dataId, type, isMulti, dropdown, inputType}) => // Iterate over all the input fields in a Form block
                <Grid item key={id}>
                  <FormInput
                    dataId={dataId || id}
                    id={id}
                    options={{isMulti, dropdown, inputType}}
                    type={type}
                  />
                </Grid>
              )}
              <Divider style={{marginTop: 16}}/>
            </Grid>
          ) :
            <Redirect to={routes.DASHBOARD}/> // If the form is invalid, redirect to the dashboard
          }
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

export default withRouter(Form)