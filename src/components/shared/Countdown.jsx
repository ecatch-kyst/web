import React, {Component} from 'react'
import {Typography} from '@material-ui/core'


export default class extends Component {

  state = {
    end: this.props.end,
    hours: "0",
    minutes: "00",
    seconds: "00"
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      const until = Date.parse(this.props.end) - Date.now()

      const hours = Math.floor((until/(1000*60*60)))
      const minutes = Math.floor((until/1000/60) % 60)
      const seconds = Math.floor((until/1000) % 60)

      if (hours <= 0 && minutes <= 0 && seconds <= 0) clearInterval(this.interval)
      else this.setState({
        hours,
        minutes: (minutes).toLocaleString(undefined, {minimumIntegerDigits: 2}),
        seconds: (seconds).toLocaleString(undefined, {minimumIntegerDigits: 2})
      })
    }, 1000)
  }

  render() {
    const {hours, minutes, seconds} = this.state
    return (
      <Typography style={{fontFamily: "monospace"}}>{`${hours}:${minutes}:${seconds}`}</Typography>
    )
  }
}