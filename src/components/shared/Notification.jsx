import React from 'react'
import {useTranslation} from 'react-i18next'
import {Snackbar, SnackbarContent, Button, withTheme} from '@material-ui/core'
import {colors} from '../../lib/material-ui'
import {useStore} from '../../hooks'

export const Notification = ({theme}) => {

  const {
    notification: {open, name, type, handleAction, duration, message},
    processNotificationQueue: processQueue,
    notificationClose: close
  } = useStore()

  const handleClose = (_, reason) => {
    if (reason === 'clickaway') return
    close()
  }

  const [t] = useTranslation("common")

  let actionColor
  let backgroundColor = theme.palette.primary.main
  switch (type) {
  case "success":
    backgroundColor = colors.green
    break
  case "error":
    backgroundColor = colors.red
    break
  case "warning":
    backgroundColor = colors.yellow
    break
  case "info":
    backgroundColor = colors.blue
    break
  default:
    actionColor = "#fff"
    break
  }

  let ActionButton = null
  if (handleAction) {
    ActionButton =
      <Action
        color={actionColor}
        onClick={handleAction}
        title={t(`notifications.${name}.action`)}
        type={type}
      />
  }


  return (
    <Snackbar
      anchorOrigin={{vertical: "bottom", horizontal: "right"}}
      autoHideDuration={duration}
      key={name+type}
      onClose={handleClose}
      onExited={processQueue}
      open={open}
    >
      <SnackbarContent
        action={ActionButton}
        message={t(`notifications.${name}.${type || "default"}`, {message})}
        style={{backgroundColor}}
      />
    </Snackbar>
  )
}

export default withTheme()(Notification)

export const Action =({title, onClick}) =>
  <Button onClick={onClick}>{title}</Button>