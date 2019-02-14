import React, {Component} from 'react'
import {Grid, Button, TextField} from '@material-ui/core'
import {withTranslation} from 'react-i18next'
import Store from '../db/Store'

import {format} from "date-fns"

import {TIMESTAMP, MESSAGES_FS, AUTH} from "../lib/firebase"

export class Departure extends Component {

  static contextType = Store;

  state = {
    // Message type
    TM: "DEP",
    // Message number
    RN: null,
    // Receiver country
    AD: "NOR",
    // Radio callsign
    RC: null,
    // Ship name
    NA: null,
    // Ship ID
    XR: null,
    // Captain name
    MA: null,
    // Date sent, format YYYYMMDD (UTC)
    DA: null, // NOTE: Set timestamp at submitting
    // Time sent, format HHMM (UTC)
    TI: null, // NOTE: Set timestamp at submitting
    // Port of departure
    PO: "",
    // Date of departure
    ZD: format(Date.now(), "YYYY-MM-DD"),
    // Time of departure
    ZT: format(Date.now(), "HH:mm"),
    // Start date fishing
    PD: format(Date.now(), "YYYY-MM-DD"),
    // Start time fishing
    PT: format(Date.now(), "HH:mm"),
    // Catch latitude
    LA: "12.345678",
    // Catch longitude
    LO: "00.123456",
    // Main activity
    AC: null,
    // Target
    DS: null,
    // Onboard catch in tonnes
    OB: null
  }

  handleChange = ({target: {name, value}}) => this.setState({[name]: value})

  handleSubmit = async e => {
    e.preventDefault()
    try {
      const {ZD, ZT, PD, PT, ...data} = this.state

      await MESSAGES_FS.add({
        ...data,
        ZD: ZD.replace(/-/g, ""),
        ZT: ZT.replace(":", ""),
        PD: PD.replace(/-/g, ""),
        PT: PT.replace(":", ""),
        DA: TIMESTAMP,
        userId: AUTH.currentUser.uid
      })

      console.log("Data sent in")
    }
    catch (error) {
      console.log(error)
    }
  }

  render() {
    const {PO, ZD, ZT, PD, PT} = this.state
    const {t} = this.props

    return (
      <form onSubmit={this.handleSubmit}>
        <Grid container direction="column" spacing={16} style={{margin: 16}}>
          <Grid container item spacing={16}>
            <Input
              label={t("departure.labels.departurePort")}
              name="PO"
              onChange={this.handleChange}
              placeholder={t("departure.placeholders.departurePort")}
              value={PO}
            />

            <Grid container item>
              <Input
                label={t("departure.labels.departureDate")}
                name="ZD"
                onChange={this.handleChange}
                type="date"
                value={ZD}
              />
            </Grid>

            <Grid container item>
              <Input
                label={t("departure.labels.departureTime")}
                name="ZT"
                onChange={this.handleChange}
                type="time"
                value={ZT}
              />
            </Grid>

            <Grid container item>
              <Input
                label={t("departure.labels.plannedCatchStartDate")}
                name="PD"
                onChange={this.handleChange}
                type="date"
                value={PD}
              />
            </Grid>

            <Grid container item>
              <Input
                label={t("departure.labels.plannedCatchStartTime")}
                name="PT"
                onChange={this.handleChange}
                type="time"
                value={PT}
              />
            </Grid>

            <Grid container item>
              <Button
                autoFocus color="primary"
                onClick={this.handleSubmit}
                type="submit"
              >
                {t("departure.buttons.depart")}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    )
  }
}

export default withTranslation("pages")(Departure)

export const Input = ({type, ...props}) =>
  <Grid item>
    <TextField
      {...props}
      type={type || props.name}
      variant="outlined"
    />
  </Grid>
