import React from 'react'
import {withTheme, Grid, Avatar, Tooltip, Typography} from '@material-ui/core'
import {withTranslation} from 'react-i18next'
import {AUTH} from '../../lib/firebase'


const ProfileDetails = ({t, theme}) => {
  const {displayName, photoURL, email} = AUTH.currentUser || {}
  return (
    <Grid alignItems="center" container item style={{padding: 16}}>
      <Grid item>
        <Avatar
          children={!photoURL && displayName && displayName.slice(0,1)}
          src={photoURL}
          style={{width: 54, height: 54, backgroundColor: theme.palette.secondary.dark}}
        />
      </Grid>
      <Grid container direction="column" item style={{marginLeft: 16}} xs={4}>
        <Tooltip title={t("labels.name")}>
          <Typography variant="body1">{displayName}</Typography>
        </Tooltip>
        <Tooltip title={t("labels.email")}>
          <Typography variant="body2">{email}</Typography>
        </Tooltip>
      </Grid>
    </Grid>
  )
}


export default withTranslation("profile")(withTheme()(ProfileDetails))