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
    const {handleFieldChange, messages, position} = this.context

    // Form type does not exist was opened, don't continue
    if (!Object.keys(forms).includes(type)) return


    /** REVIEW: When this componentDidMount is called,
     * messages is probably still empty,
     * if the user opens the form in a new tab, instead of coming from the dashboard.
     */

    const now = format(Date.now(), "yyyy-MM-dd'T'HH:mm", {awareOfUnicodeTokens: true})


    let newFields = {}
    switch (type) {
    case "DEP": {
      newFields = {
        ...newFields,
        departure: now
      }
      const lastMessage = messages.find(m => m.TM === "DEP")

      if (lastMessage) {
        const {PO, AC, expectedFishingSpot, DS, OB} = lastMessage

        newFields = {
          ...newFields,
          PO: t("dropdowns.ports", {returnObjects: true}).find(({value}) => value === PO).value,
          expectedFishingSpot: t("dropdowns.expectedFishingSpot", {returnObjects: true})
            .find(({latitude: lat, longitude: long}) => GEOPOINT(lat, long).isEqual(expectedFishingSpot)),
          AC: t("dropdowns.activity", {returnObjects: true}).find(({value}) => value === AC).value,
          DS: t("dropdowns.species", {returnObjects: true}).find(({value}) => value === DS).value,
          OB
        }
      }
      break
    }
    case "DCA": {
      newFields = {
        ...newFields,
        fishingStart: now,
        endFishingSpot: position
      }
      const lastMessage = messages.find(m => m.TM === "DCA")

      if (lastMessage) {
        const {QI} = lastMessage

        newFields = {
          ...newFields,
          QI: t("dropdowns.fishingPermit", {returnObjects: true}).find(({value}) => value === QI).value
        }
      }
      break
    }

    default: break
    }
    handleFieldChange(newFields)
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
    const {fields} = this.context
    return (
      <Page style={{marginBottom: 64}} title={t(`${type}.title`)}>
        <Grid alignItems="center" container direction="column" spacing={16}>
          <Grid component="form" item onSubmit={this.handleSubmit}>
            {form ? form.map(({id, step}) => // If a valid form, iterate over its steps
              <Grid container direction="column" key={id} spacing={16} style={{paddingBottom: 32}}>
                <Grid component={Typography} item variant="subtitle2" xs={12}>{t(`${type}.steps.${id}`)}</Grid>
                {step.map(({id, dataId, type, unit, isMulti, dropdown, inputType, dependent}) => // Iterate over all the input fields in a Form step
                  (!dependent ||
                        dependent.when.includes(fields[dependent.on] ?
                          (fields[dependent.on].value || fields[dependent.on]) :
                          "")
                  ) ?
                    <Grid item key={id}>
                      <FormInput
                        dataId={dataId || id}
                        id={id}
                        options={{isMulti, dropdown, inputType, unit}}
                        type={type}
                      />
                    </Grid>
                    : null

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
                type="submit"
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