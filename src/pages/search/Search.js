import React from 'react';
import { useHistory } from 'react-router-dom';
import LocationInput from '../../components/locationInput/LocationInput';
import './Search.css'

const FAMOUS_LOCATIONS = [
  { lon: '22', lat: '88', name: 'Delhi' },
  { lon: '22', lat: '88', name: 'Agra' },
  { lon: '22', lat: '88', name: 'Amritsar' },
  { lon: '22', lat: '88', name: 'Paris' },
  { lon: '22', lat: '88', name: 'New York' },
  { lon: '22', lat: '88', name: 'London' },
]


const Search = () => {

  const history = useHistory();

  function locationChanged(locationDetails) {
    history.push(`/?${new URLSearchParams({
      lon: locationDetails.longitude.toString().substr(0, 5),
      lat: locationDetails.latitude.toString().substr(0, 5)
    }).toString()}`)
  }


  return (
    <div className="App-Search">
      <div className="search-title"> SEARCH AWESOME CITIES </div>
      <LocationInput onLocationSelect={locationChanged} />

      <span className="trending-title">Trending Places</span>
      <div className="location-famous-container"> 
      {FAMOUS_LOCATIONS.map((location, index)=>
        <div key={index} className="location-famous-card">{location.name}</div>)}
      </div>

    </div>
  );
};

export default Search;