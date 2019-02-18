import React from 'react'
import {useTranslation} from 'react-i18next'
import {Snackbar, SnackbarContent, Button, withTheme} from '@material-ui/core'
import {colors} from '../../lib/material-ui'
import {useNotification} from '../../hooks'

export const Notification = () => {

  const {
    open, name, type, handleAction, duration,
    processQueue,
    close
  } = useNotification()

  const handleClose = (_, reason) => {
    if (reason === 'clickaway') return
    close()
  }

  const [t] = useTranslation("common")

  let ActionButton = null
  if (handleAction) {
    ActionButton =
      <Action
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
        message={t(`notifications.${name}.${type || "default"}`)}
      />
    </Snackbar>
  )
}

export default Notification

export const Action = withTheme()(({theme, type, title, onClick}) => {
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