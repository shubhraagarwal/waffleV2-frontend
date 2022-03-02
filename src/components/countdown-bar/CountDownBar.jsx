import React from 'react';
import './CountDownBar.scss';
import Countdown from 'react-countdown';
const CountDownBar = ({hour,min,sec}) => {

  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      return <h3>Here</h3>;
    } else {
      return (
        <ul className='time-container'>
          <li>
            <h3>
              {
              hour ?
              hour
              :
              0
            
            } 
            HR</h3>
          </li>
          <li>
            <h3>{
            min ?
            min
            :
            0

            } Min</h3>
          </li>
          <li>
            <h3>{
            sec ?
            sec:
            0
            } Sec</h3>
          </li>
        </ul>
      );
    }
  };
  return (
    <div className='countdown-bar'>
      <div className='time-container'>
        <Countdown
          date={new Date(2022, 3, 1, 4, 30, 0, 0)} //year-(month-1)-date-hour-minute-second-millisecond
          className='text-center fs-3'
          renderer={renderer}
        />
      </div>
    </div>
  );
};

export default CountDownBar;
