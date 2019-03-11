import React from 'react'

import {
  TableHead, TableRow, TableCell, TableSortLabel,
  Tooltip
} from '@material-ui/core'
import {useTranslation} from 'react-i18next'

export default ({order, orderBy, onRequestSort}) => {

  const [t] = useTranslation("messages")
  const createSortHandler = property => {
    onRequestSort(property)
  }

  const rows = t("table-head-rows", {returnObjects: true})

  return (
    <TableHead>
      <TableRow>
        {rows.map(({left, id, sortable, label}) => {
          sortable = sortable === undefined
          return (
            <TableCell
              align={left ? "left": "right"}
              key={id}
              sortDirection={orderBy === id ? order : false}
            >
              <Tooltip
                enterDelay={300}
                placement="bottom-end"
                title={sortable ? t("tooltips.sort"): ""}
              >
                <TableSortLabel
                  active={orderBy === id}
                  direction={order}
                  hideSortIcon={sortable}
                  onClick={() => sortable ? createSortHandler(id): null}
                >
                  {label}
                </TableSortLabel>
              </Tooltip>
            </TableCell>

          )
        })}
      </TableRow>
    </TableHead>
  )
}