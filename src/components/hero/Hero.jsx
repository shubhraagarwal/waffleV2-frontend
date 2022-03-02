import React from 'react';
import heroImage from '../../assets/hero.jpeg';

const Hero = () => {
  return (
    <div>
      <img src={heroImage} alt='odd waffles' className='img-fluid w-100' />
    </div>
  );
};

export default Hero;
