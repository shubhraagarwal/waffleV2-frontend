import React from 'react';
import Slider from 'react-slick';
import './RaritySlider.scss';
import background from '../../assets/webtraits/pink-bg.png';
import skins from '../../assets/face.png';
import toppings from '../../assets/webtraits/chocolate-liquid.png';
import hats from '../../assets/webtraits/hat.png';
import mouth from '../../assets/mouth.png';
import eyes from '../../assets/eyes1.png';
import chain from '../../assets/webtraits/gold-chain.png';
import jacket from '../../assets/webtraits/fur-coat.png';

const RaritySlider = () => {
  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4.5,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1224,
        settings: {
          slidesToShow: 3.5,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 1080,
        settings: {
          slidesToShow: 2.5,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          autoplaySpeed: 1000,
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const data = [
    {
      image: background,
      title: 'BACKGROUND',
      value: '13+',
    },
    {
      image: skins,
      title: 'Skins',
      value: '17+',
    },
    {
      image: toppings,
      title: 'Toppings',
      value: '18+',
    },
    {
      image: hats,
      title: 'Hats',
      value: '34+',
    },
    {
      image: mouth,
      title: 'Mouths',
      value: '19+',
    },
    {
      image: eyes,
      title: 'Eyes',
      value: '23+',
    },
    {
      image: chain,
      title: 'Chains',
      value: '6+',
    },
    {
      image: jacket,
      title: 'Jackets',
      value: '29+',
    },
  ];
  return (
    <div className='rarity-slider'>
      <Slider {...settings}>
        {data.map(({ image, title, value }, index) => (
          <div key={index} className='px-4'>
            <div className='rarity-card'>
              <div className='img-container'>
                <img src={image} alt={title} className='img-fluid' />
              </div>
              <h4>{title}</h4>
              <p>{value}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default RaritySlider;
