import i18next from 'i18next'
import common_en from "../locales/en/common.json"
import common_no from "../locales/no/common.json"
import profile_en from "../locales/en/profile.json"
import profile_no from "../locales/no/profile.json"
import pages_en from "../locales/en/pages.json"
import pages_no from "../locales/no/pages.json"
import languages from "../locales/locales.json"

const en = {
  common: common_en,
  profile: profile_en,
  pages: pages_en
}

const no = {
  common: common_no,
  profile: profile_no,
  pages: pages_no
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
  }
})

export default i18next