import React from 'react'
import empty from "../../assets/fish.svg"
import {Grid, Tooltip} from '@material-ui/core'
import {withTranslation} from 'react-i18next'

const Loading = ({t}) =>
  <Tooltip title={t("loading.tooltip")}>
    <Grid alignItems="center" container direction="column" justify="center" spacing={32}>
      <img
        alt="loading.tooltip"
        src={empty}
        style={{maxWidth: 128}}
      />
    </Grid>
  </Tooltip>

export default withTranslation("common")(Loading)