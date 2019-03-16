/* eslint-disable require-jsdoc */
import React from 'react'

import {Button, Grid} from '@material-ui/core'
import {withStore} from '../../../db'
import {withTranslation} from "react-i18next"
import GeoPointInput from './GeoPointInput'
import TextInput from './TextInput'

const AddFishingSpot = ({t, store: {
  handleDialog,
  handleCustomListChange,
  addToCustomList,
  custom: {editing: {label, value}}
}}) =>
  <Button
    fullWidth
    onClick={() =>
      handleDialog({
        type: "customLists.fishingSpots",
        submit: () => addToCustomList("fishingSpots"),
        children:
          <Grid alignItems="stretch" container direction="column" spacing={16}>
            <Grid item>
              <TextInput
                autoFocus
                dataId="label"
                fullWidth
                label={t("dropdowns.customLists.fishingSpots.label")}
                onChange={handleCustomListChange}
                value={label}
              />
            </Grid>
            <Grid container direction="column" item justify="center">
              <GeoPointInput
                dataId="value"
                // label={t("dropdowns.customLists.fishingSpots.coordinates")}
                onChange={handleCustomListChange}
                value={value}
              />
            </Grid>
          </Grid>
      })
    }
    variant="text"
  >{t("dropdowns.customLists.fishingSpots.button")}
  </Button>


export default withTranslation("forms")(withStore(AddFishingSpot))