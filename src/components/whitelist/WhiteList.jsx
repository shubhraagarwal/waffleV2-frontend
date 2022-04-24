import { useWeb3React } from "@web3-react/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_URL, API_URL_RAFFLE } from "../../utils/ApiURL";
import "./WhiteList.scss";
import Winner from "../winner/Winner";
import { toast } from "react-toastify";

const WhiteList = (props) => {
  const [syrupp, setsyrupp] = useState("");
  const [discord, setDiscord] = useState("");
  const [allusers, setallusers] = useState([]);
  const [winner, setwinner] = useState([]);
  const [wintime, setwintime] = useState("");
  let temp = [];
  let winr = [];

  const { account } = useWeb3React();

  const getuser = () => {
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
        let res = response.data[0];

        setsyrupp(res.syrups);

        setDiscord(res.discord_id);

        temp.push(response.data[0]);
      })
      .catch((err) => {
        return false;
      });
  };

  // // didnt got it
  // const getalldiscorddasta = () => {
  //   // setOpens(true)
  //   axios
  //     .get(`${API_URL}/api/v1/users/getAllUsers`)
  //     .then((response) => {
  //       setallusers(response.data.data);
  //     })
  //     .catch((err) => {
  //       return false;
  //     });
  // };
  const getallwinner = () => {
    axios
      .get(`${API_URL}/api/v1/users/getAllWinner`, {
        "Access-Control-Allow-Origin": "*",
      })
      .then((response) => {
        // winr.push(
        //   response.data[0],
        //   response.data[1],
        //   response.data[2],
        //   response.data[3],
        //   response.data[4],
        //   response.data[5],
        //   response.data[6],
        //   response.data[7],
        //   response.data[8],
        //   response.data[9]
        // );
        // setwinner(winr);
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
  };
  var now = new Date(wintime);
  var tttt = now.setDate(now.getDate() + 1);

  const [day, setDay] = useState(0);
  const [hour, setHour] = useState(0);
  const [min, setMin] = useState(0);
  const [sec, setSec] = useState(0);

  function timer() {
    var time = new Date();
    var diff = tttt - time.getTime();
    if (diff <= 0) {
      return;
    }
    var days = Math.floor(diff / (1000 * 60 * 60 * 24));
    var hours = Math.floor(diff / (1000 * 60 * 60));
    var mins = Math.floor(diff / (1000 * 60));
    var secs = Math.floor(diff / 1000);
    var d = days;
    var h = hours - days * 24;
    var m = mins - hours * 60;
    var s = secs - mins * 60;
    setDay(d);
    setHour(h);
    setMin(m);
    setSec(s);
  }
  setInterval(() => {
    timer();
  }, 1000);

  const enterRaffle = () => {
    axios
      .post(`${API_URL}/api/v1/users/enterWaffle`, {
        walletAddress: temp[2],
        discord_id: temp[3],
        syrups: temp[4] - 8,
      })
      .then((response) => {
        if (response.data.code === "400") {
          toast.error("You have already entered the raffle", {
            position: "top-right",
            autoClose: 8000,
          });
        }
        // window.location.reload();
      })
      .catch((err) => {
        return false;
      });
  };

  useEffect(() => {
    //   getalldiscorddasta();
    getallwinner();
    getuser();
  }, [account]);

  return (
    <section className="container-fluid white-list">
      {/* {showModal && <JoinDiscord setdiscordid={setdiscordid} dsicordenterance={dsicordenterance} handleModalClose={handleModalClose} />} */}
      <div className="container">
        <h2>want to Enter in Whitelist Raffle?</h2>
        <p>This will cost you 8 syrup</p>
        <p>Want to continue???</p>
        {syrupp >= 8 ? (
          <button
            className={
              syrupp?.discordAdded === true ? "wl-btn success" : "wl-btn enter"
            }
            onClick={enterRaffle}
          >
            {syrupp?.discordAdded === true
              ? "You have successfuly entered in raffle"
              : "Enter in WL Raffle"}
          </button>
        ) : (
          <button className="wl-btn enter dufhudfh" onClick={props.fun}>
            Complete 8 Syrup Target First
          </button>
        )}

        <div className="row g-5 data-table">
          <div className="col-12 col-md-6">
            <h3>Entries</h3>
            <div className="entries-container">
              <ol>
                {allusers.map((value, index) => (
                  <li key={index}>ID {value.discordId}</li>
                ))}
              </ol>
            </div>
          </div>
          <div className="winText col-12 col-md-6">
            {/* we can make a component here which will render this message when null and winners list otherwise */}
            Congratulations To Today's winners 🥳🥳 <br />
            {winner && <Winner props={winner} />}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhiteList;
