import i18next from 'i18next'
import common_en from "../locales/en/common.json"
import common_no from "../locales/no/common.json"
import profile_en from "../locales/en/profile.json"
import profile_no from "../locales/no/profile.json"
import homepage_en from "../locales/en/homepage.json"
import homepage_no from "../locales/no/homepage.json"
import pages_en from "../locales/en/pages.json"
import pages_no from "../locales/no/pages.json"
import register_en from "../locales/en/register.json"
import register_no from "../locales/no/register.json"
import languages from "../locales/locales.json"
import messages_en from "../locales/en/messages.json"
import messages_no from "../locales/no/messages.json"
import trips_en from "../locales/en/trips.json"
import trips_no from "../locales/no/trips.json"
import forms_en from "../locales/en/forms.json"
import forms_no from "../locales/no/forms.json"
import dropdowns_en from "../locales/en/dropdowns.json"
import dropdowns_no from "../locales/no/dropdowns.json"
import notifications_en from "../locales/en/notifications.json"
import notifications_no from "../locales/no/notifications.json"
import dialogs_en from "../locales/en/dialogs.json"
import dialogs_no from "../locales/no/dialogs.json"
import preset_en from "../locales/en/preset.json"
import preset_no from "../locales/no/preset.json"

import {formatRelative, format} from 'date-fns'
import {nb as nbDateFns, enGB as enDateFns} from "date-fns/locale"

const en = {
  common: common_en,
  profile: profile_en,
  homepage: homepage_en,
  pages: pages_en,
  register: register_en,
  messages: messages_en,
  trips: trips_en,
  forms: forms_en,
  dropdowns: dropdowns_en,
  notifications: notifications_en,
  dialogs: dialogs_en,
  preset: preset_en
}

const no = {
  common: common_no,
  profile: profile_no,
  homepage: homepage_no,
  pages: pages_no,
  register: register_no,
  forms: forms_no,
  messages: messages_no,
  trips: trips_no,
  dropdowns: dropdowns_no,
  notifications: notifications_no,
  dialogs: dialogs_no,
  preset: preset_no
}

i18next.init({
  lng: localStorage.getItem("preferredLanguage") || navigator.language || languages.default,
  resources: {
    en,
    "en-US": en,
    "en-GB": en,
    no,
    "ny-NO": no,
    "nb-NO": no
  },
  interpolation: {
    format: (value, type, language) => {
      switch (type) {

      case "relativeDate": {
        let locale
        switch (language) {
        case "no":
          locale = nbDateFns
          break
        default:
          locale = enDateFns
          break
        }
        return formatRelative(value, Date.now(), {locale})
      }
      case "date": {
        let locale
        switch (language) {
        case "no":
          locale = nbDateFns
          return format(value, "dd. MMMM YYYY HH:mm", {awareOfUnicodeTokens: true, locale})
        default:
          locale = enDateFns
          return format(value, "YYYY.MMM.dd HH:mm", {awareOfUnicodeTokens: true, locale})
        }
      }

      default:
        return value
      }
    }
  }
})

export default i18next