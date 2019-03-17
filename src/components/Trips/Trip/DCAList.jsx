import React from 'react'
import {withRouter} from "react-router-dom"
import {addHours, isBefore} from 'date-fns'
import {
  TableRow, TableCell, Typography, Tooltip,
  Table, TableBody, Grid, Hidden, TableHead
} from '@material-ui/core'
import EditIcon from "@material-ui/icons/EditOutlined"
import LockIcon from "@material-ui/icons/LockOutlined"


import FishChip from './FishChip'
import {routes} from '../../../lib/router'
import {withTranslation} from 'react-i18next'
import {Status, Countdown} from '../../shared'


export const DCAList = withTranslation("trips")(({t, history, list}) => {

  if (list.length === 0) {
    return (
      <Typography>
        No catch messages yet...
      </Typography>
    )
  }

  const fishingMessages = list.filter(m => m.AC === "FIS")

  return (
    <Table style={{marginTop: 16}}>
      <TableHead>
        <TableRow>
          <TableCell>{t("DCAList.fishingMessages.tableHeads.status")}</TableCell>
          <TableCell>{t("DCAList.fishingMessages.tableHeads.fish")}</TableCell>
          <TableCell align="right">{t("DCAList.fishingMessages.tableHeads.edit")}</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {fishingMessages.map(({id, created, result, CA={}, RN}) => {
          const deadline = addHours(created.toDate(), 12)
          const disabled = isBefore(deadline, Date.now())

          return (
            <TableRow hover={!disabled}
              key={id}
              onClick={() => !disabled ? history.push(`${routes.MESSAGES}/DCA/${RN}${routes.EDIT}`): null}
            >
              <TableCell><Status result={result}/></TableCell>
              <TableCell>
                <Hidden mdUp>
                  {Object.values(CA).reduce((acc, weight) => acc + weight, 0)}kg
                </Hidden>
                <Hidden smDown>
                  {Object.entries(CA).map(([type, weight]) => <FishChip key={type} type={type} weight={weight}/>)}
                </Hidden>
              </TableCell>
              <TableCell align="right">
                {!disabled ?
                  <Tooltip
                    title={t("DCAList.fishingMessages.tooltips.deadline", {until: deadline})}
                  >
                    <Grid align="center" container justify="flex-end">
                      <Countdown end={deadline}/>
                      <Hidden mdDown>
                        <EditIcon style={{marginLeft: 8}}/>
                      </Hidden>
                    </Grid>
                  </Tooltip>
                  :
                  <Tooltip title="The message cannot be edited anymore.">
                    <LockIcon color="disabled"/>
                  </Tooltip>
                }
              </TableCell>
            </TableRow>
          )
        }
        )}
        <TableRow>
          <TableCell><Typography>Sum</Typography></TableCell><TableCell>
            <Typography>
              Sum of fish caught..
            </Typography>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
})

DCAList.defaultProps = {
  list: []
}

export default withRouter(DCAList)