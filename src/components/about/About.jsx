import React from "react";
import "./About.scss";
import waffle1 from "../../assets/waffle1.png";
import waffle2 from "../../assets/waffle2.png";
import waffle3 from "../../assets/waffle3.png";
import waffle4 from "../../assets/waffle4.png";
import discord from "../../assets/discord.svg";
import twitter from "../../assets/twitter.png";

const About = () => {
  const waffles = [waffle1, waffle2, waffle3, waffle4];
  return (
    <section
      className="about container-fluid js-color-stop"
      data-background-color="rgb(32, 202, 172)"
    >
      <h2 className="animate__animated animate__fadeIn animate__slower animate__delay-2s">
        Welcome to the <br /> Bakery!!!
      </h2>
      <div className="container">
        <div className="row g-5">
          <div className="col-12 col-md-5">
            <div className="row g-5 image-grid">
              {waffles.map((value, index) => (
                <div className="col-6" key={index}>
                  <img
                    src={value}
                    alt={value}
                    className="img-fluid animate__animated animate__fadeIn animate__slower animate__delay-1s"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="col-12 col-md-7 align-center">
            <div className="content">
              <h3 className="animate__animated animate__fadeIn animate__delay-1s">
                8,888 unique waffles
              </h3>
              <p data-aos="fade">
                The Odd Waffles are aiming to create the best possible Free NFT
                MINT in the NFT space. With that in mind we will be making our
                art in public domain for our Waffles/community members to
                utilize. Our community will be launching on Ethereum with 8888
                randomly generated Waffles to be minted.
              </p>
              <div className="btn-group">
                <a
                  href="https://discord.gg/oddwaffles"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button
                    className="red-gradient"
                    data-aos="fade"
                    data-aos-duration="4000"
                  >
                    <img src={discord} alt="discord" className="me-2" /> come
                    bake with us
                  </button>
                </a>
                <a
                  href="https://mobile.twitter.com/TheOddWaffles"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button
                    className="red-gradient"
                    data-aos="fade"
                    data-aos-duration="4000"
                  >
                    <img src={twitter} alt="twitter" className="me-2" /> follow
                    us
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

// https://mobile.twitter.com/TheOddWaffles
