import React, {Component} from 'react'
import {withRouter, Redirect} from "react-router-dom"
import {withTranslation} from 'react-i18next'
import {Page} from './shared'
import {Button, List, Grid} from '@material-ui/core'
import {routes} from '../lib/router'

const handleDeparture = () => <Redirect to={routes.DEPARTURE}/>

export class Dashboard extends Component {

  render() {
    const {t} = this.props
    return(
      <Page namespace="dashboard">
        <List>
          <Grid container direction="column" spacing={16} style={{margin: 16}}>
            <Grid container item spacing={16}>
              <Button onClick={this.handleDeparture}>
                {t("buttons.departure")}
              </Button>
            </Grid>
          </Grid>
        </List>
      </Page>
    )
  }
}

export default withRouter(withTranslation("dashboard")(Dashboard))