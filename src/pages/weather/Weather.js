import React, { useContext } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import WeatherCard from '../../components/weatherCard/WeatherCard';
import { DEFAULT_LOCATION } from '../../constants/locationConstants';
import { ResizeContext } from '../../contexts/resizeContext';
import './Weather.css'

const Weather = (props) => {


  const location = useLocation();
  const history = useHistory();

  const queryLongitude = new URLSearchParams(location.search).get('lon');
  const queryLatitude = new URLSearchParams(location.search).get('lat');
  const queryDay = new URLSearchParams(location.search).get('day');

  if (!queryLongitude || !queryLatitude) {
    history.push(`/?${new URLSearchParams({
      lon: DEFAULT_LOCATION.longitude,
      lat: DEFAULT_LOCATION.latitude
    }).toString()}`)
    getUserLocation();
  }

  const { isWideScreen } = useContext(ResizeContext);

  function getUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        history.push(`/?${new URLSearchParams({
          lon: position.coords.longitude.toString().substr(0, 5),
          lat: position.coords.latitude.toString().substr(0, 5)
        }).toString()}`)
      }, ()=>{
          history.push(`/?${new URLSearchParams({
            lon: DEFAULT_LOCATION.longitude,
            lat: DEFAULT_LOCATION.latitude
          }).toString()}`)
      });
    }
  }


  return (
    <div className={`App-Weather ${isWideScreen ? 'wide-screen' : ''}`}>
      {queryLongitude && queryLatitude && <WeatherCard 
        longitude={queryLongitude}
        latitude={queryLatitude}
        day={queryDay ? queryDay : 0}
      />}
    </div>
  );
};

export default Weather;