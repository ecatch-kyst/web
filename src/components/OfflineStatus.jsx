import React from 'react'
import {withStore} from '../db'

import OfflineIcon from "@material-ui/icons/OfflineBoltTwoTone"
import {withTranslation} from 'react-i18next'
import {Tooltip, Fab, Zoom} from '@material-ui/core'

const OfflineStatus = ({store: {isOffline}, t}) =>
  <Tooltip title={t("states.offline")}>
    <Zoom
      className="offline-status"
      in={isOffline}
      style={{position: "fixed", bottom: "3rem", right: "1rem"}}
    >
      <Fab color="secondary"><OfflineIcon/></Fab>
    </Zoom>
  </Tooltip>


export default withTranslation("common")(withStore(OfflineStatus))