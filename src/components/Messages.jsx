import React from 'react'
import {withPage} from './shared/Page'
import {List, Typography, ListItem, Grid, Divider, Button} from '@material-ui/core'
import EditIcon from "@material-ui/icons/EditOutlined"
import {Loading} from './shared'
import {withStore} from '../db'
import {withTranslation} from 'react-i18next'
import {Link} from "react-router-dom"
import {routes} from "../lib/router"

import CheckIcon from "@material-ui/icons/CheckOutlined"
import CloseIcon from "@material-ui/icons/CloseOutlined"
import HourglassIcon from "@material-ui/icons/HourglassEmptyOutlined"
import {format, isAfter, addHours} from 'date-fns'
import {colors} from '../lib/material-ui'

import PropTypes from 'prop-types'
import classNames from 'classnames'
import {withStyles} from '@material-ui/core/styles'
import TableCell from '@material-ui/core/TableCell'
import TableSortLabel from '@material-ui/core/TableSortLabel'
import Paper from '@material-ui/core/Paper'
import {AutoSizer, Column, SortDirection, Table} from 'react-virtualized'

/* Old code, dont know how to translate this into table yet*/
/*export const Messages =({store: {messages}}) =>
  <List>
    {messages.length ?
      messages.map(message => <Message key={message.RN} {...message}/>):
      <Loading/>
    }
  </List>*/

/*assuming i need some translations later, will let 'withTranslations' stand until i know*/
/*RN = message number, TM = message type, use acknowledge to provide state, DA = date sent, TI = time sent*/
{/*export const Message = withTranslation("messages")(({t, RN, TM, acknowledged, created}) =>
  <>
  {/* Information to display: id, type(DEP, DCA, POR..), status(sent, not sent) and if youre able to edit it still(12 hour limit)*/}
{/*TODO: display this like a table instead of a listItem*/}
{/*<ListItem key={RN}>
    <Grid container spacing={16}>
      <Grid container item>
        <Typography variant="h5">{RN}</Typography>
      </Grid>
      <Grid container item justify="space-between">
        <Typography>{t("titles.message-type")}: {TM}</Typography>
        {/*Make a status component instead */}
/*<Typography>Status: {Status}</Typography>
        <Status acknowledged={acknowledged}/>
        <Typography>{t("titles.time-sent")}: {format(created.toDate(), "yyyy. MMM dd HH:mm")}</Typography>{/*have a check if 12 hours have passed, choose icon based on this.*
        /*<Button
          color="primary"
          component={Link}
          disabled = {editable(created)}
          size="large"
          to={`${routes.MESSAGES}/${RN}${routes.EDIT}`}
          variant="contained"
        >{/*Goal: Link to messages/messageId/edit*/
/*<EditIcon/>
        </Button>
      </Grid>
    </Grid>
  </ListItem>
  <Divider/>
  </>
)
  export default withStore(withPage(Messages, {namespace: "messages"}))*/

/*Code from the example: */

/* Have to be moved into the acctual style document */
const styles = theme => ({
  table: {
    fontFamily: theme.typography.fontFamily
  },
  flexContainer: {
    display: 'flex',
    alignItems: 'center',
    boxSizing: 'border-box'
  },
  tableRow: {
    cursor: 'pointer'
  },
  tableRowHover: {
    '&:hover': {
      backgroundColor: theme.palette.grey[200]
    }
  },
  tableCell: {
    flex: 1
  },
  noClick: {
    cursor: 'initial'
  }
})

/*Code from example*/
class MuiVirtualizedTable extends React.PureComponent {
  getRowClassName = ({index}) => {
    const {classes, rowClassName, onRowClick} = this.props

    return classNames(classes.tableRow, classes.flexContainer, rowClassName, {
      [classes.tableRowHover]: index !== -1 && onRowClick != null
    })
  };

  cellRenderer = ({cellData, columnIndex = null}) => {
    const {columns, classes, rowHeight, onRowClick} = this.props
    return (
      <TableCell
        align={(columnIndex != null && columns[columnIndex].numeric) || false ? 'right' : 'left'}
        className={classNames(classes.tableCell, classes.flexContainer, {
          [classes.noClick]: onRowClick == null
        })}
        component="div"
        style={{height: rowHeight}}
        variant="body"
      >
        {cellData}
      </TableCell>
    )
  };

