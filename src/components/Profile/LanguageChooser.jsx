import React from 'react'
import {Select, MenuItem, Typography} from "@material-ui/core"
import {useTranslation} from "react-i18next"
import {languages} from "../../locales/locales.json"
import {useStore} from '../../hooks'

export default () => {

  const i18n = useTranslation("profile")[1]

  const {notify} = useStore()

  const changeLanguage = ({target: {value}}) => {
    localStorage.setItem("preferredLanguage", value)
    i18n.changeLanguage(value)
    notify({name: "language"})
  }

  return(
    <Select
      color="secondary"
      onChange={changeLanguage}
      value={i18n.language}
    >
      {languages.map(({code, title, flag}) =>
        <MenuItem
          key={code}
          selected
          value={code}
        >
          <Typography variant="subtitle1">
            <span aria-label={`{title} flag`} role="img" style={{paddingLeft: 4}}>{flag}</span> {title}
          </Typography>
        </MenuItem>
      )}
    </Select>
  )
}