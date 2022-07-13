import React from "react";
import "./Specs.scss";
import waffle from "../../assets/waffle5.jpg";
import discord from "../../assets/discord.svg";
import twitter from "../../assets/twitter.png";

const Specs = () => {
  return (
    <section className="container-fluid specs">
      <h2 className="d-none d-md-block">The Specs</h2>
      <div className="container">
        <div className="row g-5">
          <div className="col-12 col-md-6 order-1 order-md-0">
            <h2 className="d-md-none mob-heading">The Specs</h2>
            <div className="content" data-aos="fade">
              <p>
                Each odd waffle is unique and programmatically generated from
                over 170 possible traits, including expression, headwear,
                clothing, and more. All waffles are dope, but some are rarer
                than others. The waffles are stored as ERC-721 tokens on the
                Ethereum blockchain and hosted on IPFS. (See Record and Proof.)
                Purchasing an odd waffle costs 0 ETH + GAs To access
                members-only areas such as THE bakery, waffleholders will need
                to be signed into their Metamask Wallet.
              </p>
              <div className="btn-group">
                <a
                  href="https://discord.gg/oddwaffles"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="blue-gradient">
                    <img
                      src={discord}
                      alt="discord"
                      className="img-fluid me-2"
                    />{" "}
                    discord
                  </button>
                </a>
                <a
                  href="https://mobile.twitter.com/TheOddWaffles"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="blue-gradient">
                    <img
                      src={twitter}
                      alt="twitter"
                      className="img-fluid me-2"
                    />{" "}
                    Twitter
                  </button>
                </a>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 text-end order-0 order-md-1">
            <img
              src={waffle}
              alt="waffle"
              className="img-fluid"
              data-aos="fade-up"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Specs;
