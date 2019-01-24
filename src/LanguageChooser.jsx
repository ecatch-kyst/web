import React from 'react'
import {languages} from "./locales/locales.json"
import {translate} from 'react-i18next'

const LanguageChooser = ({i18n}) =>
  <>
    {languages.map(({code, title, flag}) =>
      <button
        key={code}
        onClick={() => i18n.changeLanguage(code)}
      >
        {title} <span aria-label={`{title} flag`} role="img">{flag}</span>
      </button>
    )}
  </>

export default translate('common')(LanguageChooser)