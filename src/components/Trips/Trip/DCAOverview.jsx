import React from 'react'
import {Link} from "react-router-dom"
import {
  Typography, Tooltip,
  Grid, Button
} from '@material-ui/core'
import EditIcon from "@material-ui/icons/EditOutlined"
import LockIcon from "@material-ui/icons/LockOutlined"


import FishChip from './FishChip'
import {routes} from '../../../lib/router'
import {useTranslation} from 'react-i18next'
import {Status, Countdown} from '../../shared'
import ExpansionPanel from './vendor/ExpansionPanel'
import {deadlinePassed, deadline} from '../../../utils'


export const DCAOverview = ({list}) => {
  const [t] = useTranslation("forms")
  const activityTranslations = t("dropdowns.activity", {returnObjects: true})

  if (list.length === 0) {
    return (
      <Typography>
        No catch messages yet...
      </Typography>
    )
  }

  const activities = list.reduce((acc, m) => {
    const type = m.AC
    Array.isArray(acc[type]) ? acc[type].push(m) : acc[type] = [m]
    return acc
  }, {
    FIS: [],
    SET: [],
    STE: []
  })


  return (
    <Grid container style={{marginBottom: 64}}>
      {Object.values(activities).flat().reverse().map((activity) => {
        const type = activityTranslations.find(a => a.value === activity.AC).label

        const props = {
          key: activity.created,
          status: activity.result,
          details: <div/>
        }
        const summary = {
          created: activity.created,
          status: activity.result,
          title: <Typography>{type}</Typography>,
          messageId: activity.RN,
          TM: activity.TM
        }
        const actions = {
          created: activity.created,
          messageId: activity.RN,
          TM: activity.TM
        }
        switch (activity.AC) {
        case "FIS": {
          const sum = Object.values(activity.CA).reduce((acc, weight) => acc+weight, 0)
          summary.title = <Typography variant="body2">{type} <strong>({sum}kg)</strong></Typography>
          props.details = <FISDetails fish={activity.CA}/>
          break
        }
        case "SET":
          props.details = <div/>
          break
        default:
          break
        }
        return (
          <ExpansionPanel
            actions={<Actions {...actions}/>}
            summary={<Summary {...summary}/>}
            {...props}
          />
        )
      }
      )}
    </Grid>
  )
}

DCAOverview.defaultProps = {
  list: []
}

export default DCAOverview

const Summary = ({title, status, TM, created}) => {
  const disabled = TM === "DCA" && deadlinePassed(created)
  const [t] = useTranslation("trips")

  return (
    <Grid alignItems="center" container justify="space-between">
      <Grid component={Status} item result={status} xs={1}/>
      <Grid item md={7} xs={6}>{title}</Grid>
      <Grid container item justify="flex-end" md={4} xs={3}>
        {disabled ? "" :
          <Tooltip title={t("actions.tooltips.countdown", {deadline: deadline(created)})}>
            <div><Countdown end={deadline(created)}/></div>
          </Tooltip>
        }
      </Grid>
    </Grid>
  )
}

const FISDetails = ({fish}) => {
  const [t] = useTranslation("trips")
  return(
    <Grid>
      <Typography>{t("details.FIS.fish")}</Typography>
      {Object.entries(fish).map(([type, weight]) => <FishChip key={type} type={type} weight={weight}/>)}
    </Grid>
  )
}

const Actions = ({messageId, created, TM}) => {
  const [t] = useTranslation("trips")
  const disabled = TM === "DCA" && deadlinePassed(created)
  return(
    <>
    <Tooltip
      title={
        disabled ?
          t("actions.tooltips.disabled") :
          t("actions.tooltips.countdown", {deadline: deadline(created)})
      }
    >
      {disabled ?
        <LockIcon color="disabled" style={{paddingRight:8}}/> :
        <Button
          color="primary"
          component={Link}
          size="large"
          style={{marginLeft: 16}}
          to={`${routes.MESSAGES}/${messageId}${routes.EDIT}`}
          variant="contained"
        >
          {/* {t("actions.buttons.edit")} */}
          <EditIcon/>
        </Button>
      }
    </Tooltip>
    </>
  )
}