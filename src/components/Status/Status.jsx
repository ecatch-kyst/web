import React, {Component} from 'react'
import {Card, List, ListItem, CardContent, Typography, withStyles,Divider} from '@material-ui/core'
import "./status.sass"
import {USERS_FS, AUTH} from "../../lib/firebase"
import {withStore} from '../../db'
import {withTranslation} from 'react-i18next'


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
      catchZone: "...",
      catchList: {},
      lastMessageType: null
    }
  }

  async componentDidMount() {
    await this.checkLastMessageType()
    await this.fetchLatestDEP()
    await this.updateCatchList()
  }

  checkLastMessageType() {
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
              this.setState({
                lastMessageType: doc.data().TM
              })
              console.log("Last messagetype was", this.state.lastMessageType)
            })
          })
          .catch((error) => {
            console.log("Error getting documents: ", error)
          })
      }
    })
  }

  fetchLatestDEP() {
    AUTH.onAuthStateChanged((user) => {
      if (user) {
        this.setState({uid: AUTH.currentUser.uid})
        // Observes user object from Firebase Authentication
        USERS_FS.doc(this.state.uid).collection("messages")
          .where("TM", "==", "DEP")
          .orderBy('departure', 'desc')
          .limit(1)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
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

  updateCatchList() {
    // Observes user object from Firebase Authentication
    AUTH.onAuthStateChanged((user) => {
      // Pushes uid to state when received
      if (user) {
        this.setState({uid: AUTH.currentUser.uid})
        // Fetches all docs for
        USERS_FS.doc(this.state.uid).collection("messages")
          // TODO: make sure only DCAs after last DEP are fetched
          .where("TM", "==", "DCA")
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              this.setState({lastReportedCatchZone: doc.data().ZO})

              // Makes copy of current catchlist
              const currentCatchlist = Object.assign({}, this.state.catchList)

              Object.keys(doc.data().CA).forEach((key) => {
                console.log(key, doc.data().CA[key])
                // Adds new specie to catchlist
                if (currentCatchlist[key] === undefined) {
                  currentCatchlist[key] = doc.data().CA[key]
                }
                // Adds more of previously catched specie
                else {
                  currentCatchlist[key] += doc.data().CA[key]
                }
              })

              this.setState({catchList: currentCatchlist})
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
          </StyledCard>

          <Divider/>

          <StyledCard>
            <CardContent>
              <Typography className="statuscard-title" color="textPrimary" gutterBottom>
                {t("titles.catch_zone")}
              </Typography>
              <Typography className="statuscard-info" color="textPrimary" gutterBottom>
                {this.state.lastReportedCatchZone}
              </Typography>
            </CardContent>
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
          </StyledCard>
          }

          <Divider/>

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
                            {key}: {value} kg
                          </Typography>
                        </CardContent>
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