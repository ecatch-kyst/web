import React, {Component} from 'react'
import {Card, List, ListItem, CardContent, CardActions, Typography, withStyles, Button, Divider} from '@material-ui/core'
import EditIcon from "@material-ui/icons/EditOutlined"
import "./status.sass"
import {USERS_FS, AUTH} from "../../lib/firebase"
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
      lastDepartureHarbour: "...",
      lastReportedCatchPlace: "...",
      activity: "...",
      targetSpecie: "...",
      catchStart: "1th of January - 00:01 (GMT+1)",
      catchDuration: 55,
      catchList: {CYH: 200, SPR: 100},
      catchZone: "...",
      lastDepMessage: [],
      dcaMessages: [],
      porMessages: [],
      lastMessageType: null
    }
  }

  async componentDidMount() {
    await this.fetchMessages()
    await this.checkLastMessage()
    await this.updateCatchList()
  }

  fetchMessages() {
    // Observes user object from Firebase Authentication
    AUTH.onAuthStateChanged((user) => {
      // Pushes uid to state when received
      if (user) {
        this.setState({uid: AUTH.currentUser.uid})
        // Fetches all docs for
        USERS_FS.doc(this.state.uid).collection("messages")
          .where("TM", "==", "DEP")
          .orderBy('departure', 'desc')
          .limit(1)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              // doc.data() is never undefined for query doc snapshots
              console.log(doc.id, " => ", doc.data())
              this.setState({
                lastDepartureHarbour: doc.data().PO,
                activity: doc.data().AC,
                targetSpecie: doc.data().DS ? doc.data().DS : "Not catching",
                catchZone: doc.data().ZO ? doc.data().ZO : "..."
              })
            })
          })
          .catch((error) => {
            console.log("Error getting documents: ", error)
          })
      }
    })
  }

  checkLastMessage() {
    AUTH.onAuthStateChanged((user) => {
      if (user) {
        this.setState({uid: AUTH.currentUser.uid})
        // Checks what type the last message was
        USERS_FS.doc(this.state.uid).collection("messages")
          .orderBy('timestamp', 'desc')
          .limit(1)
          .get()
          .then(querySnapshot => {
            querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
              console.log(doc.id, " => ", doc.data())
              this.setState({
                lastMessageType: doc.data().TM
              })
              console.log(this.state.lastMessageType)
            })
          })
          .catch((error) => {
            console.log("Error getting documents: ", error)
          })
      }
    })
  }

  updateCatchList() {
    // Observes user object from Firebase Authentication
    AUTH.onAuthStateChanged((user) => {
      // Pushes uid to state when received
      if (user) {
        this.setState({uid: AUTH.currentUser.uid})
        // Fetches all docs for
        USERS_FS.doc(this.state.uid).collection("messages")
          .where("TM", "==", "DCA")
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              // doc.data() is never undefined for query doc snapshots
              console.log(doc.id, " => ", doc.data())
              // TODO: Change this to correct field when messages are ready
              this.setState({lastReportedCatchPlace: doc.data().TM})
            })
          })
          .catch((error) => {
            console.log("Error getting documents: ", error)
          })
      }
    })
  }


  render() {
    const {catchList} = this.state
    const {t} = this.props
    return(
      this.state.lastMessageType === "POR" ? (
        <StyledCard>
          <CardContent>
            <Typography>
              {t("phrases.docked")}
            </Typography>
          </CardContent>
        </StyledCard>
      ) : (
        <div className="cardwrapper">
          <StyledCard>
            <CardContent>
              <Typography className="statuscard-title" color="textPrimary" gutterBottom>
                {t("titles.departure_port")}
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
                {t("titles.activity")}
              </Typography>
              <Typography className="statuscard-info" color="textPrimary" gutterBottom>
                {this.state.activity}
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
                {t("titles.target_specie")}
              </Typography>
              <Typography className="statuscard-info" color="textPrimary" gutterBottom>
                {this.state.targetSpecie}
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

          {(this.state.catchZone !== "...") &&
          <StyledCard>
            <CardContent>
              <Typography className="statuscard-title" color="textPrimary" gutterBottom>
                {t("titles.catch_zone")}
              </Typography>
              <Typography className="statuscard-info" color="textPrimary" gutterBottom>
                {this.state.catchZone}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small"><EditIcon/></Button>
            </CardActions>
          </StyledCard>
          }


          <StyledCard>
            <CardContent>
              <Typography className="statuscard-title" color="textPrimary" gutterBottom>
                {t("titles.catching_since")}
              </Typography>
              <Typography className="statuscard-info" color="textPrimary" gutterBottom>
                {this.state.catchStart}
              </Typography>
              <Typography className="statuscard-info" color="textPrimary" gutterBottom>
                {this.state.catchDuration} {t("phrases.minutes")} {t("phrases.ago")}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small"><EditIcon/></Button>
            </CardActions>
          </StyledCard>

          {this.state.lastMessageType === "DCA" ? (
            <StyledCard>
              <CardContent>
                <Typography>
                  {t("titles.catch_onboard")}
                </Typography>
                <List>
                  {Object.entries(catchList).map(([key, value]) =>
                    <ListItem key={key}>
                      <StyledCard>
                        <CardContent>
                          <Typography>
                            {key} {value}kg
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
          ) :
          // Type is DEP
            (
              <StyledCard>
                <CardContent>
                  <Typography>
                    {t("phrases.no_catchonboard")}
                  </Typography>
                </CardContent>
              </StyledCard>
            )}
        </div>
      )
    )
  }
}

export default withTranslation("status")(withStore(Status))