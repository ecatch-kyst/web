import React from 'react'
import {withTranslation} from 'react-i18next'
import {withPage} from './shared'


const Dashboard = () => <div></div>

export default withTranslation("pages")(withPage(Dashboard, {namespace: "dashboard"}))