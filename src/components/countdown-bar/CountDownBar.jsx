import React, { useState, useEffect } from "react";
import "./CountDownBar.scss";
import axios from "axios";
import { API_URL_RAFFLE } from "../../utils/ApiURL";
import moment from "moment";
const CountDownBar = () => {
  const [hour, setHours] = useState(null);
  const [minute, setMinutes] = useState(null);
  const [second, setSeconds] = useState(null);
  const [secnd, setSecnd] = useState(0);
  const account = localStorage.getItem("wallet");

  useEffect(() => {
    const interval = setInterval(() => {
      setSecnd((secnd) => secnd + 1);

      axios
        .post(
          `${API_URL_RAFFLE}/api/v1/users/getUser`,
          { walletAddress: account },
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
            },
          }
        )
        .then((res) => {
          let entryTimeInHours = moment(res.data[0].entryTime).add(11, "hours");
          let currentTimeInHours = moment();
          let timeDifference = entryTimeInHours.diff(currentTimeInHours, "HH");
          console.log(
            moment(timeDifference).format("HH"),
            moment(entryTimeInHours).format("HH"),
            currentTimeInHours.format("HH")
          );
          setHours(
            moment(entryTimeInHours).format("HH") -
              currentTimeInHours.format("HH")
          );
          setMinutes(moment(timeDifference).format("mm"));
          setSeconds(moment(timeDifference).format("ss"));
          localStorage.setItem("entryTimeInHours", hour);
        });
    }, 1000);
    return () => clearInterval(interval);
  }, [account, hour]);

  return (
    <div className="countdown-bar">
      <div className="time-container">
        <ul className="time-container">
          <li>
            <h3>
              {hour >= 0 && hour < 12 ? hour : 0}
              HR
            </h3>
          </li>
          <li>
            <h3>{hour >= 0 && hour < 12 ? minute : 0} Min</h3>
          </li>
          <li>
            <h3>{hour >= 0 && hour < 12 ? second : 0} Sec</h3>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CountDownBar;
