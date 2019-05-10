import React, {memo} from 'react'
import {withRouter} from "react-router-dom"
import {Switch, FormControlLabel, Grid, Tooltip} from '@material-ui/core'
import {routes} from '../../lib/router'
import {useTranslation} from 'react-i18next'
import { MergeIcon, SplitIcon } from '../../icons';

export const SwitchView = memo(({history, location: {pathname}}) => {
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
    <Tooltip title={t(`titles.switch.${pathname.replace("/", "")}`)}>
      <FormControlLabel
        control={
          <Switch
            checked={pathname === routes.MESSAGES}
            color="primary"
            onClick={handleSwitchView}
          />
        }
        label={
            <Grid container>
              {pathname === routes.TRIPS ? <SplitIcon/> : null}
              {pathname === routes.MESSAGES ? <MergeIcon/> : null}
            </Grid>
        }
        labelPlacement="start"
      />
    </Tooltip>
  )
}, (prevProps, nextProps) => prevProps.location.pathname === nextProps.location.pathname
)


export default withRouter(SwitchView)