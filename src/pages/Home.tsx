import React from 'react';
import Hero from '../components/Hero';
import Body from '../components/Body';

const Home: React.FC = () => {
  return (
    <div className="animate-fade-in">
      <Hero />
      <Body />
    </div>
  );
};

export default Home;