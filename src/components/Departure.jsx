import React, {Component} from 'react'
import Store, {withStore} from '../db'
import InputDropdown from './shared/InputDropdown'
import {withTranslation} from 'react-i18next'

class Departure extends Component {
    static contextType = Store

    state = {done: false}

    render() {
      const {ports, Birds} = this.context
      const {t} = this.props

      //const problems = Array(parseInt(t("size"), 10)).fill(null).map((_, i) => t(`problems.${i}`))
      //console.log(problems)
      const problems = t("problems", {returnObjects: true})
      //const fishtypes = t("species", {returnObjects: true})
      //console.log(fishtypes)


      return (

        <div>
          <InputDropdown tekst="Velg havn:" type={ports}/>
          <InputDropdown tekst="Velg fugleart" type={Birds}/>
          <InputDropdown tekst="Hadde du noen redskapsproblemer?" type={problems}/>
        </div>
      )
    }
}

export default withTranslation("problems")(withStore(Departure))