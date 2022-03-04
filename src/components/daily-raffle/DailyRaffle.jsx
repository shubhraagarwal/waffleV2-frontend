
import React, { useState, useEffect, useCallback, useRef } from 'react';
import ReactCanvasConfetti from "react-canvas-confetti";
import './DailyRaffle.scss';
import logo from '../../assets/logo.png';
import syrup from '../../assets/syrup.png';
import face from '../../assets/face.png';
import eyes from '../../assets/eyes2.png';
import mouth from '../../assets/mouth.png';
import axios from "axios";
import { toast } from "react-toastify";
import { API_URL } from "../../utils/ApiURL";
import CountDownBar from '../countdown-bar/CountDownBar';
// import ParallaxMousemove from 'react-parallax-mousemove';
import { useWeb3React } from "@web3-react/core";
import useAuth from "../../hooks/useAuth";
// import JoinDiscord from '../modal/JoinDiscord';
import close from '../../assets/close.svg';
import { number } from 'yup';
import WhiteList from '../whitelist/WhiteList';
import audio from '../../assets/confetti sound.mp3'
const canvasStyles = {
  position: "fixed",
  pointerEvents: "none",
  width: "100%",
  height: "100%",
  top: 0,
  left: 0
};

const DailyRaffle = () => {
  const refAnimationInstance = useRef(null);

  const getInstance = useCallback((instance) => {
    refAnimationInstance.current = instance;
  }, []);

  const makeShot = useCallback((particleRatio, opts) => {
    refAnimationInstance.current &&
      refAnimationInstance.current({
        ...opts,
        origin: { y: 0.7 },
        particleCount: Math.floor(200 * particleRatio)
      });
  }, []);
  const fire = useCallback(() => {
    makeShot(0.25, {
      spread: 26,
      startVelocity: 55
    });

    makeShot(0.2, {
      spread: 60
    });

    makeShot(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8
    });

    makeShot(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2
    });

    makeShot(0.1, {
      spread: 120,
      startVelocity: 45
    });
  }, [makeShot]);
  // const [audio] = useState(new Audio({WaffleSound}));
  
  const [bounce, setBounce] = useState(0);
  const [lastClick, setLastClick] = useState(0);
  const [syrup, setsyrup] = useState(0);
  const [count, setcount] = useState(0);
  const [inView, setInView] = useState(false);
  const { account } = useWeb3React();
  const { login, logout } = useAuth();
  const [winner, setwinner] = useState([]);
  const [whitelist, setwhitelist] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [discordid, setdiscordid] = useState('');
  const [day, setDay] = useState(0);
  const [syrCount, setsyrCount] = useState(0);
  // const { Time } = PresaleStartEnd();
  const [hour, setHour] = useState(0);
  const [min, setMin] = useState(0);
  const [sec, setSec] = useState(0);

