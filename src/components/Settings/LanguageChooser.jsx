import React from 'react'
import {Select, MenuItem, Typography} from "@material-ui/core"
import {withTranslation} from "react-i18next"
import {languages} from "../../locales/locales.json"

const LanguageChooser = ({i18n}) => {

  const changeLanguage = ({target: {value}}) => {
    localStorage.setItem("preferredLanguage", value)
    i18n.changeLanguage(value)
  }

  return(
    <Select
      onChange={changeLanguage}
      value={i18n.language}
      color="secondary"
    >
      {languages.map(({code, title, flag}) =>
        <MenuItem
          key={code}
          value={code}
          selected
        >
          <Typography variant="subtitle1">
            <span aria-label={`{title} flag`} role="img" style={{paddingLeft: 4}}>{flag}</span> {title}
          </Typography>
        </MenuItem>
      )}
    </Select>
  )
}

export default withTranslation("settings")(LanguageChooser)