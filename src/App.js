// NATIONAL GRID INTERVIEW ASSIGNMENT
// CANDIDATE NAME: Elizabeth McMahon

/**
 * This challenge was fun: I found I really like working
 * with Google Maps! I haven't worked with Google maps before
 * (believe it or not!).
 * 
 * Another recent discovery I've made, and tried to incorporate here was
 * the react-query library (https://react-query.tanstack.com/overview).
 * It's great! I haven't shown it's true potential here, but given more
 * time, I could have implemented the mutation functionality to update a
 * job record that eventually would be handed off to the API. React-query
 * is so usuable for API with easy to manage pagination, infinite lists,
 * caching... this list goes on. I am tending to move toward functional
 * components vs. classes thereby learning towards hooks usage thus 
 * moving away from Redux state management.
 * 
 * I did not use Redux in this solution, instead using
 * react-query to manage my data fetching, (forecasted) mutations to 
 * implement the status update functionality. Work on this was started with
 * the marker click retrieval and passing the correct location object to
 * the App - which is where the API data is being handled. Eventually,
 * all the API interaction would be slated to be handled in App or in a seperate
 * companion module that App would include.
 * 
 * The SideBar functional component maintains the filter Select states and 
 * calls the App's onChange function to update the filters on change events.
 * I've tried to call out other details via comments in the code.
 * 
 * I used an .env file to define the API url and also the "All" states/no filter
 * option for the Select Filters for priority and status.
 */
import React, { useState } from 'react';
import { useQuery } from 'react-query';

import { format } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";

import Map from './components/Map'
import Sidebar from './components/Sidebar'

/**
 * environment variable to define the default state
 * of the Select Filter options.
 */
const WILDCARD = `${process.env.REACT_APP_ANY_FILTER_VALUE}`;

const App = () => {
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [locationList, setLocationList] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const fetchLocations = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}`);
    const data = await response.json();
    setLocationList(data);
    setFilteredLocations(data);
    return data;
  }

  const { isLoading, isError } = useQuery('locations', fetchLocations);

  /**
   * Helper function to check verify if a named property
   * matches either the match parameter or a wildcard option.
   * @param {any} obj 
   * @param {string} property 
   * @param {string} match 
   * @param {string} wildcard 
   * @returns boolean: true if match, false if not matched
   */
  const checkProperty = (obj, property, match, wildcard=WILDCARD) => {
    return ((match === wildcard) ||
            (obj[property] === match));
  }

  const onChange = (newFilter) => {
    const { priority: newPriority, status: newStatus } = newFilter;

    if ((newPriority === WILDCARD) && (newStatus === WILDCARD)) {
      setFilteredLocations(locationList);
    } 
    else {
      const filtering = locationList.filter(location => (
          (checkProperty(location, 'priority', newPriority) && 
           checkProperty(location, 'status', newStatus))
      ));

      setFilteredLocations(filtering);
      if (!filtering.length) {
        return { error: 'No jobs found matching the current filters.' }
      }
    }
    
    return { error: null }
  }

  /**
   * onChangeDate
   * @param {Date} targetDate This will run through the 
   * **filtered** list to check for all jobs that are 
   * not completed before the target date.
   */
  const onChangeDate = (targetDate) => {
    const selectedDate = format(targetDate, "yyyy-MM-dd");

    const timeZone = "EST";
    const filteredByTargetDate = filteredLocations.filter((location) => {  
      const localDate = utcToZonedTime(new Date(location.required_date), timeZone);
      const rDate = format(new Date(localDate), "yyyy-MM-dd");

      return ((rDate <= selectedDate) &&
              (location.status !== 'completed'));
    });

    setFilteredLocations(filteredByTargetDate);
    if (!filteredByTargetDate.length) {
      return { error: 'No jobs found matching the date and current filters.' }
    }
   
    return { error: null }
  };

  const onMarkerClick = (location) => {
    setSelectedLocation(location);
  }

  const onSelectLocationUpdate = (updatedLocation) => {
    // update the location in the location list. To persist between
    // sessions, would need to update server db.
    let currentLocation = locationList.filter(location => location.id === updatedLocation.id)
    currentLocation = { ...updatedLocation };
    return currentLocation;
  }

  return (
    <div className="App">
      {isError && <div className="container-error">Application error fetching the location data from the API.</div>}

      <div className="container">
        {/* pure css loading icon from https://loading.io/css/ */}
        {isLoading &&
          <div className="loading-container">
            <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
          </div>
        }

        <>
          <Map
            locations={filteredLocations}
            onMarkerClick={onMarkerClick}
          />
          <Sidebar
            onChange={onChange}
            filterByTargetDate={onChangeDate}
            selectedLocation={selectedLocation}
            onSelectLocationUpdate={onSelectLocationUpdate}
          />
        </>
      </div>
    </div>
    );
  }

export default App;