  headerRenderer = ({label, columnIndex, dataKey, sortBy, sortDirection}) => {
    const {headerHeight, columns, classes, sort} = this.props
    const direction = {
      [SortDirection.ASC]: 'asc',
      [SortDirection.DESC]: 'desc'
    }

    const inner =
      !columns[columnIndex].disableSort && sort != null ? (
        <TableSortLabel active={dataKey === sortBy} direction={direction[sortDirection]}>
          {label}
        </TableSortLabel>
      ) : (
        label
      )

    return (
      <TableCell
        align={columns[columnIndex].numeric || false ? 'right' : 'left'}
        className={classNames(classes.tableCell, classes.flexContainer, classes.noClick)}
        component="div"
        style={{height: headerHeight}}
        variant="head"
      >
        {inner}
      </TableCell>
    )
  };

  render() {
    const {classes, columns, ...tableProps} = this.props
    return (
      <AutoSizer>
        {({height, width}) => (
          <Table
            className={classes.table}
            height={height}
            width={width}
            {...tableProps}
            rowClassName={this.getRowClassName}
          >
            {columns.map(({cellContentRenderer = null, className, dataKey, ...other}, index) => {
              let renderer
              if (cellContentRenderer != null) {
                renderer = cellRendererProps =>
                  this.cellRenderer({
                    cellData: cellContentRenderer(cellRendererProps),
                    columnIndex: index
                  })
              } else {
                renderer = this.cellRenderer
              }

              return (
                <Column
                  cellRenderer={renderer}
                  className={classNames(classes.flexContainer, className)}
                  dataKey={dataKey}
                  headerRenderer={headerProps =>
                    this.headerRenderer({
                      ...headerProps,
                      columnIndex: index
                    })
                  }
                  key={dataKey}
                  {...other}
                />
              )
            })}
          </Table>
        )}
      </AutoSizer>
    )
  }
}


MuiVirtualizedTable.defaultProps = {
  headerHeight: 70,
  rowHeight: 70
}

const WrappedVirtualizedTable = withStyles(styles)(MuiVirtualizedTable)

/*Get the acctual data and not mock data. */
const data = [
  ['Frozen yoghurt', 159, 6.0, 24, 4.0],
  ['Ice cream sandwich', 237, 9.0, 37, 4.3],
  ['Eclair', 262, 16.0, 24, 6.0],
  ['Cupcake', 305, 3.7, 67, 4.3],
  ['Gingerbread', 356, 16.0, 49, 3.9]
]

function createData(RN, TM, acknowledged, created) {
  return {RN, TM, acknowledged, created}
}

/* The data here must be  RN, TM, acknowledged, created, or at least t("titles.message-type"), Status, {t("titles.time-sent")} and a space for the edit button?*/
const rows = []

for (let i = 0; i < 200; i += 1) {
  const randomSelection = data[Math.floor(Math.random() * data.length)]
  rows.push(createData(...randomSelection))
}

/**
 *
 */
function ReactVirtualizedTable({RN, TM, acknowledged, created, edit}) {
  return (
    <Paper style={{height: 400, width: '100%'}}>
      <WrappedVirtualizedTable
        columns={[
          {
            width: 200,
            flexGrow: 1.0,
            label: 'RN',
            dataKey: RN
          },
          {
            width: 120,
            label: 'TM',
            dataKey: TM,
            numeric: true
          },
          {
            width: 120,
            label: 'acknowledged',
            dataKey: acknowledged,
            numeric: true
          },
          {
            width: 120,
            label: 'created',
            dataKey: created,
            numeric: true
          },
          {
            width: 120,
            label: 'edit',
            dataKey: edit,
            numeric: true
          }
        ]}
        onRowClick={event => console.log(event)}
        rowCount={rows.length}
        rowGetter={({index}) => rows[index]}
      />
    </Paper>
  )
}

export default ReactVirtualizedTable

const Status = ({acknowledged}) => {
  switch (acknowledged) {
  case undefined:
    return <HourglassIcon style={{color: colors.yellow}}/>
  case true:
    return <CheckIcon style={{color: colors.green}}/>
  case false:
    return <CloseIcon style={{color: colors.red}}/>
  default:
    return null
  }
}

/**
 * Check if the user should still be able to edit the message.
 */
function editable(created){
  const createdAddedHours = addHours(created.toDate(), 12)
  const currentDate = Date.now()
  if(isAfter(currentDate, createdAddedHours)){
    return true
  }
  else{
    return false
  }
}
