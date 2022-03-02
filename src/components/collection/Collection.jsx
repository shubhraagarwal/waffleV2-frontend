import React from 'react';
import './Collection.scss';
import waffle1 from '../../assets/waffle5.jpg';
import waffle2 from '../../assets/waffle9.png';
import waffle3 from '../../assets/waffle1.png';
import waffle4 from '../../assets/waffle7.png';
import waffle5 from '../../assets/waffle8.png';
import waffle6 from '../../assets/waffle2.png';

const Collection = () => {
  const data = [
    waffle1,
    waffle2,
    waffle3,
    waffle4,
    waffle5,
    waffle6,
    waffle1,
    waffle2,
    waffle3,
    waffle4,
    waffle5,
    waffle6,
    waffle1,
    waffle2,
    waffle3,
    waffle4,
    waffle5,
    waffle6,
  ];
  return (
    <div className='collection'>
      {data.map((value, index) => (
        <img src={value} alt={value} className='img-fluid' key={index} />
      ))}
    </div>
  );
};

export default Collection;
