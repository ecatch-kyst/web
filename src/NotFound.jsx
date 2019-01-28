import React from 'react'
import {Link} from "react-router-dom"
import {withNamespaces} from 'react-i18next'
import {routes} from './lib/router'


const NotFound = ({t}) =>
  <div className="not-found">
    <p>{t('page.notfound')}</p>
    <Link to={routes.ROOT}>{t('page.goBackToMain')}</Link>
  </div>

export default withNamespaces("common")(NotFound)