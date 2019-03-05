import React, {Component} from 'react'
import {Card, List, ListItem, CardContent, CardActions, Typography, withStyles, Button, Divider} from '@material-ui/core'
import EditIcon from "@material-ui/icons/EditOutlined"
import "./status.sass"
import USERS_FS, {AUTH} from "../../lib/firebase"
import {withStore} from '../../db'
import {withTranslation} from 'react-i18next'

// import differenceInMinutes from "date-fns"

const StyledCard = withStyles({
  root: {
    margin: '10px 0',
    // border: '1px solid black',
    padding: '0 30px'
  }
})(Card)

export class Status extends Component{
  constructor(props) {
    super(props)
    this.state = {
      uid: null,
      lastDepartureHarbour: "Henningsvær Cruise Terminal",
      lastReportedCatchPlace: "Vestskallen",
      catchStart: "1th of January - 00:01 (GMT+1)",
      catchDuration: "1 hours, 23 minutes",
      catchList: {CYH: 200, SPR: 100}
    }
  }

  async componentDidMount() {
    await this.fetchUid()
    //this.fetchMessages()
  }

  fetchUid() {
    // Observes user object from Firebase Authentication
    AUTH.onAuthStateChanged((user) => {
      // Pushes uid to state when received
      if (user) {
        this.setState({uid: AUTH.currentUser.uid})
      }
    })
  }

  fetchMessages() {
    /*USERS_FS.doc("{this.state.uid").get().then((doc) => {
      if (doc.exists) {
        console.log("Document data:", doc.data())
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!")
      }
    }).catch((error) => {
      console.log("Error getting document:", error)
    })*/
    console.log("fetchMessage magic here")
  }

  render() {
    const {catchList} = this.state
    const {t} = this.props
    return(
      <div className="cardwrapper">
        <StyledCard>
          <CardContent>
            <Typography className="statuscard-title" color="textPrimary" gutterBottom>
              {t("titles.departure_port")} for uid: {this.state.uid}
            </Typography>
            <Typography className="statuscard-info" color="textPrimary" gutterBottom>
              {this.state.lastDepartureHarbour}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small"><EditIcon/></Button>
          </CardActions>
        </StyledCard>

        <Divider/>

        <StyledCard>
          <CardContent>
            <Typography className="statuscard-title" color="textPrimary" gutterBottom>
              {t("titles.catch_place")}
            </Typography>
            <Typography className="statuscard-info" color="textPrimary" gutterBottom>
              {this.state.lastReportedCatchPlace}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small"><EditIcon/></Button>
          </CardActions>
        </StyledCard>

        <Divider/>

        <StyledCard>
          <CardContent>
            <Typography className="statuscard-title" color="textPrimary" gutterBottom>
              {t("titles.catching_since")}
            </Typography>
            <Typography className="statuscard-info" color="textPrimary" gutterBottom>
              {this.state.catchStart}
            </Typography>
            <Typography className="statuscard-info" color="textPrimary" gutterBottom>
              {this.state.catchDuration} ago
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small"><EditIcon/></Button>
          </CardActions>
        </StyledCard>

        <Divider/>

        <StyledCard>
          <CardContent>
            <Typography>
              {t("titles.catch_list")}
            </Typography>
            <List>
              {Object.entries(catchList).map(([key, value]) =>
                <ListItem key={key}>
                  <StyledCard>
                    <CardContent>
                      <Typography>
                        {key}: {value}kg
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small"><EditIcon/></Button>
                    </CardActions>
                  </StyledCard>
                </ListItem>
              )}
            </List>
          </CardContent>
        </StyledCard>
      </div>
    )
  }
}

export default withTranslation("status")(withStore(Status))