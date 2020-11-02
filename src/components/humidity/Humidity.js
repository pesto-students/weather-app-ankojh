import React, { useContext } from 'react';
import { ResizeContext } from '../../contexts/resizeContext';
import './Humidity.css'

const Humidity = ({humidity}) => {

  const { isWideScreen } = useContext(ResizeContext)

  return (
    <div className={`App-Humidity ${isWideScreen ? 'wide-screen' : ''}`}>
      <span className="humidity">{humidity}%</span>
      <span>Humidity</span>

    </div>
  );
};

export default Humidity;