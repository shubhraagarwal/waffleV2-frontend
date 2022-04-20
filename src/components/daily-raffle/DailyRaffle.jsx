// import ParallaxMousemove from 'react-parallax-mousemove';
import { useWeb3React } from "@web3-react/core";
import axios from "axios";
import React, { useCallback, useEffect, useRef, useState } from "react";
import ReactCanvasConfetti from "react-canvas-confetti";
// import JoinDiscord from '../modal/JoinDiscord';
import close from "../../assets/close.svg";
import audio from "../../assets/confetti sound.mp3";
import eyes from "../../assets/eyes2.png";
import face from "../../assets/face.png";
import logo from "../../assets/logo.png";
import mouth from "../../assets/mouth.png";
import useAuth from "../../hooks/useAuth";
import { API_URL_RAFFLE } from "../../utils/ApiURL";
import CountDownBar from "../countdown-bar/CountDownBar";
import WhiteList from "../whitelist/WhiteList";
import "./DailyRaffle.scss";
import { toast } from "react-toastify";
import freeze from "../../assets/ICE_HEAD.png";
const canvasStyles = {
  position: "fixed",
  pointerEvents: "none",
  width: "100%",
  height: "100%",
  top: 0,
  left: 0,
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
        particleCount: Math.floor(200 * particleRatio),
      });
  }, []);
  const fire = useCallback(() => {
    makeShot(0.25, {
      spread: 26,
      startVelocity: 55,
    });

    makeShot(0.2, {
      spread: 60,
    });

    makeShot(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });

    makeShot(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });

    makeShot(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  }, [makeShot]);
  // const [audio] = useState(new Audio({WaffleSound}));

  const [bounce, setBounce] = useState(0);
  const [count, setcount] = useState(0);
  const [inView, setInView] = useState(false);
  const { account } = useWeb3React();
  const { login, logout } = useAuth();
  const [winner, setwinner] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [discordid, setdiscordid] = useState("");
  const [day, setDay] = useState(0);
  const [syrCount, setsyrCount] = useState(0);
  const [entryTime, setEntryTime] = useState(0);
  // const { Time } = PresaleStartEnd();
  const [hrs, setHour] = useState(0);
  const [min, setMin] = useState(0);
  const [sec, setSec] = useState(0);
  const [hour, setHours] = useState(null);
  const [minute, setMinutes] = useState(null);
  const [second, setSeconds] = useState(null);

  let temp = [];
  let winr = [];
  const syrupSub = () => {
    if (syrCount > 0) {
      if (syrCount >= 8) {
        setsyrCount(syrCount - 8);
      }
    }
  };
  const onSound = () => {
    new Audio(audio).play();
  };
  var userwhitelist = winner?.find(
    (e) => e?.walletAddress === account?.toLowerCase()
  );

  function timer() {
    var time = new Date(syrCount?.enteryTime);
    var now = new Date();
    var diff = time.getTime() - now.getTime();
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

  const handleClick = () => {
    setBounce(bounce + 1);
    const d = new Date();
    const t = d.getTime() + 500000;
    //let tts = date.now()
    setcount(count + 1);
    console.log(entryTime + " YEH entry time hai handle click ka");
    console.log("clicked", t);
    if (count === 500) {
      axios
        .post(
          `${API_URL_RAFFLE}/api/v1/users/addViewsOfWaffleCount`,
          { walletAddress: account, entryTime: t },
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
            },
          }
        )
        .then((response) => {
          getuser();
          console.log(response.data.status);
          window.location.reload();
        })
        .catch((err) => {
          console.log("error we get");
          return false;
        });
    } else {
      console.log("else");
    }
  };
  const mouseEnter = () => {
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
      } else {
        login("injected");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const adduser = () => {
    console.log(account);
    localStorage.setItem("wallet", account);
    axios
      .post(
        `${API_URL_RAFFLE}/api/v1/users/addUser`,
        { walletAddress: account },
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        }
      )

      .then((response) => {
        console.log("added");
      })
      .catch((err) => {
        return false;
      });
  };
  const getuser = () => {
    // setOpens(true)
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
        let res = Object.values(response.data[0]);
        console.log(res);

        setsyrCount(res[3]);
        setEntryTime(res[5]);
        console.log(res[5] + " YEH ENTRY TIME HAI DAILY RAFFLE KA");
        temp.push(res[0], res[1], res[2], res[3], res[4], res[5], res[6]);
      })
      .catch((err) => {
        console.log(err, "err inside getUser");
        return false;
      });
  };
  const getallwinner = () => {
    // setOpens(true)

    axios
      .get(`${API_URL_RAFFLE}/api/v1/users/getAllWinner`, {
        "Access-Control-Allow-Origin": "*",
      })
      .then((response) => {
        // console.log("get all user", response)
        // setallusers(response.data.data)
        console.log(response.data);

        winr.push(
          response.data[0],
          response.data[1],
          response.data[2],
          response.data[3],
          response.data[4],
          response.data[5],
          response.data[6],
          response.data[7],
          response.data[8],
          response.data[9]
        );
        setwinner(winr);
      })
      .catch((err) => {
        // setOpens(false)
        // toast.warning('Error While getting user Lottery', {
        //   position: "top-right",
        //   autoClose: 3000,
        // });
        return false;
      });
  };

  useEffect(() => {
    if (account) {
      adduser();
      getuser();

      getallwinner();
    }
  }, [account]);

  const inputadd = (e) => {
    const value = e.target.value;
    setdiscordid(value);
  };

  const handleConnectmodal = () => {
    setShowModal(!showModal);
  };
  // const handledisconnectmodal = () => {
  //   setShowModal(showModal);
  // }

  useEffect(() => {
    {
      syrCount?.discordId === null
        ? setShowModal(!showModal)
        : setShowModal(showModal);
    }
  }, [syrCount, account]);

  const handleModalClose = () => {
    setShowModal(false);
  };

  const dsicordenterance = () => {
    // setOpens(true)

    localStorage.setItem("discord_id", discordid);
    axios
      .post(`${API_URL_RAFFLE}/api/v1/users/addDiscordId`, {
        walletAddress: account,
        discordid: discordid,
      })
      .then((response) => {
        // setsyrup(response.data.user)
        console.log(response.data);
        setShowModal(false);
        getuser();
        toast.success("Successfully Added Discord ID", {
          position: "top-right",
          autoClose: 8000,
        });
        // console.log("getuser", response)
      })
      .catch((err) => {
        // setOpens(false)
        toast.warning("Error While adding Discord ID", {
          position: "top-right",
          autoClose: 3000,
        });
        return false;
      });
  };
  let hours = localStorage.getItem("entryTimeInHours");
  let minutes = localStorage.getItem("entryTimeInMinutes");
  let seconds = localStorage.getItem("entryTimeInSeconds");

  return (
    <>
      <section
        className="container-fluid daily-raffle"
        id="raffle"
        onMouseEnter={mouseEnter}
        onMouseLeave={mouseLeave}
      >
        {showModal && (
          <div className="modal-container">
            <div className="content-wrapper">
              <img
                src={close}
                alt="close"
                className="close"
                onClick={handleModalClose}
              />
              {account ? (
                <>
                  <h3>Enter Your Discord id</h3>
                  <input
                    type="text"
                    onChange={inputadd}
                    placeholder="user#2232"
                  />
                  <button onClick={dsicordenterance}>Submit</button>
                </>
              ) : (
                <>
                  <h3>Please Connect Metamask First</h3>
                  <button onClick={connectMetaMask}>Connect MetaMask</button>
                </>
              )}
            </div>
          </div>
        )}

        <div className="countsclick">
          <div className="countsinner">
            <h3>{count === 0 ? "WAFFLE CLICKER" : count}</h3>
          </div>
        </div>

        <div className="container text-center">
          <div className="top-bar">
            <div className="d-flex justify-content-center justify-content-md-start flex-column">
              <div className="balance" data-aos="fade">
                <img
                  src="https://media.discordapp.net/attachments/937551194837110804/943235118775042149/unknown.png"
                  alt="syrCount"
                  id="syrup"
                  className="img-fluid ms-2"
                />

                {syrCount}
              </div>
              <CountDownBar />
            </div>
            <div className="d-flex justify-content-center justify-content-md-end flex-column">
              {account ? (
                <button
                  className="blue-gradient"
                  onClick={connectMetaMask}
                  data-aos="fade"
                >
                  <div className="connect"></div> Disconnect Wallet
                </button>
              ) : (
                <button
                  className="blue-gradient"
                  onClick={handleConnectmodal}
                  data-aos="fade"
                >
                  <div className="disconnect"></div> Connect Wallet
                </button>
              )}
              {userwhitelist?.walletAddress && (
                <div className="status success">You are Whitelisted</div>
              )}
            </div>
          </div>

          {/* raffle for pc  */}

          {hours === "00" && minutes === "00" && seconds === "00" ? (
            <div className="mouse_move d-none d-xl-block">
              <div
                className="face-container"
                onClick={handleClick}
                onAnimationEnd={() => setBounce(0)}
                bounce={bounce}
              >
                <div
                  className="face-fig"
                  onClick={() => {
                    if (count > 0) {
                      if ((count + 1) % 500 === 0) {
                        setsyrCount(syrCount + 4);
                        fire();
                        onSound();
                      }
                    }
                  }}
                >
                  <img
                    src={face}
                    alt="logo"
                    id="img1"
                    value="5"
                    onClick={() => {
                      if (count > 0) {
                        if ((count + 1) % 500 === 0) {
                          setsyrCount(syrCount + 4);
                        }
                      }
                    }}
                  />

                  <img
                    src={eyes}
                    alt="logo"
                    id="img1"
                    className={
                      inView ? "mouse parts eyes" : "parts eyes static"
                    }
                    value="3"
                    onClick={() => {
                      if (count > 0) {
                        if ((count + 1) % 500 === 0) {
                          setsyrCount(syrCount + 4);
                        }
                      }
                    }}
                  />
                  <img
                    src={mouth}
                    alt="logo"
                    id="img1"
                    className="parts"
                    onClick={() => {
                      if (count > 0) {
                        if ((count + 1) % 500 === 0) {
                          setsyrCount(syrCount + 4);
                        }
                      }
                    }}
                  />
                </div>
                <ReactCanvasConfetti
                  refConfetti={getInstance}
                  style={canvasStyles}
                />
              </div>
            </div>
          ) : (
            <div>
              <img src={freeze} alt="freeze" />
            </div>
          )}

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
          {hours == 0 && minutes == 0 && seconds == 0 ? (
            <div className="d-xl-none">
              <img
                src={logo}
                alt="logo"
                className="mob-face img-fluid"
                onClick={handleClick}
                onAnimationEnd={() => setBounce(0)}
                bounce={bounce}
              />
            </div>
          ) : null}
        </div>
      </section>
      <WhiteList fun={syrupSub} />
    </>
  );
};

export default DailyRaffle;
