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

    // console.log(weatherDetails);
    // setState({
    //   placeDetails: [{ city: 'abc', countryCode: '11' }],
    //   weatherDetails: {
    //     "lat": 25.09,
    //     "lon": 85.31,
    //     "timezone": "Asia/Kolkata",
    //     "timezone_offset": 19800,
    //     "current": {
    //       "dt": 1604300781,
    //       "sunrise": 1604276814,
    //       "sunset": 1604317058,
    //       "temp": 28.57,
    //       "feels_like": 27.41,
    //       "pressure": 1014,
    //       "humidity": 39,
    //       "dew_point": 13.27,
    //       "uvi": 7.01,
    //       "clouds": 100,
    //       "visibility": 3000,
    //       "wind_speed": 3.1,
    //       "wind_deg": 300,
    //       "weather": [
    //         {
    //           "id": 721,
    //           "main": "Haze",
    //           "description": "haze",
    //           "icon": "50d"
    //         }
    //       ]
    //     },
    //     "hourly": [
    //       {
    //         "dt": 1604300400,
    //         "temp": 28.57,
    //         "feels_like": 26.86,
    //         "pressure": 1014,
    //         "humidity": 39,
    //         "dew_point": 13.27,
    //         "clouds": 100,
    //         "visibility": 10000,
    //         "wind_speed": 3.89,
    //         "wind_deg": 286,
    //         "weather": [
    //           {
    //             "id": 804,
    //             "main": "Clouds",
    //             "description": "overcast clouds",
    //             "icon": "04d"
    //           }
    //         ],
    //         "pop": 0
    //       },
    //       {
    //         "dt": 1604304000,
    //         "temp": 29.58,
    //         "feels_like": 27.25,
    //         "pressure": 1013,
    //         "humidity": 33,
    //         "dew_point": 11.62,
    //         "clouds": 100,
    //         "visibility": 10000,
    //         "wind_speed": 4.04,
    //         "wind_deg": 288,
    //         "weather": [
    //           {
    //             "id": 804,
    //             "main": "Clouds",
    //             "description": "overcast clouds",
    //             "icon": "04d"
    //           }
    //         ],
    //         "pop": 0
    //       },
    //       {
    //         "dt": 1604307600,
    //         "temp": 29.85,
    //         "feels_like": 27.25,
    //         "pressure": 1012,
    //         "humidity": 31,
    //         "dew_point": 10.91,
    //         "clouds": 92,
    //         "visibility": 10000,
    //         "wind_speed": 4.13,
    //         "wind_deg": 289,
    //         "weather": [
    //           {
    //             "id": 804,
    //             "main": "Clouds",
    //             "description": "overcast clouds",
    //             "icon": "04d"
    //           }
    //         ],
    //         "pop": 0
    //       },
    //       {
    //         "dt": 1604311200,
    //         "temp": 29.25,
    //         "feels_like": 27.02,
    //         "pressure": 1010,
    //         "humidity": 34,
    //         "dew_point": 11.78,
    //         "clouds": 78,
    //         "visibility": 10000,
    //         "wind_speed": 3.96,
    //         "wind_deg": 285,
    //         "weather": [
    //           {
    //             "id": 803,
    //             "main": "Clouds",
    //             "description": "broken clouds",
    //             "icon": "04d"
    //           }
    //         ],
    //         "pop": 0
    //       },
    //       {
    //         "dt": 1604314800,
    //         "temp": 26.77,
    //         "feels_like": 25.44,
    //         "pressure": 1010,
    //         "humidity": 43,
    //         "dew_point": 13.16,
    //         "clouds": 69,
    //         "visibility": 10000,
    //         "wind_speed": 3.29,
    //         "wind_deg": 278,
    //         "weather": [
    //           {
    //             "id": 803,
    //             "main": "Clouds",
    //             "description": "broken clouds",
    //             "icon": "04d"
    //           }
    //         ],
    //         "pop": 0
    //       },
    //       {
    //         "dt": 1604318400,
    //         "temp": 24.49,
    //         "feels_like": 22.82,
    //         "pressure": 1010,
    //         "humidity": 46,
    //         "dew_point": 12.18,
    //         "clouds": 61,
    //         "visibility": 10000,
    //         "wind_speed": 3.32,
    //         "wind_deg": 269,
    //         "weather": [
    //           {
    //             "id": 803,
    //             "main": "Clouds",
    //             "description": "broken clouds",
    //             "icon": "04n"
    //           }
    //         ],
    //         "pop": 0
    //       },
    //       {
    //         "dt": 1604322000,
    //         "temp": 23.7,
    //         "feels_like": 22.22,
    //         "pressure": 1011,
    //         "humidity": 48,
    //         "dew_point": 12.08,
    //         "clouds": 18,
    //         "visibility": 10000,
    //         "wind_speed": 3.01,
    //         "wind_deg": 255,
    //         "weather": [
    //           {
    //             "id": 801,
    //             "main": "Clouds",
    //             "description": "few clouds",
    //             "icon": "02n"
    //           }
    //         ],
    //         "pop": 0
    //       },
    //       {
    //         "dt": 1604325600,
    //         "temp": 23.22,
    //         "feels_like": 21.72,
    //         "pressure": 1012,
    //         "humidity": 49,
    //         "dew_point": 11.95,
    //         "clouds": 43,
    //         "visibility": 10000,
    //         "wind_speed": 2.99,
    //         "wind_deg": 246,
    //         "weather": [
    //           {
    //             "id": 802,
    //             "main": "Clouds",
    //             "description": "scattered clouds",
    //             "icon": "03n"
    //           }
    //         ],
    //         "pop": 0
    //       },
    //       {
    //         "dt": 1604329200,
    //         "temp": 22.69,
    //         "feels_like": 21.03,
    //         "pressure": 1013,
    //         "humidity": 50,
    //         "dew_point": 11.86,
    //         "clouds": 53,
    //         "visibility": 10000,
    //         "wind_speed": 3.14,
    //         "wind_deg": 250,
    //         "weather": [
    //           {
    //             "id": 803,
    //             "main": "Clouds",
    //             "description": "broken clouds",
    //             "icon": "04n"
    //           }
    //         ],
    //         "pop": 0
    //       },
    //       {
    //         "dt": 1604332800,
    //         "temp": 22.07,
    //         "feels_like": 20.36,
    //         "pressure": 1013,
    //         "humidity": 51,
    //         "dew_point": 11.65,
    //         "clouds": 51,
    //         "visibility": 10000,
    //         "wind_speed": 3.1,
    //         "wind_deg": 258,
    //         "weather": [
    //           {
    //             "id": 803,
    //             "main": "Clouds",
    //             "description": "broken clouds",
    //             "icon": "04n"
    //           }
    //         ],
    //         "pop": 0
    //       },
    //       {
    //         "dt": 1604336400,
    //         "temp": 21.45,
    //         "feels_like": 19.54,
    //         "pressure": 1012,
    //         "humidity": 50,
    //         "dew_point": 10.81,
    //         "clouds": 47,
    //         "visibility": 10000,
    //         "wind_speed": 3.02,
    //         "wind_deg": 258,
    //         "weather": [
    //           {
    //             "id": 802,
    //             "main": "Clouds",
    //             "description": "scattered clouds",
    //             "icon": "03n"
    //           }
    //         ],
    //         "pop": 0
    //       },
    //       {
    //         "dt": 1604340000,
    //         "temp": 20.85,
    //         "feels_like": 18.59,
    //         "pressure": 1012,
    //         "humidity": 47,
    //         "dew_point": 9.42,
    //         "clouds": 41,
    //         "visibility": 10000,
    //         "wind_speed": 2.96,
    //         "wind_deg": 252,
    //         "weather": [
    //           {
    //             "id": 802,
    //             "main": "Clouds",
    //             "description": "scattered clouds",
    //             "icon": "03n"
    //           }
    //         ],
    //         "pop": 0
    //       }
    //     ],
    //     "daily": [
    //       {
    //         "dt": 1604295000,
    //         "sunrise": 1604276814,
    //         "sunset": 1604317058,
    //         "temp": {
    //           "day": 28.57,
    //           "min": 20.43,
    //           "max": 29.37,
    //           "night": 20.91,
    //           "eve": 25.37,
    //           "morn": 20.43
    //         },
    //         "feels_like": {
    //           "day": 27.05,
    //           "night": 18.66,
    //           "eve": 23.84,
    //           "morn": 18.68
    //         },
    //         "pressure": 1014,
    //         "humidity": 39,
    //         "dew_point": 13.27,
    //         "wind_speed": 3.62,
    //         "wind_deg": 280,
    //         "weather": [
    //           {
    //             "id": 804,
    //             "main": "Clouds",
    //             "description": "overcast clouds",
    //             "icon": "04d"
    //           }
    //         ],
    //         "clouds": 100,
    //         "pop": 0,
    //         "uvi": 7.01
    //       },
    //       {
    //         "dt": 1604381400,
    //         "sunrise": 1604363253,
    //         "sunset": 1604403421,
    //         "temp": {
    //           "day": 28.75,
    //           "min": 18.26,
    //           "max": 29.19,
    //           "night": 19.74,
    //           "eve": 23.36,
    //           "morn": 18.26
    //         },
    //         "feels_like": {
    //           "day": 25.47,
    //           "night": 16.61,
    //           "eve": 20.93,
    //           "morn": 14.82
    //         },
    //         "pressure": 1013,
    //         "humidity": 26,
    //         "dew_point": 7.75,
    //         "wind_speed": 3.8,
    //         "wind_deg": 280,
    //         "weather": [
    //           {
    //             "id": 800,
    //             "main": "Clear",
    //             "description": "clear sky",
    //             "icon": "01d"
    //           }
    //         ],
    //         "clouds": 0,
    //         "pop": 0,
    //         "uvi": 6.63
    //       },
    //       {
    //         "dt": 1604467800,
    //         "sunrise": 1604449691,
    //         "sunset": 1604489785,
    //         "temp": {
    //           "day": 28.73,
    //           "min": 17.56,
    //           "max": 29.47,
    //           "night": 18.94,
    //           "eve": 23.04,
    //           "morn": 17.56
    //         },
    //         "feels_like": {
    //           "day": 25.21,
    //           "night": 16.34,
    //           "eve": 20.36,
    //           "morn": 14.14
    //         },
    //         "pressure": 1012,
    //         "humidity": 24,
    //         "dew_point": 6.2,
    //         "wind_speed": 3.76,
    //         "wind_deg": 283,
    //         "weather": [
    //           {
    //             "id": 800,
    //             "main": "Clear",
    //             "description": "clear sky",
    //             "icon": "01d"
    //           }
    //         ],
    //         "clouds": 0,
    //         "pop": 0,
    //         "uvi": 6.2
    //       },
    //       {
    //         "dt": 1604554200,
    //         "sunrise": 1604536130,
    //         "sunset": 1604576151,
    //         "temp": {
    //           "day": 27.96,
    //           "min": 16.82,
    //           "max": 29.34,
    //           "night": 19.43,
    //           "eve": 23.09,
    //           "morn": 16.82
    //         },
    //         "feels_like": {
    //           "day": 25.39,
    //           "night": 17.07,
    //           "eve": 20.88,
    //           "morn": 13.74
    //         },
    //         "pressure": 1014,
    //         "humidity": 26,
    //         "dew_point": 6.92,
    //         "wind_speed": 2.57,
    //         "wind_deg": 270,
    //         "weather": [
    //           {
    //             "id": 800,
    //             "main": "Clear",
    //             "description": "clear sky",
    //             "icon": "01d"
    //           }
    //         ],
    //         "clouds": 0,
    //         "pop": 0,
    //         "uvi": 6.31
    //       },
    //       {
    //         "dt": 1604640600,
    //         "sunrise": 1604622570,
    //         "sunset": 1604662517,
    //         "temp": {
    //           "day": 28,
    //           "min": 16.64,
    //           "max": 28.95,
    //           "night": 19.68,
    //           "eve": 23.22,
    //           "morn": 16.64
    //         },
    //         "feels_like": {
    //           "day": 26.59,
    //           "night": 17.3,
    //           "eve": 21.45,
    //           "morn": 14.32
    //         },
    //         "pressure": 1016,
    //         "humidity": 28,
    //         "dew_point": 8.13,
    //         "wind_speed": 1.27,
    //         "wind_deg": 288,
    //         "weather": [
    //           {
    //             "id": 800,
    //             "main": "Clear",
    //             "description": "clear sky",
    //             "icon": "01d"
    //           }
    //         ],
    //         "clouds": 0,
    //         "pop": 0,
    //         "uvi": 6.17
    //       },
    //       {
    //         "dt": 1604727000,
    //         "sunrise": 1604709010,
    //         "sunset": 1604748885,
    //         "temp": {
    //           "day": 27.72,
    //           "min": 16.92,
    //           "max": 29.32,
    //           "night": 19.51,
    //           "eve": 23.53,
    //           "morn": 16.92
    //         },
    //         "feels_like": {
    //           "day": 25.63,
    //           "night": 17.15,
    //           "eve": 21.18,
    //           "morn": 14.74
    //         },
    //         "pressure": 1017,
    //         "humidity": 30,
    //         "dew_point": 8.6,
    //         "wind_speed": 2.52,
    //         "wind_deg": 286,
    //         "weather": [
    //           {
    //             "id": 800,
    //             "main": "Clear",
    //             "description": "clear sky",
    //             "icon": "01d"
    //           }
    //         ],
    //         "clouds": 0,
    //         "pop": 0,
    //         "uvi": 6.22
    //       },
    //       {
    //         "dt": 1604813400,
    //         "sunrise": 1604795450,
    //         "sunset": 1604835254,
    //         "temp": {
    //           "day": 27.16,
    //           "min": 16.42,
    //           "max": 28.54,
    //           "night": 19.54,
    //           "eve": 23.09,
    //           "morn": 16.42
    //         },
    //         "feels_like": {
    //           "day": 24.91,
    //           "night": 17.51,
    //           "eve": 21.38,
    //           "morn": 13.57
    //         },
    //         "pressure": 1016,
    //         "humidity": 29,
    //         "dew_point": 7.68,
    //         "wind_speed": 2.4,
    //         "wind_deg": 308,
    //         "weather": [
    //           {
    //             "id": 800,
    //             "main": "Clear",
    //             "description": "clear sky",
    //             "icon": "01d"
    //           }
    //         ],
    //         "clouds": 0,
    //         "pop": 0,
    //         "uvi": 5.99
    //       },
    //       {
    //         "dt": 1604899800,
    //         "sunrise": 1604881891,
    //         "sunset": 1604921625,
    //         "temp": {
    //           "day": 27.25,
    //           "min": 16.89,
    //           "max": 28.83,
    //           "night": 20.02,
    //           "eve": 23.99,
    //           "morn": 16.89
    //         },
    //         "feels_like": {
    //           "day": 25.75,
    //           "night": 19.04,
    //           "eve": 23.1,
    //           "morn": 14.71
    //         },
    //         "pressure": 1014,
    //         "humidity": 34,
    //         "dew_point": 10.25,
    //         "wind_speed": 2.21,
    //         "wind_deg": 331,
    //         "weather": [
    //           {
    //             "id": 800,
    //             "main": "Clear",
    //             "description": "clear sky",
    //             "icon": "01d"
    //           }
    //         ],
    //         "clouds": 0,
    //         "pop": 0,
    //         "uvi": 6.21
    //       }
    //     ]
    //   },
    //   day: props.day
    // })
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
        <div style={{color: 'white', width:'100%', height: '100%', display:'flex', 'justifyContent': 'center', 'alignItems': 'center'}}>
            Loading
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
              <span className="city-weather-change" onClick={e => history.push('/search')}>change</span>
              <span className="city-location">Lon: {props.longitude} Lat: {props.latitude}</span>
              <span className="city-weather-description">{dayWeather.weather[0].description}</span>
            </div>
            <div className="city-datetime">
              <DateTime
                timeStamp={dayWeather.dt}
                day={state.day}
                dateChanged={onDayChange} />
            </div>
          </div>
          <div className="city-details">
            <div className="city-temperature">
              <Temperature temperature={{
                temp: state.day === '0' || state.day === 0 ? state.weatherDetails.current.temp : null,
                min: dayWeather.temp.min,
                max: dayWeather.temp.max
              }} />
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