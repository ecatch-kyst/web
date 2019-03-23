/* eslint-disable require-jsdoc */
/* eslint-disable react/prop-types, react/jsx-handler-names */
import React from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Divider from '@material-ui/core/Divider'

const styles = {
  root: {
    width: '100%'
  },
  details: {
    alignItems: 'center'
  }
}

function DetailedExpansionPanel(props) {
  const {classes} = props
  return (
    <div className={classes.root}>
      <ExpansionPanel square>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>{props.summary}</ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.details}>{props.details}</ExpansionPanelDetails>
        <Divider />
        {props.actions ? <ExpansionPanelActions>{props.actions}</ExpansionPanelActions> : null}
      </ExpansionPanel>
    </div>
  )
}


DetailedExpansionPanel.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(DetailedExpansionPanel)