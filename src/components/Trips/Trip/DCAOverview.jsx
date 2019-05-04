import React, {memo} from 'react'
import {
  Typography, Grid, Table, TableHead, TableCell, TableBody, TableRow
} from '@material-ui/core'
import {useTranslation} from 'react-i18next'

export const DCAOverview = memo(({list, fish}) => {
  const [t] = useTranslation("trips")

  if (list.length === 0) {
    return (
      <Typography style={{padding: 16}}>
        {t("overview.no-catch")}
      </Typography>
    )
  }


  return (
    <Grid container item md={3} sm={6}>
      <Typography style={{paddingLeft: 20}}>{t("overview.fish-caught")}</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>{t("overview.species")}</TableCell>
            <TableCell>{t("overview.weight")}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.entries(fish).map(([type, weight]) =>
            <FishRow key={type} type={type} weight={weight}/>
          )}
          <TableRow>
            <TableCell>
              {t("overview.total")}
            </TableCell>
            <TableCell>
              {Object.values(fish).reduce((acc, weight) => acc+weight, 0)}kg
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Grid>
  )
})

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

