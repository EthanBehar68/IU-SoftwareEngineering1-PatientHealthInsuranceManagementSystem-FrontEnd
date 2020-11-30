import React, { Component, Fragment } from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import empty from 'is-empty';

const defaultMapOptions = {
  fullscreenControl: false,
  mapTypeControl: false,
  zoomControl: true,
  streetViewControl: false
};

export default function Map(props) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyBXWw_WfTuEpxdi41Xl-6Nh95lltjD99fY" // ,
    // ...otherOptions
  });

  const renderMap = () => {

    return (
      <GoogleMap
        mapContainerStyle={props.style}
        options={defaultMapOptions}
        zoom={13}
        onLoad={map => {
          const bounds = new window.google.maps.LatLngBounds();
          props.markers.forEach(marker => {
            bounds.extend( new window.google.maps.LatLng(marker.lat, marker.lng) );
          })
          map.fitBounds(bounds);
        }}
      >
        {props.markers.map((marker, i) => (
          <Marker 
            key={i} 
            position={{lat: marker.lat, lng: marker.lng}} 
            label={`${i + 1}`}
            onClick={() => { const element = document.getElementById(`${i + 1}`); if (element) element.scrollIntoView({ block: 'center',  behavior: 'smooth' }); }} 
          />
        ))}
      </GoogleMap>
    )
  }

  if (loadError) {
    return <div>Map cannot be loaded right now, sorry.</div>
  }

  return isLoaded ? renderMap() : <span />
}