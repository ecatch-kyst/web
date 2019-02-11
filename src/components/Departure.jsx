import React, {Component} from 'react'
import {Grid, Button, TextField} from '@material-ui/core'
import {withTranslation} from 'react-i18next'
import Store from '../db/Store'

export class Departure extends Component {

  static contextType = Store;

  state = {
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
    DA: new Date(),
    // Time sent, format HHMM (UTC)
    TI: new Date(),
    // Port of departure
    PO: "",
    // Date of departure
    ZD: new Date(),
    // Time of departure
    ZT: new Date(),
    // Start date fishing
    PD: new Date(),
    // Start time fishing
    PT: new Date(),
    // Catch latitude
    LA: "12.345678",
    // Catch longitude
    LO: "0.123456",
    // Main activity
    AC: "Fishing",
    // Target
    DS: "Cod",
    // Onboard catch in tonnes
    OB: 0
  }


  //findMessageNumber(){}

  //handleDepartureMessages(){}

  handleChange = ({target: {name, value}}) => this.setState({[name]: value})

  handleTransmissionDate = ({target: {name, value}}) => this.setState({
    DA: value,
    TI: value
  })

  handleDepartureDate = ({target: {name, value}}) => this.setState({
    ZD: value,
    ZT: value
  })

  handleCatchStartDate = ({target: {name, value}}) => this.setState({
    PD: value,
    PT: value
  })

  validateData = function(data){
    // TODO: validateData
    return true
  }

  handleSubmit = async() => {
    const data = this.state
    try {
      await Store.collection("departureMessages").add(data)
    }
    catch (error) {
      console.log(error)
    }
  }

  render() {
    const {PO, ZD, ZT, PD, PT} = this.state
    const {t} = this.props

    return (
      <form onSubmit={console.log("form submitted")}>
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
                name="departureDate"
                onChange={this.handleDepartureDate}
                type="date"
                value={ZD}
              />
            </Grid>

            <Grid container item>
              <Input
                label={t("departure.labels.departureTime")}
                name="departureTime"
                onChange={this.handleDepartureDate}
                type="time"
                value={ZT}
              />
            </Grid>

            <Grid container item>
              <Input
                label={t("departure.labels.plannedCatchStartDate")}
                name="catchStart"
                onChange={this.handleCatchStartDate}
                type="date"
                value={this.state.PD}
              />
            </Grid>

            <Grid container item>
              <Input
                label={t("departure.labels.plannedCatchStartTime")}
                name="plannedCatchStart"
                onChange={this.handleCatchStartDate}
                type="time"
                value={this.state.PT}
              />
            </Grid>

            <Grid container item>
              <Button
                autoFocus color="primary"
                onClick={console.log("departed")}
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
