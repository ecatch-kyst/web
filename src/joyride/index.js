import React, {Component} from 'react'
import ReactJoyride, {ACTIONS, EVENTS, STATUS} from 'react-joyride'
import {Link} from 'react-router-dom'

import styled from 'styled-components'
import ProfileIcon from "@material-ui/icons/PersonOutlineOutlined"
import DashboardIcon from "@material-ui/icons/DashboardOutlined"
import MessageIcon from "@material-ui/icons/ModeCommentOutlined"
import a11yChecker from 'a11y-checker'
import {grommet} from 'grommet/themes'
import {Box, Button, Grommet, Heading} from 'grommet'

import {withTheme, BottomNavigation, BottomNavigationAction} from '@material-ui/core'

import {routes} from '../lib/router'

import {
  Landing,
  Profile,
  Register,
  OfflineStatus,
  Dashboard,
  NotFound,
  Dialog,
  Messages,
  EditMessage,
  Form,
  Notification
} from '../components'
import {useTranslation} from 'react-i18next'

const Wrapper = styled(Grommet)`
  //background-color: #3c3f41;
  color: #fff;
  padding-bottom: 50px;
  height: auto;
  overflow: initial;`

class JoyRideControlled extends Component {

  constructor(props) {
    super(props)
    this.state = {
      run: false,
      steps: [],
      stepIndex: 0
    }
  }

  componentDidMount() {
    this.setState({
      run: true,
      steps: [
        {
          target: this.Button,  
          content: (
            <div>
                  You can interact with your own components through the spotlight.<br />
                  Click the menu above!
            </div>
          ),
          textAlign: 'center',
          placement: 'bottom',
          disableBeacon: true,
          disableOverlayClose: true,
          hideCloseButton: true,
          hideFooter: true,
          spotlightClicks: true,
          styles: {
            options: {
              zIndex: 10000
            }
          },
          title: 'Dashboard'
        }
      ]
    }, () => {
      a11yChecker()
    })
  }

  handleClickStart = e => {
    e.preventDefault()

    this.setState({
      run: true,
      stepIndex: 0
    })
  };

  handleJoyrideCallback = data => {
    const {action, index, type, status} = data

    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      // Need to set our running state to false, so we can restart if we click start again.
      this.setState({run: false, stepIndex: 0})
    }
    else if ([EVENTS.STEP_AFTER, EVENTS.TARGET_NOT_FOUND].includes(type)) {
      const stepIndex = index + (action === ACTIONS.PREV ? -1 : 1)

      if (index === 0) {
        setTimeout(() => {
          this.setState({run: true})
        }, 400)
      }
      else if (index === 1) {
        this.setState({
          run: false,
          stepIndex
        }, () => {
          setTimeout(() => {
            this.setState({run: true})
          }, 400)
        })
      }
      else if (index === 2 && action === ACTIONS.PREV) {
        this.setState({
          run: false,
          stepIndex
        }, () => {
          setTimeout(() => {
            this.setState({run: true})
          }, 400)
        })
      }
      else {
        // Update state to advance the tour
        this.setState({
          stepIndex
        })
      }
    }

    console.groupCollapsed(type === EVENTS.TOUR_STATUS ? `${type}:${status}` : type)
    console.log(data) //eslint-disable-line no-console
    console.groupEnd()
  };

  handleClickOpen = () => {
    const {run, stepIndex} = this.state

    this.setState({
      run: stepIndex === 0 ? false : run,
      stepIndex: stepIndex === 0 ? 1 : stepIndex
    })
  };

    Landing

    Profile

    Register

    OfflineStatus

    Dashboard

    NotFound

    Dialog

    Messages

    EditMessage

    Form

    Notification

    render() {
      const {run, steps, stepIndex} = this.state

      return (
        <Wrapper theme={grommet} full={true} id="outerContainer">
          <ReactJoyride
            continuous
            run={run}
            steps={steps}
            stepIndex={stepIndex}
            scrollToFirstStep
            showProgress
            showSkipButton
            callback={this.handleJoyrideCallback}
            />
          <Dashboard/>
        </Wrapper>
      )
    }

}

export default JoyRideControlled