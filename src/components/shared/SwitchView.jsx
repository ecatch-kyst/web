import React, {memo} from 'react'
import {withRouter} from "react-router-dom"
import {Switch, FormControlLabel, Tooltip} from '@material-ui/core'
import {routes} from '../../lib/router'
import {useTranslation} from 'react-i18next'
import MergeIcon from "@material-ui/icons/CallMergeOutlined"
import SplitIcon from "@material-ui/icons/CallSplitOutlined"

export const SwitchView = ({history, location: {pathname}}) => {
  const [t] = useTranslation("trips")

  const handleSwitchView = () => {
    switch (pathname) {
    case routes.TRIPS:
      return history.push(routes.MESSAGES)
    case routes.MESSAGES:
      return history.push(routes.TRIPS)

    default:
      return
    }
  }

  return(
    <FormControlLabel
      control={
        <Switch
          checked={pathname === routes.MESSAGES}
          color="primary"
          onClick={handleSwitchView}
        />
      }
      label={
        <Tooltip title={t(`titles.switch.${pathname.replace("/", "")}`)}>
          <div>
            {pathname === routes.TRIPS ? <SplitIcon/> : null}
            {pathname === routes.MESSAGES ? <MergeIcon/> : null}
          </div>
        </Tooltip>

      }
      labelPlacement="start"
    />
  )
}


export default withRouter(
  memo(SwitchView, (prevProps, nextProps) => prevProps.location.pathname !== nextProps.location.pathname)
)