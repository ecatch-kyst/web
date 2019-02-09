import React from 'react'
import {Redirect} from "react-router-dom"
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import {routes} from '../../lib/router'
import {AUTH} from '../../lib/firebase'
import {withTranslation} from 'react-i18next'
import {withStore} from '../../db'


const ActionModal = ({t, store: {handleUserDelete, handleOpenModal, openModal}}) =>
  <div>
    {!AUTH.currentUser && <Redirect to={routes.ROOT}/>}
    <Button color="primary" onClick={handleOpenModal} variant="outlined">
      {t("buttons.deleteUser")}
    </Button>
    <Dialog
      aria-describedby="alert-dialog-description"
      aria-labelledby="alert-dialog-title"
      onClose={handleOpenModal}
      open={openModal}
    >
      <DialogTitle id="alert-dialog-title">{t("titles.deleteUser")}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {t("descriptions.slett-meg")}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={handleOpenModal}>
          {t("descriptions.negative")}
        </Button>
        <Button autoFocus color="primary" onClick={handleUserDelete}>
          {t("descriptions.positive")}
        </Button>
      </DialogActions>
    </Dialog>
  </div>

export default withTranslation("profile")(withStore(ActionModal))