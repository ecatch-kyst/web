import React from 'react'
import {Select, MenuItem, Typography} from "@material-ui/core"
import {withTranslation} from "react-i18next"
import {languages} from "../../locales/locales.json"
import {withStore} from '../../db/index.js'

const LanguageChooser = ({i18n, store: {notify}}) => {

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

export default withStore(withTranslation("profile")(LanguageChooser))