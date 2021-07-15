import React from 'react';

import LOW_PRIORITY_ICON from '../img/green-marker.png';
import MEDIUM_PRIORITY_ICON from '../img/orange-marker.png';
import HIGH_PRIORITY_ICON from '../img/red-marker.png';

/**
 * 
 * @param {string} priority of job
 * @param {() => void)} onMarkerClick cb to handle job details/update
 * @param { {} } object passed to parent cb to display job details (location from locationList).
 * Designated as object so functionality could be extended
 * @returns JSX image for Map Marker
 */
const MapMarker = ({ priority, onMarkerClick, object })=> {

  const onClickHandle = () => {
    onMarkerClick(object);
  }

  let src = LOW_PRIORITY_ICON;
  switch (priority) {
    case 'medium':
      src = MEDIUM_PRIORITY_ICON;
      break;
    case 'high':
      src = HIGH_PRIORITY_ICON;
      break;
    default:
      break;
  }

  return <img className='markerStyle' src={src} alt="marker here" onClick={onClickHandle} />
}

export default MapMarker;
