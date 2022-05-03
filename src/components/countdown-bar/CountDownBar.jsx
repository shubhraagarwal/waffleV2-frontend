import React, { useEffect } from "react";
import "./CountDownBar.scss";
import { useTimer } from "react-timer-hook";
const CountDownBar = ({ time, clickable }) => {
  console.log("props9", time);

  const tim = new Date(time);
  tim.setHours(tim.getHours() + 12);

  const { seconds, minutes, hours, restart } = useTimer({
    tim,
    onExpire: () => {
      console.warn("expired");
      clickable(true);
    },
  });
  useEffect(() => {
    restart(tim);
  }, [time]);
  console.log(seconds, minutes, hours, ",,,", tim);

  return (
    <div className="countdown-bar">
      <div className="time-container">
        <ul className="time-container">
          <li>
            <h3>{hours}HR</h3>
          </li>
          <li>
            <h3> {minutes} Min</h3>
          </li>
          <li>
            <h3>{seconds} Sec</h3>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CountDownBar;
