import React from 'react'
import {useTranslation} from 'react-i18next'
import {Tooltip, Chip} from '@material-ui/core'

export default ({type, weight}) => {
  const [t] = useTranslation("dropdowns")
  return (
    <Tooltip title={type}>
      <Chip
        label={`${t("species", {returnObjects: true}).find(fish => fish.value === type).label}: ${weight}`}
        style={{margin: "2px 0 2px 4px"}}
      />
    </Tooltip>
  )
}
