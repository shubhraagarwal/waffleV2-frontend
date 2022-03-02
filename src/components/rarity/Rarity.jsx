import React from 'react';
import './Rarity.scss';
import Collection from '../collection/Collection';
import RaritySlider from '../rarity-slider/RaritySlider';

const Rarity = () => {
  return (
    <div className='rarity'>
      <h2>Rarity</h2>
      <RaritySlider />
      <Collection />
    </div>
  );
};

export default Rarity;
