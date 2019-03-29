import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {GoogleMap, Marker, Circle, withGoogleMap, withScriptjs} from "react-google-maps"


//This is placed outside the class to prevent the map reloading every time an prop updates
const GoogleMapWrapper = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    clickableIcons = { props.clickableIcons }
    defaultCenter = { { lat: props.displayLatitude, lng: props.displayLongitude } }
    defaultZoom = { props.mapZoom }
    onClick={(e) => props.handleClick(e)}>
    {props.showMarker &&
    <Marker
      position={{lat: props.selectedLatitude, lng: props.selectedLongitude}}
    />}
    {/* TODO implement my location on map
    <Circle
        center={{ lat: props.displayLatitude, lng: props.displayLongitude }}
        radius={50}
    />
    */}
  </GoogleMap>
));


class GoogleMapsCore extends Component {
  render() {
    return (
      <div>
        <GoogleMapWrapper
          containerElement = { <div style={{ height: this.props.mapHeight, width: this.props.mapWidth }} /> }
          googleMapURL = {"https://maps.googleapis.com/maps/api/js?key=" + this.props.googleMapAPIkey}
          loadingElement = {<div style={{ height: `100%` }} />}
          mapElement = { <div style={{ height: `100%` }} /> }

          {...this.props}
        />
      </div>
    )
  }
}


GoogleMapsCore.propTypes = {
  displayLatitude: PropTypes.number,
  displayLongitude: PropTypes.number,
  mapWidth: PropTypes.number,
  mapHeight: PropTypes.number,
  mapZoom: PropTypes.number,
  googleMapAPIkey: PropTypes.string,
  clickableIcons: PropTypes.bool
};

//TODO make default prop to handle click
GoogleMapsCore.defaultProps = {
  displayLatitude: 63.4305,
  displayLongitude: 10.3951,
  mapWidth: 400,
  mapHeight: 400,
  mapZoom: 13,
  googleMapAPIkey: "AIzaSyAiufyGAqyyGilVDKJlJI1syVQSbYkqGFY",
  clickableIcons: true
};

export default GoogleMapsCore;
