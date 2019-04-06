import React, {useEffect, useState} from 'react'

import {Link, withRouter} from "react-router-dom"
import forms from "./forms.json"
import {Grid, Button, Divider, Typography} from '@material-ui/core'
import {routes} from '../../lib/router.js'
import {useTranslation} from 'react-i18next'
import {Page} from '../shared'

import FormInput from './FormInput.jsx'
import {useStore} from '../../hooks'
import {addHours, format} from 'date-fns'


/**
 * Form component
 * @param {object} props
 * @param {object} props.match
 * @param {object} props.match.params
 * @param {'DEP'|'DCA'|'POR'} props.match.params.type - Type of form
 * @param {number} props.match.params.messageId - id of message if form is used for editing
 */
export const Form = ({history, match: {path, params: {type, messageId}}}) => {
  const {fields, handleFieldChange, messages, position, handleDialog, submitMessage, trips, toggleDCAStart} = useStore()
  const [t] = useTranslation("forms")

  const [setCanEdit] = useState(false)
  const [baseMessage, setBaseMessage] = useState({})

  const [validType, setValidType] = useState(false)


  useEffect(() => {

    setCanEdit(messageId && type === "DCA"&& messages.find(m => m.TM === "DCA" && m.RN === parseInt(messageId, 10)))
    const newValidType = Object.keys(forms).includes(type)
    setValidType(newValidType)
    if (newValidType)
      setBaseMessage(messages.find(m => m.TM === type) || {})
  }, [])


  useEffect(() => {
    if(!validType) return
    let newFields = {}//{...initialValues.fields} // Start with empty fields, to prevent rogue values.
    const now = new Date()
    switch (type) {
    case "DEP":
      newFields = { // These values will be preset, no matter if there is a base message.
        ...newFields,
        departure: now,
        expectedFishingStart: addHours(now, 2)
      }
      if (Object.keys(baseMessage).length) {
        newFields = { // Preset from base (previous message, with the same type)
          ...newFields,
          AC: baseMessage.AC,
          DS: baseMessage.DS,
          PO: baseMessage.PO,
          OB: baseMessage.OB,
          expectedFishingSpot: baseMessage.expectedFishingSpot
        }
      }
      break

    case "DCA0":
      newFields = { // These values will be preset, no matter if there is a base message.
        ...newFields,
        fishingStart: now,
        startFishingSpot: position,
        GE: "DRB"
      }
      if (Object.keys(baseMessage).length) {
        newFields = { // Preset from base (previous message, with the same type)
          ...newFields,
          AC: baseMessage.AC,
          GS: baseMessage.GS,
          QI: baseMessage.QI
        }
      }
      break
    case "DCA":
      newFields = { // These values will be preset, no matter if there is a base message.
        ...newFields,
        endFishingSpot: position,
        DU: fields.fishingStart ? parseInt(format(Date.now() - new Date(fields.fishingStart).getTime(), "m"), 10) : 0
      }
      if (Object.keys(baseMessage).length) {
        newFields = { // Preset from base (previous message, with the same type)
          ...newFields,
          PO: baseMessage.PO,
          AC: baseMessage.AC,
          expectedFishingSpot: baseMessage.expectedFishingSpot,
          DS: baseMessage.DS,
          CA: baseMessage.CA,
          GE: baseMessage.GE,
          GS: baseMessage.GS,
          QI: baseMessage.QI
        }
      }
      break
    case "POR":
      newFields = { // These values will be preset, no matter if there is a base message.
        ...newFields,
        portArrival: now // NOTE: try to calculate from position, speed and PO (port)
      }
      if (Object.keys(baseMessage).length) {
        const activeTrip = trips.find(t => !t.isFinished)
        const sum = activeTrip ? activeTrip.DCAList.reduce((acc, d) => {
          Object.entries(d.CA).forEach(([type, weight]) => {
            acc[type] ? acc[type] += weight : acc[type] = weight
          })
          return acc
        }, {}) : {}

        newFields = { // Preset from base (previous message, with the same type)
          ...newFields,
          KG: sum,
          LS: baseMessage.LS,
          OB: sum,
          PO: baseMessage.PO
        }
      }
      break
    default:
      break
    }
    console.log(newFields)
    handleFieldChange(newFields)
  }, [baseMessage /**REVIEW: Deep compare? */, messages.length])


  // useEffect(() => {

  //   // Form type does not exist was opened, don't continue
  //   if (!Object.keys(forms).includes(type)) return


  //   /** REVIEW: When this componentDidMount is called,
  //    * messages is probably still empty,
  //    * if the user opens the form in a new tab, instead of coming from the homepage.
  //    */

  //   const now = new Date()


  //   let newFields = {}
  //   switch (type) {
  //   case "DEP": {
  //     newFields = {
  //       departure: now,
  //       expectedFishingStart: addHours(now, 2) // TODO: Calculate
  //     }

  //     if (baseMessage) {
  //       const {PO, AC, expectedFishingSpot, DS, OB} = baseMessage
  //       newFields = {
  //         ...newFields,
  //         PO,
  //         expectedFishingSpot,
  //         AC,
  //         DS,
  //         OB
  //       }
  //     }
  //     break
  //   }
  //   case "DCA": {

  //     newFields = {
  //       ...newFields,
  //       endFishingSpot: position,
  //       fishingStart: now
  //     }
  //     if (messageId) {
  //       const baseMessage = messages.find(m => m.RN === parseInt(messageId, 10))
  //       if (baseMessage) {
  //         handleFieldChange(baseMessage)
  //         return
  //       }
  //     }

  //     if (baseMessage) {
  //       newFields = {
  //         ...baseMessage,
  //         ...newFields
  //       }
  //     }
  //     break
  //   }

  //   case "POR": {
  //     if (baseMessage) {
  //       handleFieldChange(baseMessage)
  //       return
  //     }
  //     break
  //   }
  //   default: return
  //   }
  //   handleFieldChange(newFields)

  // }, [])


  /**
   * Submits the filled out form.
   */
  const handleSubmit = e => {
    e.preventDefault()
    if (type === "DCA0") {
      toggleDCAStart(true)
      history.push(routes.DASHBOARD)
      return
    }
    handleDialog({type, submit: () => submitMessage(type)})
  }

  const form = forms[type] // Extract form from forms.json


  return (
    <Page style={{marginBottom: 64}} title={t(`${type}.title`)}>
      <Grid alignItems="center" container direction="column" spacing={16}>
        <Grid component="form" item onSubmit={handleSubmit}>
          {form.map(({id, step}) => // If a valid form, iterate over its steps
            <Grid container direction="column" key={id} spacing={16} style={{paddingBottom: 32}}>
              <Grid component={Typography} item variant="subtitle2" xs={12}>{t(`${type}.steps.${id}`)}</Grid>
              {step.map(({id, dataId, type, dependent, options={}}) => // Iterate over all the input fields in a Form step
                (!dependent || dependent.when.includes(fields[dependent.on] || "")) ?
                  <Grid item key={id}>
                    <FormInput
                      dataId={dataId || id}
                      id={id}
                      options={{
                        ...options,
                        editable: ((options.editable !== false) || path.endsWith(routes.NEW))
                      }}
                      type={type}
                    />
                  </Grid>
                  : null
              )}
              <Divider style={{marginTop: 16}}/>
            </Grid>
          )
          }
        </Grid>
        <Grid container item justify="center">
          <Grid item>
            <Button
              color="secondary"
              component={Link}
              size="large"
              to={routes.HOMEPAGE}
            >
              {t("links.back")}
            </Button>
          </Grid>
          <Grid item>
            <Button
              color="primary"
              onClick={handleSubmit}
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

export default withRouter(Form)