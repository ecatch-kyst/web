import i18next from 'i18next'
import common_en from "../locales/en/common.json"
import common_no from "../locales/no/common.json"
import pages_en from "../locales/en/pages.json"
import pages_no from "../locales/no/pages.json"
import languages from "../locales/locales.json"


i18next.init({
  lng: navigator.language || languages.default,
  resources: {
    en: {
      common: common_en,
      pages: pages_en
    },
    no: {
      common: common_no,
      pages: pages_no
    }
  }
})

export default i18next