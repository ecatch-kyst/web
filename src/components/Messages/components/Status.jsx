import React from 'react'
import CheckIcon from "@material-ui/icons/CheckOutlined"
import CloseIcon from "@material-ui/icons/CloseOutlined"
import HourglassIcon from "@material-ui/icons/HourglassEmptyOutlined"
import {colors} from '../../../lib/material-ui'
import {withTranslation} from 'react-i18next'
import {Tooltip} from '@material-ui/core'

const {yellow, green, red} = colors

/*Switch for acknowledged from database*/
export default withTranslation("messages")(({t, result={}}) => {
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
      <Icon style={{color}}/>
    </Tooltip>
  )
})
