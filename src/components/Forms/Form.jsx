import React, {memo, useContext, useEffect} from 'react'

import {Link, withRouter} from "react-router-dom"
import forms from "./schema.json"
import {Grid, Button, Typography, Card, CardHeader, CardContent} from '@material-ui/core'
import {routes} from '../../lib/router.js'
import {useTranslation} from 'react-i18next'
import {Page} from '../shared'

import FormInput from './FormInput.jsx'
import Store from '../../db'
import {addHours, format} from 'date-fns'
import {usePosition} from '../../hooks/index.js'


/**
 * Form component
 * @param {object} props
 * @param {object} props.match
 * @param {object} props.match.params
 * @param {'DEP'|'DCA'|'POR'} props.match.params.type - Type of form
 * @param {number} props.match.params.messageId - id of message if form is used for editing
 */
const Form = ({match: {path, params: {type}}, history}) => {
  const position = usePosition()
  const [t] = useTranslation("forms")
  const {
    handleFieldChange, messages, fishOnBoard, custom: {activity: [firstActivity], ports: [firstPort], fishingGear: [firstFishingGear], fishingPermit: [firstFishingPermit], species: [firstSpecies], ZO: [firstZO]}, fields
  } = useContext(Store)

  const prefill = () => {
    let newFields = {...fields}

    const messageType = type === "DCA0" ? "DCA" : type
    const baseMessage = messages.find(({TM}) => TM === messageType) || {}

    const now = new Date()
    switch (type) {
    case "DEP":
      newFields = {
        ...newFields,
        departure: now,
        expectedFishingStart: addHours(now, 2)
      } // These values will be preset, no matter if there is a base message.
      if (Object.keys(baseMessage).length) {
        newFields = {
          ...newFields,
          AC: baseMessage.AC,
          DS: baseMessage.DS,
          PO: baseMessage.PO,
          OB: fishOnBoard,
          expectedFishingSpot: baseMessage.expectedFishingSpot
        }
      }
      else {
        newFields = {
          ...newFields,
          AC: (firstActivity || {}).value,
          DS: (firstSpecies || {}).value,
          PO: (firstPort || {}).value
        }
      }
      break

    case "DCA0":
      newFields = {
        ...newFields,
        fishingStart: now,
        startFishingSpot: position
      } // These values will be preset, no matter if there is a base message.
      if (Object.keys(baseMessage).length) {
        newFields = {
          ...newFields,
          AC: baseMessage.AC,
          GS: baseMessage.GS,
          QI: baseMessage.QI,
          GE: baseMessage.GE,
          ZO: baseMessage.ZO
        } // Preset from base (previous message, with the same type)
      }
      else {
        newFields = {
          ...newFields,
          AC: (firstActivity || {}).value,
          QI: (firstFishingPermit || {}).value,
          GE: (firstFishingGear || {}).value,
          ZO: (firstZO || {}).value
        }

      }
      break

    case "DCA":
      newFields = {
        ...newFields,
        endFishingSpot: position,
        DU: newFields.fishingStart ? parseInt(format(Date.now() - new Date(newFields.fishingStart).getTime(), "m"), 10) : 1
      } // These values will be preset, no matter if there is a base message.
      if (Object.keys(baseMessage).length) {
        newFields = {
          ...newFields,
          PO: baseMessage.PO,
          AC: baseMessage.AC,
          expectedFishingSpot: baseMessage.expectedFishingSpot,
          DS: baseMessage.DS,
          CA: baseMessage.CA,
          GE: baseMessage.GE,
          GS: baseMessage.GS,
          QI: baseMessage.QI
        } // Preset from base (previous message, with the same type)
      }
      else {
        newFields = {
          ...newFields,
          PO: (firstPort || {}).value,
          AC: (firstActivity || {}).value,
          DS: (firstSpecies || {}).value,
          QI: (firstFishingPermit || {}).value,
          GE: (firstFishingGear || {}).value
        }
      }
      break
    case "POR":
      newFields = {
        ...newFields,
        portArrival: now, // NOTE: try to calculate from position, speed and PO (port)
        KG: fishOnBoard,
        OB: fishOnBoard
      } // These values will be preset, no matter if there is a base message.
      if (Object.keys(baseMessage).length) {
        newFields = {
          ...newFields,
          LS: baseMessage.LS,
          PO: baseMessage.PO
        } // Preset from base (previous message, with the same type)
      }
      else {
        newFields = {
          ...newFields,
          PO: (firstPort || {}).value
        }
      }
      break
    default:
      break
    }

    handleFieldChange(newFields)
  }

  useEffect(() => {
    prefill()
  })

  const toDashboard = () => {
    history.push(routes.HOMEPAGE)
  }

  const form = forms[type] // Extract form from forms.json
  return (
    <Page title={() => <Typography align="center" style={{padding: 16}} variant="h4">{t(`${type}.title`)}</Typography>}>
      <Grid alignItems="center" container direction="column" style={{margin: "32px 0 92px"}}>
        <Grid item>
          {form.map(({id, step}) => // If a valid form, iterate over its steps
            <Card key={id} style={{marginBottom: 32}}>
              <CardHeader title={t(`${type}.steps.${id}`)}/>
              <Grid component={CardContent} container direction="column" spacing={16}>
                {step.map(({id, dataId, type, dependent, options={}}) => // Iterate over all the input fields in a Form step
                  (!dependent || dependent.when.includes(fields[dependent.on] || "")) ?
                    <Grid item
                      key={id}
                    >
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
              </Grid>
            </Card>
          )}
        </Grid>
        <Grid container item justify="center">
          <Grid item>
            <Button
              color="secondary"
              component={Link}
              to={routes.HOMEPAGE}
            >
              {t("links.back")}
            </Button>
          </Grid>
          <Grid item>
            <SubmitButton toDashboard={toDashboard} type={type}/>
          </Grid>
        </Grid>
      </Grid>
    </Page>
  )
}

export default withRouter(Form)


export const SubmitButton = memo(({type, toDashboard}) => {
  const [t] = useTranslation("forms")
  const {
    handleDialog, constructMessage, validateMessage, submitMessage, toggleDCAStart
  } = useContext(Store)
  /**
   * Submits the filled out form.
   */
  const handleSubmit = e => {
    e.preventDefault()
    const message = constructMessage(type)
    const valid = validateMessage(message, type === "DCA0")

    if (valid) {
      if (type === "DCA0") {
        toDashboard()
        toggleDCAStart(true)
      } else {
        handleDialog({type, submit: () => submitMessage(message)})
      }
    }
  }


  return (
    <Button
      // disabled={disabled} // TODO: add disable on invalid form
      color="primary"
      onClick={handleSubmit}
      /*
       * onPointerDown={handlePointerDown}
       * onPointerUp={handlePointerUp}
       */
      type="submit"
      variant="contained"
    >
      {t(`${type}.submit`)}
    </Button>
  )
})