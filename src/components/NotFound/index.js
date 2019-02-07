import React from 'react'
import {Link} from "react-router-dom"
import {withTranslation} from 'react-i18next'

import {Button, Typography} from '@material-ui/core'

import {routes} from '../../lib/router'
import empty from "../../assets/empty_state.svg"

import "./not-found.sass"

import {useDimensions} from '../../hooks'
import Centered from '../Centered'

const NotFound = ({t}) => {

  const {height, width} = useDimensions()

  return (
    <Centered>
      <Typography variant="h3">404</Typography>
      <Typography variant="h5">
        {t('not-found.text')}
      </Typography>
      <img
        alt={t("not-found.img-alt")}
        src={empty}
        style={{margin: `${height/10}px 0`}}
        width={width/2}
      />
      <Button
        color="secondary"
        component={Link}
        size="large"
        to={routes.ROOT}
        variant="contained"
      >
        {t('not-found.back-to-main')}
      </Button>
    </Centered>
  )
}

export default withTranslation("common")(NotFound)