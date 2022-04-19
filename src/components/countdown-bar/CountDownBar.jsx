import React, { useState, useEffect } from "react";
import "./CountDownBar.scss";
import axios from "axios";
import { useWeb3React } from "@web3-react/core";
import { API_URL, API_URL_RAFFLE } from "../../utils/ApiURL";
import moment from "moment";

const CountDownBar = ({ entryTime }) => {
  const [hour, setHours] = useState(null);
  const [minute, setMinutes] = useState(null);
  const [second, setSeconds] = useState(null);
  const [secnd, setSecnd] = useState(0);

  // console.log(entryTime);

  useEffect(() => {
    const interval = setInterval(() => {
      setSecnd((secnd) => secnd + 1);

      let ts = Date.now();

      ts = ts / 1000;
      ts = Math.floor(ts);
      // console.log(ts);

      if (ts - entryTime > 43200) {
        setHours((hour) => 0);
        setMinutes((minute) => 0);
        setSeconds((second) => 0);
      } else {
        let res = ts - entryTime;

        let resHours = Math.round(res / (60 * 60));
        setHours((hour) => resHours);
        res = res % 3600;
        let resMins = Math.round(res / 60);
        setMinutes((minute) => resMins);
        res = res % 60;
        setSeconds((second) => res);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="countdown-bar">
      <div className="time-container">
        {/* <Countdown
          date={new Date(2022, 3, 1, 4, 30, 0, 0)} //year-(month-1)-date-hour-minute-second-millisecond
          className="text-center fs-3"
          renderer={renderer}
        /> */}
        <ul className="time-container">
          <li>
            <h3>
              {hour}
              HR
            </h3>
          </li>
          <li>
            <h3>{minute} Min</h3>
          </li>
          <li>
            <h3>{second} Sec</h3>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CountDownBar;
