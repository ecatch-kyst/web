import React, {Component} from 'react'
import {Grid, Button, TextField} from '@material-ui/core'
import {withTranslation} from 'react-i18next'
import Store from '../db/Store'

export class Departure extends Component {

  static contextType = Store;

  state = {
    transmissionDateTime: new Date(),
    departureDateTime: new Date(),
    plannedCatchStart: new Date(),

    // Message type
    TM: "DEP",
    // Message number
    RN: 0,
    // Receiver country
    AD: "NOR",
    // Radio callsign
    RC: "MSTITANIC",
    // Ship name
    NA: "TITANIC",
    // Ship ID
    XR: 12345,
    // Captain name
    MA: "EdwardJohnSmith",
    // Date sent, format YYYYMMDD (UTC)
    //DA: transmissionDateTime,
    // Time sent, format HHMM (UTC)
    //TI: transmissionDateTime,
    // Port of departure
    PO: "Brattøra",
    // Date of departure
    //ZD: departureDateTime,
    // Time of departure
    //ZT: departureDateTime,
    // Start date fishing
    //PD: plannedCatchStart,
    // Start time fishing
    //PT: plannedCatchStart,
    // Catch latitude
    LA: "12.345678",
    // Catch longitude
    LO: "0.123456",
    // Main activity
    AC: "Fishing",
    // Target
    DS: "Salmon",
    // Onboard catch in tonnes
    OB: 0
  }

  render() {
    let {departurePort, departureDate, departureTime, catchStartTime, catchStartDate} = this.state
    const {t} = this.props
    
    return (
        <form onSubmit={console.log("form submitted")}>
          <Grid container direction="column" spacing={16} style={{margin: 16}}>
            <Grid container item spacing={16}>
              <Input
                label={t("departure.labels.departurePort")}
                name="departurePort"
                onChange={this.handleChange}
                placeholder={t("departure.placeholders.departurePort")}
                value={departurePort}
              />

            <Grid container item>
              <Input
                label={t("departure.labels.departureDate")}
                name="departureDate"
                type="date"
                onChange={this.handleChange}
                value={departureDate}
              />
            </Grid>

            <Grid container item>
              <Input
                label={t("departure.labels.departureTime")}
                name="departureTime"
                type="time"
                onChange={this.handleChange}
                value={departureTime}
              />
            </Grid>

            <Grid container item>
              <Input
                label={t("departure.labels.plannedCatchStartDate")}
                name="catchStart"
                type="date"
                onChange={this.handleChange}
                value={catchStartDate}
              />
            </Grid>

            <Grid container item>
              <Input
                label={t("departure.labels.plannedCatchStartTime")}
                name="plannedCatchStart"
                type="time"
                onChange={this.handleChange}
                value={catchStartTime}
              />
            </Grid>

            <Grid container item>
              <Button
                color="secondary"
                onClick={console.log("message sent")}
                size="large"
                variant="contained"
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
