import React, {Component} from 'react'
import PropTypes from 'prop-types'
import GoogleMapsCore from './GoogleMapsCore'


class GoogleMapsSelectiveMarker extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showMarker: false,
      selectedLatitude: 40.756795,
      selectedLongitude: -73.954298
    }
    this.selectPosition = this.selectPosition.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }


  //TODO save to redux or context
  selectPosition(event) {
    this.setState({
      showMarker: true,
      selectedLatitude: event.latLng.lat(),
      selectedLongitude: event.latLng.lng()
    })
  }

  handleClick = (event) => {
    this.props.handleMapClick(event)
    this.selectPosition(event)
  }

  render(){
    return(
      <GoogleMapsCore
        {...this.props}

        handleClick = {this.handleClick}
        selectedLatitude = {this.state.selectedLatitude}
        selectedLongitude = {this.state.selectedLongitude}
        showMarker = {this.state.showMarker}
      />
    )
  }
}

GoogleMapsSelectiveMarker.propTypes = {
  displayLatitude: PropTypes.number,
  displayLongitude: PropTypes.number,
  mapWidth: PropTypes.number,
  mapHeight: PropTypes.number,
  mapZoom: PropTypes.number,
  googleMapAPIkey: PropTypes.string,
  clickableIcons: PropTypes.bool
}

//TODO make default prop to handleMapClick
GoogleMapsSelectiveMarker.defaultProps = {
  displayLatitude: 63.4305,
  displayLongitude: 10.3951,
  mapWidth: 800,
  mapHeight: 800,
  mapZoom: 13,
  googleMapAPIkey: "AIzaSyAiufyGAqyyGilVDKJlJI1syVQSbYkqGFY",
  clickableIcons: false
}


export default GoogleMapsSelectiveMarker
