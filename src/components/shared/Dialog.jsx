import React from 'react'
import {Dialog as MuiDialog, Button, DialogTitle, DialogContent, DialogContentText, DialogActions} from "@material-ui/core"
import {withStore} from "../../db"
import {DestructButton} from "."
import {useTranslation} from 'react-i18next'


export const Dialog = ({store: {dialog: {open, handleSubmit, handleCancel, isDestructive, type}}}) => {
  const SubmitButton = isDestructive ? DestructButton : Button
  const [t] = useTranslation("common")

  return (
    <MuiDialog {...{open}} onClose={() => handleCancel && handleCancel()}>
      <DialogTitle>{t(`dialogs.${type}.titles.main`)}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {t(`dialogs.${type}.description`)}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={handleCancel} size="large">
          {t(`dialogs.${type}.titles.cancel`)}
        </Button>
        <SubmitButton color="secondary" onClick={handleSubmit} size="large" variant="contained">
          {t(`dialogs.${type}.titles.submit`)}
        </SubmitButton>
      </DialogActions>
    </MuiDialog>
  )
}

export default withStore(Dialog)