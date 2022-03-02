import React from 'react';
import './Footer.scss';
import logo from '../../assets/nav-logo.png';
import discord from '../../assets/discord.svg';
import twitter from '../../assets/twitter.png';
import { Link } from 'react-router-dom';
const Footer = () => {
  return (
    <footer className='container-fluid footer'>
      <div className='container'>
        <div className='row'>
          <div className='col-12 col-lg-4 order-2 order-lg-0 d-flex align-items-end justify-content-center mt-4 mt-lg-0'>
            <div className='copyright'>
              <p className='text-center text-lg-start'>Starlight Labs</p>
              <Link to='/terms-and-conditions'>
                <p className='text-center text-lg-start'>
                  ©2022 odd waffles. All rights reserved.
                </p>
              </Link>
            </div>
          </div>
          <div className='col-12 col-lg-4 order-0 order-lg-1'>
            <div className='my-3'>
              <img src={logo} alt='odd waffles' className='img-fluid mb-3' />
              <h5>Odd Waffles</h5>
            </div>
          </div>
          <div className='col-12 col-lg-4 order-1 order-lg-2 d-flex align-items-center justify-content-center justify-content-lg-end'>
            <div className='d-flex'>
              <a
                href='https://discord.gg/oddwaffles'
                target='_blank'
                rel='noopener noreferrer'
              >
                <button className='blue-gradient'>
                  <img src={discord} alt='discord' />
                </button>
              </a>
              <a
                href='https://mobile.twitter.com/TheOddWaffles'
                target='_blank'
                rel='noopener noreferrer'
              >
                <button className='blue-gradient'>
                  <img src={twitter} alt='twitter' />
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
