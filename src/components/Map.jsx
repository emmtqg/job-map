import React from 'react';
import GoogleMapReact from 'google-map-react';
import MapMarker from './MapMarker';

const defaultProps = {
  center: {
    lat: 42.396308,
    lng: -71.272355
  },
  zoom: 10
};

const JobMap = ( {locations, onMarkerClick} ) => {

  const center = defaultProps.center;
  const zoom = defaultProps.zoom;

  return (
      <div className="container-map">
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyCJli8pDDnA-mHXXf_0iyH9rb90LDyrNmM" }}
          defaultCenter={center}
          defaultZoom={zoom}
          options={{ disableDoubleClickZoom: true, fullscreenControl: false }}
        >
          {locations.map(location => {
            return (
              <MapMarker
                key={location.id}
                lat={location.lat}
                lng={location.long}
                priority={location.priority}
                onMarkerClick={onMarkerClick}
                object={location}
              />
            )            
          })}
        </GoogleMapReact>
      </div>
    );
}

export default JobMap;