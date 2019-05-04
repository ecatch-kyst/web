/* eslint-disable require-jsdoc */
import React, {useContext} from 'react'

import {Button, Grid} from '@material-ui/core'
import {useTranslation} from "react-i18next"
import GeoPointInput from './GeoPointInput'
import TextInput from './TextInput'
import Store from '../../../db'

export const AddFishingSpot = () => {
  const [t] = useTranslation("dropdowns")
  const {
    handleDialog,
    handleCustomListChange,
    addToCustomList,
    custom: {editing: {label, value}}
  } = useContext(Store)
  return (
    <Button
      color="secondary"
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
                label={t("customLists.fishingSpots.label")}
                onChange={handleCustomListChange}
                value={label}
              />
            </Grid>
            <Grid container direction="column" item justify="center">
              <GeoPointInput
                dataId="value"
                // label={t("customLists.fishingSpots.coordinates")}
                onChange={handleCustomListChange}
                value={value}
              />
            </Grid>
          </Grid>
        })
      }
      size="small"
      variant="contained"
    >{t("customLists.fishingSpots.button")}
    </Button>
  )
}


export default AddFishingSpot