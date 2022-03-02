import React, { useState, useEffect } from 'react';
import JoinDiscord from '../modal/JoinDiscord';
import './WhiteList.scss';
import axios from "axios";
import { API_URL } from "../../utils/ApiURL";
import { useWeb3React } from "@web3-react/core";
import { set } from 'lodash';


const WhiteList = () => {
  const [whiteListed, setWhiteListed] = useState(false);

  const [syrupp, setsyrupp] = useState('');

  const [allusers, setallusers] = useState([]);
  const [winner, setwinner] = useState([]);
  const [wintime, setwintime] = useState('');

  

  // console.log('winnetime',wintime)
  console.log("discord syrup", syrupp)
  const { account } = useWeb3React();

  const entries = [
    'dayfi#3356',
    'Sheep#6060',
    'zoof#3665',
    'dayfi#3356',
    'Sheep#6060',
    'zoof#3665',
    'dayfi#3356',
    'Sheep#6060',
    'zoof#3665',
    'dayfi#3356',
    'Sheep#6060',
    'zoof#3665',
    'dayfi#3356',
    'Sheep#6060',
    'zoof#3665',
  ];


  const getuser = () => {
    // setOpens(true)
    axios.post(`${API_URL}/v1/users/getUser`, { walletAddress: account })
      .then((response) => {
        setsyrupp(response.data.user)
        // console.log("getuser", response)
      })
      .catch((err) => {
        // setOpens(false)
        // toast.warning('Error While getting user Lottery', {
        //   position: "top-right",
        //   autoClose: 3000,
        // });
        return false;
      })
  }

  const getalldiscorddasta = () => {
    // setOpens(true)
    axios.get(`${API_URL}/v1/users/getAllUsers`)
      .then((response) => {
        // console.log("get all user", response)
        // setallusers(response.data.data)
        setallusers(response.data.data)
      })
      .catch((err) => {
        // setOpens(false)
        // toast.warning('Error While getting user Lottery', {
        //   position: "top-right",
        //   autoClose: 3000,
        // });
        return false;
      })
  }
  const getallwinner = () => {
    // setOpens(true)
    axios.get(`${API_URL}/v1/users/getAllWinner`)
      .then((response) => {
     
        // setallusers(response.data.data)
        setwinner(response.data.data)
        // console.log("response",)
        setwintime(response.data.data[0].winnerTime)
        // setwintime(response.data.data.winnerTime[0])
      })
      .catch((err) => {
        // setOpens(false)
        // toast.warning('Error While getting user Lottery', {
        //   position: "top-right",
        //   autoClose: 3000,
        // });
        return false;
      })
  }
  // const epochTime = new Date(wintime);
  // const newTime=epochTime.setDate(epochTime.getDate()+1)
  // const epoctimenew = epochTime.getTime() / 1000.0;
  // console.log("new epoc time",newTime)
  var now = new Date(wintime)
  var tttt = now.setDate(now.getDate() + 1)
  console.log("epoc time ", tttt)
  // const d = new Date(epochTime);
  // const t = (d.getTime() + 43200000);

  const [day, setDay] = useState(0);
  const [hour, setHour] = useState(0);
  const [min, setMin] = useState(0);
  const [sec, setSec] = useState(0);
  // var now = new Date("2022,02,23T12:00:00Z")
  // var now= new Date('2022-02-23T12:00:00Z')
  // console.log("tomoroow",wintime)
  // var now= new Date('2022-02-22 6::00 PM')
  // console.log("now", now)
  // console.log("now",now)
  function timer() {

    var time = new Date()
    // var d = time.getHours()
    // console.log("ddddddd",d)
    var diff = tttt - time.getTime()
    if (diff <= 0) {
      //  now = now.setDate(now.getDate() + 1);
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
    setSec(s)
  }
  setInterval(() => {
    timer()
  }, 1000);

  const submitdiscordid = () => {
    // setOpens(true)
    axios.post(`${API_URL}/v1/users/submitDiscordUser`, { walletAddress: account })
      .then((response) => {
        // setsyrup(response.data.user)
        getuser();
        window.location.reload();
        // console.log("getuser", response)
      })
      .catch((err) => {
        // setOpens(false)
        // toast.warning('Error While getting user Lottery', {
        //   position: "top-right",
        //   autoClose: 3000,
        // });
        return false;
      })
  }

  useEffect(() => {
    getalldiscorddasta();
    getuser();
    getallwinner();
  }, [account]);

  // console.log("statys we get here",syrupp?.discordAdded)



  return (
    <section className='container-fluid white-list'>
      {/* {showModal && <JoinDiscord setdiscordid={setdiscordid} dsicordenterance={dsicordenterance} handleModalClose={handleModalClose} />} */}
      <div className='container'>
        <h2>want to Enter in Whitelist Raffle?</h2>
        <p>This will cost you 1 syrup</p>
        <p>Want to continue???</p>
        {syrupp?.syrupQuantity > 4 && syrupp?.syrupQuantity <= 8 ?
          <button
            className={syrupp?.discordAdded === true ? 'wl-btn success' : 'wl-btn enter'}
            onClick={submitdiscordid}
          >
            {syrupp?.discordAdded === true
              ? 'You have successfuly entered in raffle'
              : 'Enter in WL Raffle'}
          </button>
          :
          <button
            className='wl-btn enter dufhudfh' disabled
          // onClick={handleBtnClick}
          >
            Complete 8 Syrup Target First
          </button>
        }

        <div className='row g-5 data-table'>
          <div className='col-12 col-md-6'>
            <h3>Entries</h3>
            <div className='entries-container'>
              <ol>
                {allusers.map((value, index) => (
                  <li key={index}>ID {value.discordId}</li>
                ))}
              </ol>
            </div>
          </div>
          <div className='col-12 col-md-6'>
            <div className='timmernew'>
              <div className='ho'>
                <h4>{hour ?
                hour
                :
                0
                
              }</h4>
                <h6>Hour</h6>
              </div>
              <div className='ho'>
                <h4>{min ?
                min
                :
                0
                
                }</h4>
                <h6>Minute</h6>
              </div>
              <div className='ho'>
                <h4>{sec ?
                sec:
                0
              }</h4>
                <h6>Sec</h6>
              </div>
            </div>
            <h3>Winners</h3>
            <div className=''>
              {winner.map((value, index) => (
                <li key={index}>{value.discordId}</li>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhiteList;
