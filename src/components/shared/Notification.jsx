import React, {useContext} from 'react'
import {useTranslation} from 'react-i18next'
import {Snackbar, SnackbarContent, Button, withTheme} from '@material-ui/core'
import {colors} from '../../lib/material-ui'
import Store from '../../db'

export const Notification = ({theme}) => {

  const {
    notification: {open, name, type, handleAction, duration, message},
    processNotificationQueue: processQueue,
    notificationClose: close
  } = useContext(Store)

  const handleClose = (_, reason) => {
    if (reason === 'clickaway') return
    close()
  }

  const [t] = useTranslation("notifications")

  let actionColor
  let backgroundColor = theme.palette.primary.main
  const color = "#fff"
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
        title={t(`${name}.action`)}
        type={type}
      />
  }


  return (
    <Snackbar
      anchorOrigin={{vertical: "top", horizontal: "right"}}
      autoHideDuration={duration}
      key={name+type}
      onClose={handleClose}
      onExited={processQueue}
      open={open}
    >
      <SnackbarContent
        action={ActionButton}
        message={t(`${name}.${type || "default"}`, {message})}
        style={{backgroundColor, color}}

      />
    </Snackbar>
  )
}

export default withTheme()(Notification)

export const Action =({title, onClick}) =>
  <Button onClick={onClick}>{title}</Button>