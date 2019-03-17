import React from 'react'
import {withTranslation} from 'react-i18next'
import {Tooltip, Chip} from '@material-ui/core'

export default withTranslation("forms")(({t, type, weight}) =>
  <Tooltip title={type}>
    <Chip
      label={`${t("dropdowns.species", {returnObjects: true}).find(fish => fish.value === type).label}: ${weight}`}
      style={{margin: "2px 0 2px 4px"}}
    />
  </Tooltip>
)