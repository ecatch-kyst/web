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
        children: <FishingSpotFields latiLabel={t("custom.addLati")} longiLabel={t("custom.addLongi")} onChange={handleEditCustomSpot} textLabel={t("custom.addFishingSpotLabel")} {...editing}/>
      })
    }
  >{t("custom.addSpot")}
  </Button>

export default withTranslation("dropdown")(withStore(AddFishingSpot))

const FishingSpotFields = ({onChange, name, latitude, longitude, textLabel, longiLabel, latiLabel}) =>
  <div>
    <TextField label={textLabel} name="name" onChange={onChange} value={name} />
    <TextField label={latiLabel} name="latitude" onChange={onChange} type="number" value={latitude}/>
    <TextField label={longiLabel} max={180} min={-180} name="longitude" onChange={onChange} type="number" value={longitude}/>
  </div>