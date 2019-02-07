import i18next from 'i18next'
import common_en from "../locales/en/common.json"
import common_no from "../locales/no/common.json"
import profile_en from "../locales/en/profile.json"
import profile_no from "../locales/no/profile.json"
import pages_en from "../locales/en/pages.json"
import pages_no from "../locales/no/pages.json"
import settings_en from "../locales/en/settings.json"
import settings_no from "../locales/no/settings.json"
import languages from "../locales/locales.json"


i18next.init({
  lng: navigator.language || languages.default,
  resources: {
    en: {
      common: common_en,
      profile: profile_en,
      pages: pages_en
      settings: settings_en
    },
    no: {
      common: common_no,
      profile: profile_no,
      pages: pages_no
      settings: settings_no
    }
  }
})

export default i18next