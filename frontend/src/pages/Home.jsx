import React from 'react';
import Hero from '../components/Home/Hero';
import Services from '../components/Home/Services';
import AboutUs from '../components/Home/AboutUs';
import BookingCTA from '../components/Home/BookingCTA';

const Home = () => {
  return (
    <>
      <Hero />
      <Services />
      <AboutUs />
      <BookingCTA />
    </>
  );
};

export default Home;