import i18next from 'i18next'
import common_en from "../locales/en/common.json"
import common_no from "../locales/no/common.json"
import profile_en from "../locales/en/profile.json"
import profile_no from "../locales/no/profile.json"
import boats_en from "../locales/en/boats.json"
import boats_no from "../locales/no/boats.json"
import dashboard_en from "../locales/en/dashboard.json"
import dashboard_no from "../locales/no/dashboard.json"
import pages_en from "../locales/en/pages.json"
import pages_no from "../locales/no/pages.json"
import register_en from "../locales/en/register.json"
import register_no from "../locales/no/register.json"
import languages from "../locales/locales.json"
import messages_en from "../locales/en/messages.json"
import messages_no from "../locales/no/messages.json"

const en = {
  common: common_en,
  profile: profile_en,
  dashboard: dashboard_en,
  boats: boats_en,
  pages: pages_en,
  register: register_en,
  messages: messages_en
}

const no = {
  common: common_no,
  profile: profile_no,
  dashboard: dashboard_no,
  boats: boats_no,
  pages: pages_no,
  register: register_no,
  messages: messages_no
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