const syrupSub = () =>{
  
    if(syrCount > 0){
  if(syrCount >= 8){
    setsyrCount(syrCount - 8);
  }
}
  
  
}
const onSound = () => {
  new Audio(audio).play();
}
  


  // let userwhitelist
  // const PromotedCoins = winner?.map((elem) => {
  //   console.log("WINNER",elem)
  //  var  userwhitelist = elem.winner?.find(e => e.walletAddress === account)
  //  console.log("userwhitelist",userwhitelist)
  //   // setwhitelist(userwhitelist)
  //   // console.log("winners",elem?.walletAddress)
  // console.log("account",account)
  // });
  // console.log("bbbbbbbbbbbbbbbbbbbbbbbbbb",winner[4].walletAddress)
   var  userwhitelist = winner?.find(e => e?.walletAddress == account?.toLowerCase())
  //  console.log("userwhitelist",userwhitelist?.walletAddress)


  // console.log("winners",winner?.walletAddress[0])


  function timer() {
    var time = new Date(syrup?.enteryTime)
    var now = new Date()
    var diff = time.getTime() - now.getTime()
    if (diff <= 0) {
      return;
    }
    // console.log("dsaf", typeof diff)
    // if (typeof diff == number) {
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
    // }
  }
  setInterval(() => {
    timer()
  }, 1000);

  // console.log("day", day)

  const handleClick = () => {
    setBounce(bounce+1);
    const d = new Date();
    const Nowtime = d.getTime();
    const t = (d.getTime() + 500000);
    // console.log("time",t)
    // console.log("time",t + 43200000)

    // if (t - lastClick < 500) {
    //   setBounce(2);
    // } else {
    //   if (bounce === 1) {
    //     setBounce(0);
    //   } else {
    //     setBounce(1);
    //   }
    // }
    // setLastClick(t);
    if (syrup?.enteryTime < Nowtime) {
      setcount(count + 1)
    }
    if (count == syrup?.initialcount) {
      axios.post(`${API_URL}/v1/users/addViewsOfWaffleCount`, { walletAddress: account, enteryTime: t })
        .then((response) => {
          // setOpens(false)
          window.location.reload();
          getuser();
        })
        .catch((err) => {
          // setOpens(false)
          // toast.warning('Error While getting user Lottery', {
          //   position: "top-right",
          //   autoClose: 3000,
          // });
          console.log("error we get")
          return false;
        })
    }
    else {
      console.log("else")
    }

  };
  // console.log("counting",count)
  const mouseEnter = () => {
    // alert('in');
    !inView && setInView(true);
  };
  const mouseLeave = () => {
    inView && setInView(false);
  };

  const connectMetaMask = async () => {
    try {
      localStorage.setItem("injected", "injected");
      if (account) {
        logout();
        // close();
      } else {
        login("injected");
        // console.log("new-account")
        // close();
      }
    } catch (e) {
      console.log(e);
    }
  };

  const adduser = () => {
    // setOpens(true)
    axios.post(`${API_URL}/v1/users/addUser`, { walletAddress: account })
      .then((response) => {
        // console.log("lotetry", response)
        window.location.reload();
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
  const getuser = () => {
    // setOpens(true)
    axios.post(`${API_URL}/v1/users/getUser`, { walletAddress: account })
      .then((response) => {
        setsyrup(response.data.user)
        setcount(response.data.user.waffleCount)
        // console.log("count database")
        // console.log("coutn ===========", typeof response.data.user.waffleCount)
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
        // console.log("get all user", response)
        // setallusers(response.data.data)
        setwinner(response.data.data)
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
    if (account) {
      adduser();
      getuser();
      getallwinner();
    }
     
  }, [account]);

  const inputadd = (e) => {
    const value = e.target.value
    setdiscordid(value)
  };

  const handleConnectmodal = () => {
    setShowModal(!showModal);
  }
  // const handledisconnectmodal = () => {
  //   setShowModal(showModal);
  // }

  useEffect(() => {
    
    {syrup?.discordId == null ?
      setShowModal(!showModal)
      :
      setShowModal(showModal)
    }
  }, [syrup, account]);
  

  const handleModalClose = () => {
    setShowModal(false);
  };

  const dsicordenterance = () => {
    // setOpens(true)
    axios.post(`${API_URL}/v1/users/addDiscordId`, { walletAddress: account, discordId: discordid })
      .then((response) => {
        // setsyrup(response.data.user)
        setShowModal(false);
        getuser();
        toast.success('Successfully Added Discord ID', {
          position: "top-right",
          autoClose: 8000,
        });
        // console.log("getuser", response)
      })
      .catch((err) => {
        // setOpens(false)
        toast.warning('Error While adding lottery', {
          position: "top-right",
          autoClose: 3000,
        });
        return false;
      })
  }


  


  return (
    <>
    <section
      className='container-fluid daily-raffle'
      id='raffle'
      onMouseEnter={mouseEnter}
      onMouseLeave={mouseLeave}
    >

      {showModal &&
        <div className='modal-container'>
          <div className='content-wrapper'>
            <img
              src={close}
              alt='close'
              className='close'
              onClick={handleModalClose}
            />
            {account ?
              <>
                <h3>Enter Your Discord id</h3>
                <input type='text' type="text" onChange={inputadd} placeholder='user#2232' />
                <button onClick={dsicordenterance}>Submit</button></>
              :
              <>
                <h3>Please Connect Metamask First</h3>
                <button onClick={connectMetaMask}>Connect MetaMask</button>
              </>
            }
          </div>
        </div>
      }

     
      <div className='countsclick'>
      <div className='countsinner'>
        <h3>{count == 0 ?
          'WAFFLE CLICKER'
          :
          count
        }</h3>
      </div>
    </div>

      <div className='container text-center'>
        <div className='top-bar'>
          <div className='d-flex justify-content-center justify-content-md-start flex-column'>
            <div className='balance' data-aos='fade'>
              <img src={syrup} alt='syrup' className='img-fluid ms-2' />
            

    {syrCount}
          
            </div>
            <CountDownBar hour={hour} min={min} sec={sec} />
          </div>
          <div className='d-flex justify-content-center justify-content-md-end flex-column'>
            {account ? (
              <button className='blue-gradient' onClick={connectMetaMask} data-aos='fade'>
                <div className='connect'></div> Disconnect Wallet
              </button>
            ) : (
              <button className='blue-gradient' onClick={handleConnectmodal} data-aos='fade'>
                <div className='disconnect'></div> Connect Wallet
              </button>
            )}
            { userwhitelist?.walletAddress &&
              <div className='status success'>You are Whitelisted</div>
            }
          </div>
        </div>

        {/* raffle for pc  */}
        <div className='mouse_move d-none d-xl-block'>

          <div
            className='face-container'
            onClick={handleClick}
            onAnimationEnd={() => setBounce(0)}
            bounce={bounce}
          >
          <div className="face-fig" onClick={() =>{
            if(count>0){
              if((count+1)%5 == 0){
                setsyrCount(syrCount + 4)
                fire();
                onSound();
              }
              }
            }}>
            <img src={face} alt='logo' id='img1' value='5' onClick={() => {
              if(count>0){
            if((count+1)%5 == 0){
              setsyrCount(syrCount + 4)
            
            }
          }
          }
            }/>
          
            <img
              src={eyes}
              alt='logo'
              id='img1'
              className={inView ? 'mouse parts eyes' : 'parts eyes static'}
              value='3'
              onClick={() => {
           if(count > 0) {  
                if((count+1)%5 == 0){
                  setsyrCount(syrCount + 4)
                 
                }
              }
              }
                }/>
            <img src={mouth} alt='logo' id='img1' className='parts' onClick={() => {
              if(count > 0){
              if((count+1)%5 == 0){
                setsyrCount(syrCount + 4)
               
              }
            }
            }
              }/>
              </div>
              <ReactCanvasConfetti refConfetti={getInstance} style={canvasStyles} />
          </div>
        </div>

       
        {/* <div className='countsclick'>
          <div className='countsinner'>
            <h3>{count == 0 ?
              ''
              :
              count
            }</h3>
          </div>
        </div> */}
        {/* raffle for mobile  */}
        <div className='d-xl-none'>
          <img
            src={logo}
            alt='logo'
            className='mob-face img-fluid'
            onClick={handleClick}
            onAnimationEnd={() => setBounce(0)}
            bounce={bounce}
          />
        </div>
      </div>
    
    </section>
    <WhiteList  fun = {syrupSub}/>
    </>
  );
};

export default DailyRaffle;
