import React from 'react';
import Hero from '../../components/hero/Hero';
import About from '../../components/about/About';
import Specs from '../../components/specs/Specs';
import Roadmap from '../../components/roadmap/Roadmap';
import Team from '../../components/team/Team';
import Community from '../../components/community/Community';
import Rarity from '../../components/rarity/Rarity';
import NavigationBar from '../../components/navigationbar/NavigationBar';

const Home = () => {
  return (
    <>
      <NavigationBar home />
      <Hero />
      <About />
      <Specs />
      <Roadmap />
      <Rarity />
      <Team />
      <Community />
    </>
  );
};

export default Home;
