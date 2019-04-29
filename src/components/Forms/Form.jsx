import React, {memo, Component} from 'react'

import {Link, withRouter} from "react-router-dom"
import forms from "./forms.json"
import {Grid, Button, Typography, Card, CardHeader, CardContent} from '@material-ui/core'
import {routes} from '../../lib/router.js'
import {useTranslation, withTranslation} from 'react-i18next'
import {Page} from '../shared'

import FormInput from './FormInput.jsx'
import {useStore} from '../../hooks'
import {addHours, format} from 'date-fns'
import {withStore} from '../../db/index.js'


/**
 * Form component
 * @param {object} props
 * @param {object} props.match
 * @param {object} props.match.params
 * @param {'DEP'|'DCA'|'POR'} props.match.params.type - Type of form
 * @param {number} props.match.params.messageId - id of message if form is used for editing
 */
class Form extends Component {

  componentDidMount() {this.prefill()}

  componentDidUpdate({store: {messages: pMessages, position: pPosition, custom: pCustom}}) {
    const {messages, position, custom} = this.props.store
    if (!(
      messages.length === pMessages.length &&
      pPosition.latitude === position.latitude &&
      pPosition.longitude === position.longitude &&
      JSON.stringify(pCustom) === JSON.stringify(custom) // REVIEW:
    )) this.prefill()
  }

  prefill = () => {
    const {
      match: {params: {type}},
      store: {
        handleFieldChange, messages, position, trips, fishOnBoard, custom: {activity: [firstActivity], ports: [firstPort], fishingGear: [firstFishingGear], fishingPermit: [firstFishingPermit], species: [firstSpecies], ZO: [firstZO]}, ...store
      }
    } = this.props
    let fields = {...store.fields}

    const messageType = type === "DCA0" ? "DCA" : type
    const baseMessage = messages.find(({TM}) => TM === messageType) || {}

    const now = new Date()
    switch (type) {
    case "DEP":
      fields = {
        ...fields,
        departure: now,
        expectedFishingStart: addHours(now, 2)
      } // These values will be preset, no matter if there is a base message.
      if (Object.keys(baseMessage).length) {
        fields = {
          ...fields,
          AC: baseMessage.AC,
          DS: baseMessage.DS,
          PO: baseMessage.PO,
          OB: fishOnBoard,
          expectedFishingSpot: baseMessage.expectedFishingSpot
        }
      }
      else {
        fields = {
          ...fields,
          AC: (firstActivity || {}).value,
          DS: (firstSpecies || {}).value,
          PO: (firstPort || {}).value
        }
      }
      break

    case "DCA0":
      fields = {
        ...fields,
        fishingStart: now,
        startFishingSpot: position
      } // These values will be preset, no matter if there is a base message.
      if (Object.keys(baseMessage).length) {
        fields = {
          ...fields,
          AC: baseMessage.AC,
          GS: baseMessage.GS,
          QI: baseMessage.QI,
          GE: baseMessage.GE,
          ZO: baseMessage.ZO
        } // Preset from base (previous message, with the same type)
      }
      else {
        fields = {
          ...fields,
          AC: (firstActivity || {}).value,
          QI: (firstFishingPermit || {}).value,
          GE: (firstFishingGear || {}).value,
          ZO: (firstZO || {}).value
        }

      }
      break

    case "DCA":
      fields = {
        ...fields,
        endFishingSpot: position,
        DU: fields.fishingStart ? parseInt(format(Date.now() - new Date(fields.fishingStart).getTime(), "m"), 10) : 0
      } // These values will be preset, no matter if there is a base message.
      if (Object.keys(baseMessage).length) {
        fields = {
          ...fields,
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
        fields = {
          ...fields,
          PO: (firstPort || {}).value,
          AC: (firstActivity || {}).value,
          DS: (firstSpecies || {}).value,
          QI: (firstFishingPermit || {}).value,
          GE: (firstFishingGear || {}).value
        }
      }
      break
    case "POR":
      fields = {
        ...fields,
        portArrival: now, // NOTE: try to calculate from position, speed and PO (port)
        KG: fishOnBoard,
        OB: fishOnBoard
      } // These values will be preset, no matter if there is a base message.
      if (Object.keys(baseMessage).length) {
        fields = {
          ...fields,
          LS: baseMessage.LS,
          PO: baseMessage.PO
        } // Preset from base (previous message, with the same type)
      }
      else {
        fields = {
          ...fields,
          PO: (firstPort || {}).value
        }
      }
      break
    default:
      break
    }

    handleFieldChange(fields)
  }

  toDashboard = () => {
    this.props.history.push(routes.HOMEPAGE)
  }

  render() {
    const {store: {fields}, match: {params: {type}}, t, match: {path}} = this.props

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
                size="large"
                to={routes.HOMEPAGE}
              >
                {t("links.back")}
              </Button>
            </Grid>
            <Grid item>
              <SubmitButton toDashboard={this.toDashboard} type={type}/>
            </Grid>
          </Grid>
        </Grid>
      </Page>
    )}
}

export default withRouter(withTranslation("forms")(withStore(Form)))


export const SubmitButton = memo(({type, toDashboard}) => {
  const [t] = useTranslation("forms")
  const {
    handleDialog, constructMessage, validateMessage, submitMessage, toggleDCAStart
  } = useStore()
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
    } else {
      //TODO: notify user about errors
    }
  }


  return (
    <Button
      // disabled={disabled} // TODO: add disable on invalid form
      color="primary"
      onClick={handleSubmit}
      // onPointerDown={handlePointerDown}
      // onPointerUp={handlePointerUp}
      size="large"
      type="submit"
      variant="contained"
    >
      {t(`${type}.submit`)}
    </Button>
  )
})