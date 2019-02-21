import React, {Component} from 'react'
import {Card, List, ListItem, CardContent, CardActions, Typography, withStyles, Button} from '@material-ui/core'
import EditIcon from "@material-ui/icons/EditOutlined"
import "./status.sass"

const StyledCard = withStyles({
  root: {
    margin: '10px 0',
    background: 'lightblue',
    borderRadius: 10,
    border: '1px solid black',
    color: 'white',
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)'
  }
})(Card)

export class Status extends Component{

  render() {
    return(
      <div className="cardwrapper">
        <StyledCard>
          <CardContent>
            <Typography className="statuscard-title" color="textPrimary" gutterBottom>
              Departure harbour
            </Typography>
            <Typography className="statuscard-info" color="textPrimary" gutterBottom>
              Henningsvær
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
              Vestskallen
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
              22th of February - 15:00 (GMT+1)
            </Typography>
            <Typography className="statuscard-info" color="textPrimary" gutterBottom>
              2 hours and 11 minutes ago
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

              <ListItem>
                <StyledCard>
                  <CardContent>
                    <Typography>
                        100kg Taco
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