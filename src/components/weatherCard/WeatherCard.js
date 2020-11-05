import React, { memo, useContext, useEffect, useState } from 'react';
import { BackgroundContext } from '../../contexts/backgroundContext';
import { ResizeContext } from '../../contexts/resizeContext';
import { getCitiesNearLocation } from '../../server/geodb';
import { getWeatherDetailsOfLocation } from '../../server/openWeather';
import { fetchImageFromPexel } from '../../server/pexel';
import DateTime from '../dateTime/DateTime';
// import Elevation from '../elevation/Elevation';
import Humidity from '../humidity/Humidity';
import Temperature from '../temperature/Temperature';
import TemperatureForecast from '../temperatureForecast/TemperatureForecast';
import WindSpeed from '../windspeed/WindSpeed';
import './Weather.css'
import locationIcon from '../../assets/g-location.svg'
import { useHistory } from 'react-router-dom';

import windIcon from './../../assets/wind.png'
import humidIcon from './../../assets/whumid.png'
import mawesomeicon from './../../assets/mawesome.png'



const WeatherCard = (props) => {
  const [state, setState] = useState({
    placeDetails: null,
    weatherDetails: null,
    day: 0,
    previousLon: '',
    previousLat: ''
  })


  const { setBackgroundURL } = useContext(BackgroundContext);
  const { isWideScreen } = useContext(ResizeContext);
  const history = useHistory();


  useEffect(() => {
    getDetails();
    // eslint-disable-next-line
  }, [props])

  async function getDetails() {
    // console.log(props);
    if (!props.longitude || !props.latitude) {
      // console.log('returning');
      return;
    }

    if(props.longitude === state.previousLon && props.latitude === state.previousLat){
      setState({
        ...state,
        day: props.day
      })
      return;
    }
    

    const placeDetails = await getCitiesNearLocation(props.longitude, props.latitude);
    fetchImageFromPexel(placeDetails[0].city, isWideScreen).then((backgroundImages)=>{
      setBackgroundURL(backgroundImages[0]);
    })
    const weatherDetails = await getWeatherDetailsOfLocation(props.longitude, props.latitude)

    setState({
      placeDetails,
      weatherDetails,
      day:props.day,
      previousLon: props.longitude,
      previousLat: props.latitude
    })
  }

  function onDayChange(day) {
    history.push(
      `/?${new URLSearchParams({
        lon: props.longitude,
        lat: props.latitude,
        day
      }).toString()}`)
  }

  let dayWeather;

  if (state.weatherDetails) {
    dayWeather = state.weatherDetails.daily[state.day] ? state.weatherDetails.daily[state.day] : state.weatherDetails.daily[0]
  }
  return (
    <div className="App-WeatherCard-Container">
      {!dayWeather &&
        <div  className="w-card-loading" style={{color: 'white', width:'100%', height: '100%', display:'flex', flexDirection:'column', 'justifyContent': 'center', 'alignItems': 'center'}}>
            <img alt='loading' src={mawesomeicon} />
            <div>Loading</div>
        </div>
      }
      {
        dayWeather &&
        <div className={`App-WeatherCard ${isWideScreen ? 'wide-screen' : ''}`}>
          <div className="weather-top">
            <div className="city-title">
              <span className="city-name">
                <img src={locationIcon} alt="location" />
                {state.placeDetails[0].city}, {state.placeDetails[0].countryCode}</span>
              <span className="city-location">{Math.abs(props.latitude)}° {props.latitude > 0 ? 'N' : 'S'} {Math.abs(props.longitude)}° {props.longitude > 0 ? 'E' : 'W'}</span>
              <span className="city-weather-change" onClick={e => history.push('/search')}>change</span>
              <img className="city-weather-icon" src={`http://openweathermap.org/img/wn/${dayWeather.weather[0].icon}@2x.png`} alt="weather-icon" />
              <span className="city-weather-description">{dayWeather.weather[0].description}</span>
            </div>
            <div className="city-datetime">
              <DateTime
                timeStamp={dayWeather.dt}
                day={state.day}
                timezoneOffset={state.weatherDetails.timezone_offset}
                dateChanged={onDayChange} />
            </div>
          </div>
          <div className="city-details">
            <div className="city-temperature">
              <img src={windIcon} alt='wind'/>
              <Temperature temperature={{
                temp: state.day === '0' || state.day === 0 ? state.weatherDetails.current.temp : null,
                min: dayWeather.temp.min,
                max: dayWeather.temp.max
              }} />
              <img src={humidIcon} alt='humid'/>
            </div>
          </div>

          <div className="city-more-details">
            <div className="city-windspeed">
              <WindSpeed speed={{ speed: dayWeather.wind_speed, direction: dayWeather.wind_deg }} />
            </div>
            <div className="city-humidity">
              <Humidity humidity={dayWeather.humidity} />
            </div>
          </div>

          <div className="city-temperature-forecast">
            <TemperatureForecast hourly={state.weatherDetails.hourly} />
          </div>
        </div>}
    </div>
  );
};

export default memo(WeatherCard);