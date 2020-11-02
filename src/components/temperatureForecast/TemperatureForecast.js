import React, { useContext } from 'react';
import { ResizeContext } from '../../contexts/resizeContext';
import { UnitContext } from '../../contexts/unitsContext';
import { celsiusToFahrenheit } from '../../utlis/unitConverter';
import './TemperatureForecast.css'

const UNITS = {
  metric: ' °C',
  imperial: ' °F'
}


const TemperatureForecast = ({ hourly }) => {

  const {isWideScreen} = useContext(ResizeContext)
  const numberOfHoursForecast = isWideScreen ? 6 : 2
  const twelveHours = hourly && hourly.slice(1, numberOfHoursForecast+1);
  const {unit} = useContext(UnitContext);
  let unitSymbol = UNITS.metric;

  if(unit === 'imperial'){
    unitSymbol = UNITS.imperial;
  } 




  return (
    <div className="App-TemperatureForecast">
      <span className="forecast-title">Next {numberOfHoursForecast} hours temperature forecast</span>
      <div className="forecast-container">
      {twelveHours && twelveHours.map((hour, index) =>
        <div key={index} className='forecast-card'>
          <span>{unit === 'imperial' ? celsiusToFahrenheit(hour.temp) : hour.temp  } {unitSymbol}</span>
         </div>
       )}
      </div>
    </div>
      );
};

export default TemperatureForecast;