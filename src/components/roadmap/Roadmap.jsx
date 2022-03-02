import React from 'react';
import './Roadmap.scss';

const Roadmap = () => {
  const data = [
    {
      phase: 0,
      delay: '0',
      content: (
        <ul>
          <li>Spread awareness of the Odd Waffles</li>
          <li>Presale contest for early members</li>
          <li>We will be doing 1/1 Waffle giveaways to the community</li>
          <li>Waffleclicker created to start stacking your Syrup</li>
          <li>Exclusive giveaways for Syrup holders</li>
        </ul>
      ),
      completed: true,
    },
    {
      phase: 1,
      delay: '200',
      content: (
        <ul>
          <li>Customized banners for all Odd Waffle holders</li>
          <li>We will be collabing with other communities</li>
          <li>100k Charity donation</li>
        </ul>
      ),
    },
    {
      phase: 2,
      delay: '400',
      content: (
        <ul>
          <li>
            Welcome to the Toaster. This will be a unique asset to the Waffles
            where you can “toast” two Waffles and select the traits you would
            like to have on one Waffle.
          </li>
          <li>Butter token release</li>
        </ul>
      ),
    },
    {
      phase: 3,
      delay: '600',
      content: (
        <ul>
          <li>
            Corrupted Waffles are created start passively collecting your Butter
            tokens
          </li>
          <li>Odd Waffle Merchandise drop</li>
          <li>Community will vote on what is next for Odd Waffles</li>
        </ul>
      ),
    },
  ];
  return (
    <section className='container-fluid roadmap' id='roadmap'>
      <div className='container'>
        <h2>Roadmap</h2>
        <div className='row g-5'>
          {data.map(({ phase, content, completed, delay }, index) => (
            <div className='col-12 col-md-6 col-xl-3' key={index}>
              <div
                className={`roadmap-card ${completed && 'active'}`}
                data-aos='fade-up'
                data-aos-delay={delay}
              >
                <h3>Phase {phase}</h3>
                {content}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Roadmap;
