import React, {Component} from 'react'
import {Loading, withPage} from '../shared'
import {withStore} from '../../db'

import {Table, TableBody, Toolbar, InputBase} from '@material-ui/core'
import SearchIcon from "@material-ui/icons/SearchOutlined"

import Message from './components/Message'

import EditMessage from './components/EditMessage'
import TableHead from './components/TableHead'
export {EditMessage}


const desc = (a, b, orderBy) =>
  (b[orderBy] < a[orderBy]) ? -1 :
    (b[orderBy] > a[orderBy]) ? 1 :
      0

const stableSort = (array, cmp) => {
  const stabilizedThis = array.map((el, index) => [el, index])
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0])
    if (order !== 0) return order
    return a[1] - b[1]
  })
  return stabilizedThis.map(el => el[0])
}

const getSorting = (order, orderBy) =>
  order === 'desc' ?
    (a, b) => desc(a, b, orderBy) :
    (a, b) => -desc(a, b, orderBy)


export class Messages extends Component {

    state = {
      order: 'desc',
      orderBy: 'created',
      query: ""
    }

    handleRequestSort = orderBy =>
      this.setState(({order}) => ({
        order: order === "desc" ? "asc" : "desc",
        orderBy
      }))

    handleQuery = ({target: {value}}) =>
      this.setState({query: value.toLowerCase()})


    render() {
      const {order, orderBy, query} = this.state
      let {messages} = this.props.store

      messages = stableSort(messages, getSorting(order, orderBy))
        .filter(m => m.TM.toLowerCase() === query || query === "")
        .map(
          (message) => {
            return <Message key={message.RN || Math.random() * Math.random()} {...message}/>
          }
        )

      return (
        <>
          <Toolbar>
            <SearchIcon />
            <InputBase onChange={this.handleQuery} placeholder="Search…"/>
          </Toolbar>
        {messages.length ?
          <Table>
            <TableHead
              onRequestSort={this.handleRequestSort}
              order={order}
              orderBy={orderBy}
            />
            <TableBody>
              {messages}
            </TableBody>
          </Table> :
          <Loading/>
        }
        </>
      )
    }
}


export default withPage(withStore(Messages), {namespace: "messages"})