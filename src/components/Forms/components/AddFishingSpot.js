/* eslint-disable require-jsdoc */
import React from 'react'

import {Button, TextField} from '@material-ui/core'
import {withStore} from '../../../db'
import {withTranslation} from "react-i18next"

const AddFishingSpot = ({t, store: {handleDialog, handleEditCustomSpot, handleAddCustomSpot, custom: {editing}}}) =>
  <Button
    onClick={() =>
      handleDialog({
        type: "addSpot",
        submit: handleAddCustomSpot,
        children: <FishingSpotFields onChange={handleEditCustomSpot} {...editing}/>
      })
    }
  >{t("custom.addSpot")}
  </Button>

export default withTranslation("dropdown")(withStore(AddFishingSpot))

const FishingSpotFields = ({onChange, name, latitude, longitude}) =>
  <>
    <TextField label="Legg til din egen fiskeplass" name="name" onChange={onChange} value={name} />
    <TextField label="Legg inn breddegrad" name="latitude" onChange={onChange} value={latitude}/>
    <TextField label="Legg inn lengdegrad" name="longitude" onChange={onChange} value={longitude}/>
  </>