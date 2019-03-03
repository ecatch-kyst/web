import React from 'react'
import {useTranslation} from 'react-i18next'
import {Snackbar, SnackbarContent, Button, withTheme} from '@material-ui/core'
import {colors} from '../../lib/material-ui'

export const handleAccept = () => {
  console.log("Accepted")
}
export const handleReject = () => {
  console.log("Rejected")
}

export const UIprompt = ({theme}) => {
  const ActionColor = colors.red
  const [t] = useTranslation("common")

  const ActionButton = (
    <>
    <Action
      color={ActionColor}
      onClick={handleAccept}
      title={t("serviceworker.accept")}
    />
    <Action
      color={ActionColor}
      onClick={handleReject}
      title={t("serviceworker.reject")}
    />
    </>
  )

  return (
    <Snackbar
      anchorOrigin={{vertical: "top", horizontal: "center"}}
      autoHideDuration={5000}
      onClose={handleReject}
      open={true}
      style={{color: colors.red}}
    >
      <SnackbarContent
        action={ActionButton}
        message={t("serviceworker.update-available")}
        style={{color: colors.black}}
      />
    </Snackbar>
  )
}

export default withTheme()(UIprompt)

export const Action =({title, onClick}) =>
  <Button onClick={onClick}>{title}</Button>