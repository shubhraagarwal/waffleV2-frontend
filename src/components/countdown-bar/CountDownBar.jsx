import React, { useState, useEffect } from "react";
import "./CountDownBar.scss";
import axios from "axios";
import { useWeb3React } from "@web3-react/core";
import { API_URL } from "../../utils/ApiURL";
import moment from "moment";

const CountDownBar = () => {
  const account = useWeb3React();
  const [entryTime, setEntryTime] = useState();
  const [hour, setHours] = useState();
  const [minute, setMinutes] = useState();
  const [second, setSeconds] = useState();

  useEffect(() => {
    axios
      .post(`${API_URL}/v1/users/getUser`, { walletAddress: account })
      .then((response) => {
        setEntryTime(response.data.user.enteryTime);
        console.log("first");
      })
      .then(() => {
        const reCallAt = moment(entryTime).add(12, "hours");
        const then = moment(reCallAt, "LLLL");
        const now = moment();
        const hours = then.diff(now, "hours");
        const minutes = then.diff(now, "minutes") % 60;
        const seconds = then.diff(now, "seconds") % 3600;
        setHours(hours);
        setMinutes(minutes);
        setSeconds(seconds);

        console.log(hours, minutes, seconds, "sAAAAAAAAAAAAAAAAAAAAAAAAa");
      })
      .catch((err) => {
        return false;
      });
  });

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
