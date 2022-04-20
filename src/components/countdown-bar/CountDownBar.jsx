import React, { useState, useEffect } from "react";
import "./CountDownBar.scss";
import axios from "axios";
import { useWeb3React } from "@web3-react/core";
import { API_URL, API_URL_RAFFLE } from "../../utils/ApiURL";
import moment from "moment";
// import { useWeb3React } from "@web3-react/core";
let timer;
const CountDownBar = () => {
  const [hour, setHours] = useState(null);
  const [minute, setMinutes] = useState(null);
  const [second, setSeconds] = useState(null);
  const [secnd, setSecnd] = useState(0);
  //const { account } = useWeb3React();
  let temp = [];
  const [entryTime, setEntryTime] = useState();
  // console.log(entryTime);
  const account = localStorage.getItem("wallet");

  const getuser = async () => {
    // setOpens(true)

    console.log(account);
    console.log("inside getUser");
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
      .then((response) => {
        let res = response;
        console.log("YEH" + res.data[0].entryTime);
        timer = res.data[0].entryTime;

        return Math.floor(res.data[0].entryTime / 1000);
        console.log(+" YEH ENTRY TIME HAI CD KA");
      })
      .catch((err) => {
        console.log(err, "err inside getUser");
        return false;
      });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setSecnd((secnd) => secnd + 1);
      // let entryTime = await getuser()

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
        });

      // console.log(account);
      // console.log("inside getUser");
      // axios
      //   .post(
      //     `${API_URL_RAFFLE}/api/v1/users/getUser`,
      //     { walletAddress: account },
      //     {
      //       headers: {
      //         "Access-Control-Allow-Origin": "*",
      //       },
      //     }
      //   )
      //   .then((response) => {
      //     let res = response;
      //     console.log("YEH" + res.data[0].entryTime);
      //     // timer = Math.floor(res.data[0].entryTime / 1000);
      //     timer = new Date(res.data[0].entryTime * 1000).getHours() - 12;
      //     let tts = timer;
      //     console.clear();
      //     console.log("line 71", timer, tts);
      //     let today = Date.now();
      //     let ts = new Date(today).getHours();
      //     console.log(ts);
      //     ts = ts / 1000;
      //     console.log("timer", ts, tts, timer);

      //     ts = Math.floor(ts);
      //     tts = tts / 1000;
      //     tts = Math.floor(tts);

      //     console.log(ts - tts);
      //     if (ts - tts < 12) {
      //       console.log("Inside IF HOON", tts);
      //       let res = timer - ts;
      //       console.log("line 84", timer, ts);
      //       let resHours = Math.round(res / (60 * 60));
      //       setHours((hour) => resHours);
      //       res = res % 3600;
      //       let resMins = Math.round(res / 60);
      //       setMinutes((minute) => resMins);
      //       res = res % 60;
      //       console.log(res);
      //       setSeconds((second) => res);
      //     } else {
      //       console.log("Inside ELSE HOON");
      //       setHours((hour) => 0);
      //       setMinutes((minute) => 0);
      //       setSeconds((second) => 0);
      //     }

      //     //Math.floor((res.data[0].entryTime)/1000);
      //     console.log(+" YEH ENTRY TIME HAI CD KA");
      //   })
      //   .catch((err) => {
      //     console.log(err, "err inside getUser");
      //     return false;
      //   });

      // let ts = Date.now();
      // console.log(ts);
      // ts = ts / 1000;
      // let tts = timer;

      // ts = Math.floor(ts);
      // tts = tts / 1000;
      // tts = Math.floor(tts);

      // console.log(ts - tts);
      //let entryTime = 1650396597+ 10000
      // if (ts - tts < 43200) {
      //   console.log("Inside IF HOON");
      //   let res = entryTime - ts;
      //   console.log(res);
      //   let resHours = Math.round(res / (60 * 60));
      //   setHours((hour) => resHours);
      //   res = res % 3600;
      //   let resMins = Math.round(res / 60);
      //   setMinutes((minute) => resMins);
      //   res = res % 60;
      //   console.log(res);
      //   setSeconds((second) => res);
      // } else {
      //   console.log("Inside ELSE HOON");
      //   setHours((hour) => 0);
      //   setMinutes((minute) => 0);
      //   setSeconds((second) => 0);
      // }
    }, 1000);
    return () => clearInterval(interval);
  }, [account]);

  return (
    <div className="countdown-bar">
      <div className="time-container">
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
