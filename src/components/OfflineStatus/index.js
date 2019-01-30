import React from 'react'
import {withStore} from '../../db'

import OfflineIcon from "@material-ui/icons/OfflineBoltTwoTone"
import {withNamespaces} from 'react-i18next'
import {Grid, Typography} from '@material-ui/core'
import "./offline-status.sass"

const OfflineStatus = ({store: {isOffline}, t}) =>
  <Grid
    alignItems="center"
    className={`offline-status ${isOffline ? "is-offline" : ""}`}
    container
    justify="flex-end"
  >
    <Typography>{t("states.offline")}</Typography>
    <OfflineIcon color="secondary"/>
  </Grid>


export default withNamespaces("common")(withStore(OfflineStatus))