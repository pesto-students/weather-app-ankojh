import React from 'react';
import { useHistory } from 'react-router-dom';
import LocationInput from '../../components/locationInput/LocationInput';
import './Search.css'

const FAMOUS_LOCATIONS = [
  { latitude: '28.70', longitude: '77.10', name: 'Delhi, IN' },
  { latitude: '27.17', longitude: '78.00', name: 'Agra, IN' },
  { latitude: '31.63', longitude: '74.87', name: 'Amritsar, IN' },
  { latitude: '48.856', longitude: '2.35', name: 'Paris, FR' },
  { latitude: '51.50', longitude: '-0.12', name: 'London, GB' },
  { latitude: '25.26', longitude: '55.30', name: 'Dubai, AE' },
  { latitude: '1.289', longitude: '103.8', name: 'Singapore, SG' },
  { latitude: '41.89', longitude: '12.48', name: 'Rome, IT' },
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
        {FAMOUS_LOCATIONS.map((location, index) =>
          <div key={index} className="location-famous-card" onClick={e => { locationChanged(location) }}>{location.name}</div>)}
      </div>

    </div>
  );
};

export default Search;