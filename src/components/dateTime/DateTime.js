import React, { memo, useContext } from 'react';
import { ResizeContext } from '../../contexts/resizeContext';
import './DateTime.css'

const DateTime = (props) => {

  // const [time, setTime] = useState(0)

  const { isWideScreen } = useContext(ResizeContext)

  function zeroPad(num) {
    if (num < 10) {
      num = '0' + num
    }
    return num;
  }

  function nextClicked() {

    props.dateChanged && props.dateChanged(props.day - -1);
  }

  function prevClicked() {
    props.dateChanged && props.dateChanged(props.day - 1);
  }


  const date = new Date(props.timeStamp * 1000)

  return (
    <div className={`App-Time ${isWideScreen ? 'wide-screen' : ''}`}>
      <div>
        <span className="time-data">{date.toDateString()}</span>
        <div className="date-control">
          <span onClick={prevClicked} style={{ visibility: parseInt(props.day) ? 'visible' : 'hidden' }}>Previous Day</span>
          <span style={{ visibility: props.day < 7 ? 'visible' : 'hidden' }} onClick={nextClicked}>Next Day</span>
        </div>
      </div>
      <div>
        <span className="time-data">{zeroPad(date.getHours()) + ':' + zeroPad(date.getMinutes()) + ' hrs'}</span>
      </div>
    </div>
  );
};

export default memo(DateTime);