import i18n from 'i18next'

import {formatRelative, format} from 'date-fns'
import {nb, enGB} from "date-fns/locale"
import locales from "../locales"


i18n.init({
  lng:
    (locales.languages.find(l => l.code === localStorage.getItem("preferredLanguage")) || {}).code ||
    (locales.languages.find(l => l.code === navigator.language) || {}).code ||
      locales.default,
  resources: {
    en: locales.en,
    "en-US": locales.en,
    "en-GB": locales.en,
    no: locales.no,
    "ny-NO": locales.no,
    "nb-NO": locales.no
  },
  interpolation: {
    format: (value, type, language) => {
      switch (type) {

      case "relativeDate": {
        let locale
        switch (language) {
        case "no":
          locale = nb
          break
        default:
          locale = enGB
          break
        }
        return formatRelative(value, Date.now(), {locale})
      }
      case "date": {
        let locale
        switch (language) {
        case "no":
          locale = nb
          return format(value, "dd. MMMM YYYY HH:mm", {awareOfUnicodeTokens: true, locale})
        default:
          locale = enGB
          return format(value, "YYYY.MMM.dd HH:mm", {awareOfUnicodeTokens: true, locale})
        }
      }

      default:
        return value
      }
    }
  }
})

export default i18n