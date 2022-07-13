import React from "react";
import "./NavigationBar.scss";
import logo from "../../assets/nav-logo.png";
import hamburger from "../../assets/hamburger.png";
import { Link } from "react-scroll";
import { NavLink } from "react-router-dom";
const NavigationBar = ({ home }) => {
  return (
    <nav className="navbar navbar-expand-xl navbar-light">
      <div className="container">
        <NavLink exact to="/">
          <span className="navbar-brand">
            <img src={logo} alt="odd waffles" className="img-fluid me-2" /> odd
            waffles
          </span>
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <img
            src={hamburger}
            alt="hamburger"
            className="img-fluid hamburger"
          />
        </button>
        {home && (
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink to="/raffle" className="nav-link">
                  Clicker
                </NavLink>
              </li>
              <li className="nav-item">
                <Link
                  to="rarity"
                  spy={true}
                  smooth={true}
                  offset={50}
                  duration={500}
                  className="nav-link"
                >
                  rarity
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="roadmap"
                  spy={true}
                  smooth={true}
                  offset={50}
                  duration={500}
                  className="nav-link"
                >
                  no roadmap
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="team"
                  spy={true}
                  smooth={true}
                  offset={50}
                  duration={500}
                  className="nav-link"
                >
                  team
                </Link>
              </li>
              {/* <li className='nav-item'>
              <button className='blue-gradient cta ms-xl-4 mb-4 mb-xl-0'>
                Connect to metamask
              </button>
            </li> */}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavigationBar;
