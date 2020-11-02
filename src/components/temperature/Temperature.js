import React, { useContext } from 'react';
import { ResizeContext } from '../../contexts/resizeContext';
import { UnitContext } from '../../contexts/unitsContext';
import { celsiusToFahrenheit } from '../../utlis/unitConverter';
import './Temperature.css'

const UNITS = {
  metric: ' °C',
  imperial:' °F' 
}

const Temperature = ({temperature}) => {

  const {unit} = useContext(UnitContext);
  let unitSymbol = UNITS.metric;
  let temp = temperature.temp;
  let min = temperature.min
  let max = temperature.max

  if(unit === 'imperial'){
    unitSymbol = UNITS.imperial;
    temp = celsiusToFahrenheit(temp)
    min = celsiusToFahrenheit(min)
    max = celsiusToFahrenheit(max)
  }

  const {isWideScreen} = useContext(ResizeContext)



  return (
    <div className={`App-Temperature ${isWideScreen ? 'wide-screen' : ''}`}>
      {temperature.temp && <div className="temp">
        {temp} {unitSymbol}
      </div>}
      {!temperature.temp && min && <div className="temp-minmax">
        <div>Min: {min} {unitSymbol}</div>
        <div>Max: {max} {unitSymbol}</div>
      </div>}

      <span className="temp-legend">Temperature</span>
    </div>
  );
};

export default Temperature;