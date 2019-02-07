import React from 'react'
import {languages} from "./locales/locales.json"
import {withTranslation} from 'react-i18next'
import {Select, MenuItem, Typography, Grid} from '@material-ui/core'

const LanguageChooser = ({i18n}) =>
  <Grid alignItems="center" container spacing={16}>
    <Grid item>
      <Typography>Change language:</Typography>
    </Grid>
    <Grid item>
      <Select
        onChange={({target: {value}}) => i18n.changeLanguage(value)}
        value={i18n.language}
      >
        {languages.map(({code, title, flag}) =>
          <MenuItem
            key={code}
            value={code}
          >
            <Typography variant="subtitle1">
              <span aria-label={`{title} flag`} role="img" style={{paddingLeft: 4}}>{flag}</span> {title}
            </Typography>
          </MenuItem>
        )}
      </Select>
    </Grid>
  </Grid>

export default withTranslation('common')(LanguageChooser)