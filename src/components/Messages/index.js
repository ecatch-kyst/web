import React from 'react'
import {Loading, TableHead, Page, SwitchView} from '../shared'

import {Table, TableBody, Toolbar, InputBase, Grid, Typography} from '@material-ui/core'
import {SearchIcon} from "../../icons"

import Message from './components/Message'

import EditCatch from './components/EditCatch'
import {useStore, useListMutations} from '../../hooks'
import {useTranslation} from 'react-i18next'
export {EditCatch}

export const Messages = () => {
  const [t] = useTranslation("messages")
  const {messages} = useStore()
  const {list: mutatedMessages, order, orderBy, handleQuery, handleRequestSort} = useListMutations(messages, {orderBy: "created"})

  return (
    <>
      <Toolbar> {/*NOTE: Maybe add Chip or Toggle components to filter on message types instead*/}
        <SearchIcon />
        <InputBase fullWidth onChange={handleQuery} placeholder={t("titles.search")}/>
      </Toolbar>
      {mutatedMessages.length ?
        <Table>
          <TableHead
            namespace="messages"
            onRequestSort={handleRequestSort}
            order={order}
            orderBy={orderBy}
          />
          <TableBody>
            {mutatedMessages.map(message => <Message key={message.id} {...message}/>)}
          </TableBody>
        </Table> :
        <Loading/>
      }
    </>
  )
}


export default props => {
  const [t] = useTranslation("messages")

  return(
    <Page
      namespace="messages"
      title={
        <Grid alignItems="center" container justify="space-between">
          <Typography variant="h4">{t("titles.main")}</Typography>
          <SwitchView/>
        </Grid>
      }
    >
      <Messages {...props}/>
    </Page>
  )
}