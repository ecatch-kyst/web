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
import {format, isAfter, addHours, isBefore} from 'date-fns'
import {colors} from '../lib/material-ui'
{/*}
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

MuiVirtualizedTable.propTypes = {
  classes: PropTypes.object.isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      cellContentRenderer: PropTypes.func,
      dataKey: PropTypes.string.isRequired,
      width: PropTypes.number.isRequired
    }),
  ).isRequired,
  headerHeight: PropTypes.number,
  onRowClick: PropTypes.func,
  rowClassName: PropTypes.string,
  rowHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
  sort: PropTypes.func
}

MuiVirtualizedTable.defaultProps = {
  headerHeight: 56,
  rowHeight: 56
}*/}

export const Messages =({store: {messages}}) =>
  <List>
    {messages.length ?
      messages.map(message => <Message key={message.RN} {...message}/>):
      <Loading/>
    }
  </List>

/*assuming i need some translations later, will let 'withTranslations' stand until i know*/
/*RN = message number, TM = message type, use acknowledge to provide state, DA = date sent, TI = time sent*/
export const Message = withTranslation("messages")(({t, RN, TM, acknowledged, created}) =>
  <>
  {/* Information to display: id, type(DEP, DCA, POR..), status(sent, not sent) and if youre able to edit it still(12 hour limit)*/}
  {/*TODO: display this like a table instead of a listItem*/}
    <ListItem key={RN}>
      <Grid container spacing={16}>
        <Grid container item>
          <Typography variant="h5">{RN}</Typography>
        </Grid>
        <Grid container item justify="space-between">
          <Typography>{t("titles.message-type")}: {TM}</Typography>
          {/*Make a status component instead */}
          <Typography>Status: {Status}</Typography>
          <Status acknowledged={acknowledged}/>
          <Typography>{t("titles.time-sent")}: {format(created.toDate(), "yyyy. MMM dd HH:mm")}</Typography>{/*have a check if 12 hours have passed, choose icon based on this.*/}
          <Button
            color="primary"
            component={Link}
            disabled = {editable(created)}
            size="large"
            to={`${routes.MESSAGES}/${RN}${routes.EDIT}`}
            variant="contained"
          >{/*Goal: Link to messages/messageId/edit*/}
            <EditIcon/>
          </Button>
        </Grid>
      </Grid>
    </ListItem>
    <Divider/>
  </>
)
export default withStore(withPage(Messages, {namespace: "messages"}))

/*
class MuiVirtualizedTable extends React.PureComponent {
  getRowClassName = ({ index }) => {
    const { classes, rowClassName, onRowClick } = this.props;

    return classNames(classes.tableRow, classes.flexContainer, rowClassName, {
      [classes.tableRowHover]: index !== -1 && onRowClick != null,
    });
  };

  cellRenderer = ({ cellData, columnIndex = null }) => {
    const { columns, classes, rowHeight, onRowClick } = this.props;
    return (
      <TableCell
        component="div"
        className={classNames(classes.tableCell, classes.flexContainer, {
          [classes.noClick]: onRowClick == null,
        })}
        variant="body"
        style={{ height: rowHeight }}
        align={(columnIndex != null && columns[columnIndex].numeric) || false ? 'right' : 'left'}
      >
        {cellData}
      </TableCell>
    );
  };

  headerRenderer = ({ label, columnIndex, dataKey, sortBy, sortDirection }) => {
    const { headerHeight, columns, classes, sort } = this.props;
    const direction = {
      [SortDirection.ASC]: 'asc',
      [SortDirection.DESC]: 'desc',
    };

    const inner =
      !columns[columnIndex].disableSort && sort != null ? (
        <TableSortLabel active={dataKey === sortBy} direction={direction[sortDirection]}>
          {label}
        </TableSortLabel>
      ) : (
        label
      );

    return (
      <TableCell
        component="div"
        className={classNames(classes.tableCell, classes.flexContainer, classes.noClick)}
        variant="head"
        style={{ height: headerHeight }}
        align={columns[columnIndex].numeric || false ? 'right' : 'left'}
      >
        {inner}
      </TableCell>
    );
  };

  render() {
    const { classes, columns, ...tableProps } = this.props;
    return (
      <AutoSizer>
        {({ height, width }) => (
          <Table
            className={classes.table}
            height={height}
            width={width}
            {...tableProps}
            rowClassName={this.getRowClassName}
          >
            {columns.map(({ cellContentRenderer = null, className, dataKey, ...other }, index) => {
              let renderer;
              if (cellContentRenderer != null) {
                renderer = cellRendererProps =>
                  this.cellRenderer({
                    cellData: cellContentRenderer(cellRendererProps),
                    columnIndex: index,
                  });
              } else {
                renderer = this.cellRenderer;
              }

              return (
                <Column
                  key={dataKey}
                  headerRenderer={headerProps =>
                    this.headerRenderer({
                      ...headerProps,
                      columnIndex: index,
                    })
                  }
                  className={classNames(classes.flexContainer, className)}
                  cellRenderer={renderer}
                  dataKey={dataKey}
                  {...other}
                />
              );
            })}
          </Table>
        )}
      </AutoSizer>
    );
  }
}*/
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
