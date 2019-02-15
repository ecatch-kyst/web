import React from 'react'
import {withStore} from "../../db"
import {useTranslation} from 'react-i18next'
import {Snackbar, SnackbarContent, Button, withTheme} from '@material-ui/core'
import {colors} from '../../lib/material-ui'


export const Notification = ({store: {handleNotificationReset, notification: {open, name, type, handleAction, duration}}}) => {
  const [t] = useTranslation("common")

  let ActionButton = null
  if (handleAction) {
    ActionButton =
      <Action
        onClick={handleAction}
        title={t(`notifications.${name}.action`)}
        type={type}
      />
  } else {
    open && setTimeout(handleNotificationReset, duration) // NOTE: When a notification overlaps another, the timeout should be reset, so the new notification has enough screentime as well.
  }
  return (
    <Snackbar {...{open}}>
      <SnackbarContent
        action={ActionButton}
        message={t(`notifications.${name}.${type || "default"}`)}
      />
    </Snackbar>
  )
}

export default withStore(Notification)

const Action = withTheme()(({theme, type, title, onClick}) => {
  let color = theme.palette.primary.main
  switch (type) {
  case "success":
    color = colors.green
    break
  case "error":
    color = colors.red
    break
  case "info":
    color = colors.blue
    break
  default:
    break
  }
  return (
    <Button
      onClick={onClick}
      style={{color}}

    >
      {title}
    </Button>
  )
})