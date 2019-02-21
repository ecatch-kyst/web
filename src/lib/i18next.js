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
import problems_en from "../locales/en/problems.json"
import problems_no from "../locales/no/problems.json"
import species_en from "../locales/en/species.json"
import species_no from "../locales/no/species.json"
import messages_en from "../locales/en/messages.json"
import messages_no from "../locales/no/messages.json"
import forms_en from "../locales/en/forms.json"
import forms_no from "../locales/no/forms.json"
import dropdown_en from "../locales/en/dropdown.json"
import dropdown_no from "../locales/no/dropdown.json"

const en = {
  common: common_en,
  profile: profile_en,
  dashboard: dashboard_en,
  boats: boats_en,
  pages: pages_en,
  messages: messages_en,
  register: register_en,
  problems: problems_en,
  species: species_en,
  forms: forms_en,
  dropdown: dropdown_en
}

const no = {
  common: common_no,
  profile: profile_no,
  dashboard: dashboard_no,
  boats: boats_no,
  pages: pages_no,
  problems: problems_no,
  species: species_no,
  register: register_no,
  forms: forms_no,
  messages: messages_no,
  dropdown: dropdown_no
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