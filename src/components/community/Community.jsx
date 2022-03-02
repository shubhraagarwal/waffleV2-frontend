import React from 'react';
import './Community.scss';
import community1 from '../../assets/community1.png';
import community2 from '../../assets/community2.png';
import twitter from '../../assets/twitter.png';

const Community = () => {
  return (
    <section className='container-fluid community'>
      <div className='container'>
        <div className='row'>
          <div className='col-12 col-md-6'>
            <div className='content' data-aos='fade'>
              <h1>Join the Community</h1>
              <p>
                Join us to get the news as soon as possible and <br /> follow
                our latest announcements.
              </p>
              <a
                href='https://mobile.twitter.com/TheOddWaffles'
                target='_blank'
                rel='noopener noreferrer'
              >
                <button className='red-gradient'>
                  <img src={twitter} alt='twitter' className=' me-2' /> Twitter
                </button>
              </a>
            </div>
          </div>
          <div className='col-12 col-md-6 d-flex align-items-end'>
            <div className='community-img' data-aos='fade-up'>
              <img src={community1} alt='community' className='img-fluid c1' />
              <img src={community2} alt='community' className='img-fluid c2' />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Community;
