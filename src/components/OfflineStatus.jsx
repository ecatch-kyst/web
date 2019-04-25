import React from 'react'

import {useTranslation} from 'react-i18next'
import {Tooltip, Fab, Zoom} from '@material-ui/core'
import {useStore} from '../hooks'
import { OfflineIcon } from '../icons';

const OfflineStatus = () => {
  const [t] = useTranslation("common")
  const {isOffline} = useStore()
  return (
    <Tooltip title={t("states.offline")}>
      <Zoom
        className="offline-status"
        in={isOffline}
        style={{position: "fixed", bottom: "3rem", right: "1rem"}}
      >
        <Fab color="secondary"><OfflineIcon/></Fab>
      </Zoom>
    </Tooltip>
  )
}


export default OfflineStatus