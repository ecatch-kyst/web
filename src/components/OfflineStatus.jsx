import React from 'react'

import {useTranslation} from 'react-i18next'
import {Tooltip, Fab, Zoom} from '@material-ui/core'
import {OfflineIcon} from '../icons'
import {useOnline} from '../hooks'


/*
 * Used to give constant visual feedback
 * about network connection to the user
 */
const OfflineStatus = () => {
  const [t] = useTranslation("common")
  const online = useOnline()
  return (
    <Tooltip title={t("states.offline")}>
      <Zoom
        className="offline-status"
        in={!online}
        style={{position: "fixed", bottom: "3rem", right: "1rem"}}
      >
        <Fab color="secondary"><OfflineIcon/></Fab>
      </Zoom>
    </Tooltip>
  )
}


export default OfflineStatus