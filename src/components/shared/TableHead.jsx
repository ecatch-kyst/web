import React from 'react'

import {
  TableHead as MuiTableHead, TableRow, TableCell, TableSortLabel,
  Tooltip
} from '@material-ui/core'
import {useTranslation} from 'react-i18next'

const TableHead = ({namespace, order, orderBy, onRequestSort}) => {

  const [t] = useTranslation(namespace)
  const createSortHandler = property => {
    onRequestSort(property)
  }

  const rows = t("table-head-rows", {returnObjects: true})

  return (
    <MuiTableHead>
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
    </MuiTableHead>
  )
}

TableHead.defaultProps = {
  namespace: "common"
}

export default TableHead