import React, {Component} from 'react'

import {Link, Redirect} from "react-router-dom"
import forms from "./forms.json"
import {Grid, Button, Divider, Typography} from '@material-ui/core'
import {routes} from '../../lib/router.js'
import {withTranslation} from 'react-i18next'
import {Page} from '../shared'
import Store from '../../db'

import FormInput from './FormInput.jsx'
import {format} from 'date-fns'
import {GEOPOINT} from '../../lib/firebase.js'

/**
 * Form component
 * @param {object} props
 * @param {object} props.match
 * @param {object} props.match.params
 * @param {'DEP'|'DCA'|'POR'} props.match.params.type - Type of form
 */
class Form extends Component {
  static contextType = Store

  componentDidMount() {
    const {match: {params: {type}}, t} = this.props
    const {handleFieldChange, messages} = this.context

    const ports = t("dropdowns.ports", {returnObjects: true})
    const activities = t("dropdowns.activity", {returnObjects: true})
    const expectedFishingSpots = t("dropdowns.expectedFishingSpot", {returnObjects: true})
    const species = t("dropdowns.species", {returnObjects: true})

    switch (type) {
    case "DEP": {
      const lastMessage = messages.find(m => m.TM === "DEP")
      if (lastMessage) {
        handleFieldChange({
          PO: ports.find(port => port.value === lastMessage.PO),
          expectedFishingSpot: expectedFishingSpots
            .find(({latitude, longitude}) => GEOPOINT(latitude, longitude).isEqual(lastMessage.expectedFishingSpot)),
          AC: activities.find(activity => activity.value === lastMessage.AC),
          DS: species.find(species => species.value === lastMessage.DS),
          departure: format(Date.now(), "yyyy-MM-dd'T'HH:mm", {awareOfUnicodeTokens: true})
        })
      }
      break
    }

    default:
      break
    }
  }

  /**
   * Submits the filled out form.
   */
  handleSubmit = e => {
    e.preventDefault && e.preventDefault()
    const {handleDialog, submitMessage} = this.context
    const {type} = this.props.match.params
    handleDialog({type, submit: () => submitMessage(type)})
  }

  render() {
    const {t} = this.props
    const {type} = this.props.match.params
    const form = forms[type] // Extract form from forms.js

    return (
      <Page style={{marginBottom: 64}} title={t(`${type}.title`)}>
        <Grid alignItems="center" container direction="column" spacing={16}>
          <Grid component="form" item onSubmit={this.handleSubmit}>
            {form && form.length ? form.map(({id, fields}) => // If a valid form, iterate over its blocks
              <Grid container direction="column" key={id} spacing={16} style={{paddingBottom: 32}}>
                <Grid component={Typography} item variant="subtitle2" xs={12}>{t(`${type}.steps.${id}`)}</Grid>
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
          <Grid container item justify="center">
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
                onClick={this.handleSubmit}
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
}

export default withTranslation("forms")(Form)