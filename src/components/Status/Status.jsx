import React, {Component} from 'react'
import {Card, List, ListItem, CardContent, CardActions, Typography, withStyles, Button} from '@material-ui/core'
import EditIcon from "@material-ui/icons/EditOutlined"
import "./status.sass"
import USERS_FS, {AUTH} from "../../lib/firebase"
// import differenceInMinutes from "date-fns"

const StyledCard = withStyles({
  root: {
    margin: '10px 0',
    background: 'white',
    border: '1px solid black',
    color: 'white',
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)'
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
      catchList: {cod:200, pizza:100}
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

  generateCatchList = () => {
    const jsxString = []

    jsxString.push(<List>)

    (this.store.catchList)
      console.log("Catch element added to list")

    jsxString.push(
    <ListItem>
      <StyledCard>
        <CardContent>
          <Typography>
            300kg Pizza
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small"><EditIcon/></Button>
        </CardActions>
      </StyledCard>
    </ListItem>
    )


    jsxString.push(</List>)
    console.log("Current JSX: ", jsxString)
    return jsxString
  }

  render() {
    return(
      <div className="cardwrapper">
        <StyledCard>
          <CardContent>
            <Typography className="statuscard-title" color="textPrimary" gutterBottom>
              Departure harbour
            </Typography>
            <Typography className="statuscard-info" color="textPrimary" gutterBottom>
              {this.state.lastDepartureHarbour}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small"><EditIcon/></Button>
          </CardActions>
        </StyledCard>

        <StyledCard>
          <CardContent>
            <Typography className="statuscard-title" color="textPrimary" gutterBottom>
              Fishing place
            </Typography>
            <Typography className="statuscard-info" color="textPrimary" gutterBottom>
              {this.state.lastReportedCatchPlace}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small"><EditIcon/></Button>
          </CardActions>
        </StyledCard>

        <StyledCard>
          <CardContent>
            <Typography className="statuscard-title" color="textPrimary" gutterBottom>
              Catching since
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

        <StyledCard>
          <CardContent>
            <Typography>
              Catch list
            </Typography>

            {this.generateCatchList()}

            <List>
              <ListItem>
                <StyledCard>
                  <CardContent>
                    <Typography>
                        500kg Shit
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small"><EditIcon/></Button>
                  </CardActions>
                </StyledCard>
              </ListItem>
            </List>
          </CardContent>
        </StyledCard>
      </div>
    )
  }
}

export default Status