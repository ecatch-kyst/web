import React from 'react'

import {colors} from '../../lib/material-ui'
import {useTranslation} from 'react-i18next'
import {Tooltip, Typography, Grid} from '@material-ui/core'
import {CheckIcon, CloseIcon, HourglassIcon} from '../../icons'

const {yellow, green, red} = colors

/*Switch for acknowledged from database*/
export const Status = ({result}) => {
  const [t] = useTranslation("messages")
  let Icon, color, type

  switch (result.RS) {
  case "ACK":
    Icon = CheckIcon
    color = green
    type = "acknowledged"
    break
  case "NAK":
    Icon = CloseIcon
    color = red
    type = "rejected"
    break
  default:
    Icon = HourglassIcon
    color = yellow
    type = "pending"
    break
  }

  return (
    <Tooltip title={t(`tooltips.${type}`)}>
      <Grid container justify="center">
        <Typography>
          {result.RS || t("titles.pending")}
        </Typography>
        <Icon style={{color}}/>
      </Grid>
    </Tooltip>
  )
}

Status.defaultProps = {
  result: {}
}

export default Status
