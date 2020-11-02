import React, { useContext } from 'react';
import { ResizeContext } from '../../contexts/resizeContext';
import { UnitContext } from '../../contexts/unitsContext';
import { kmphTomph } from '../../utlis/unitConverter';
import './WindSpeed.css'


const UNITS = {
  metric: 'kmph',
  imperial: 'mph'
}


const WindSpeed = ({ speed }) => {

  const {unit} = useContext(UnitContext);
  let unitSymbol = UNITS.metric;

  const { isWideScreen } = useContext(ResizeContext)

  
  if (unit === 'imperial'){
    unitSymbol = UNITS.imperial;
  }


  return (
    <div className={`App-WindSpeed ${isWideScreen ? 'wide-screen' : ''}`}>
      <span className="speed">{unit === 'imperial' ? kmphTomph(speed.speed): speed.speed} {unitSymbol}</span>
      <span>Wind Speed</span>

    </div>
  );
};

export default WindSpeed;