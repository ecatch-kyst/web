import React from 'react'
import {
  Typography, Grid, Table, TableHead, TableCell, TableBody, TableRow
} from '@material-ui/core'
import {useTranslation} from 'react-i18next'
import FishChip from './FishChip'


export const DCAOverview = ({list, fish}) => {

  console.log(fish)

export const DCAOverview = ({list}) => {
  const [t] = useTranslation("dropdowns")
  const activityTranslations = t("activity", {returnObjects: true})

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
      <Grid container item md={3} sm={6} style={{padding: 16}}>
        <Typography>Fish caught</Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Species</TableCell>
              <TableCell>Weight</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.entries(fish).map(([type, weight]) =>
              <FishRow key={type} type={type} weight={weight}/>
            )}
            <TableRow>
              <TableCell>
              Total
              </TableCell>
              <TableCell>
                {Object.values(fish).reduce((acc, weight) => acc+weight, 0)}kg
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Grid>
    </Grid>
  )
}

DCAOverview.defaultProps = {
  list: []
}

export default DCAOverview

export const FishRow = ({type, weight}) => {
  const [t] = useTranslation("dropdowns")
  const name = t("species", {returnObjects: true}).find(f => f.value === type).label
  return (
    <TableRow>
      <TableCell>
        {name}
      </TableCell>
      <TableCell>
        {weight}kg
      </TableCell>
    </TableRow>
  )
}