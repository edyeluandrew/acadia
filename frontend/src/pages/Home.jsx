import React from 'react';
import Hero from '../components/Home/Hero';
import Services from '../components/Home/Services';
import AboutUs from '../components/Home/AboutUs';
import MenuSection from '../components/Home/MenuSection'; // Add this import
// import BookingCTA from '../components/Home/BookingCTA';

const Home = () => {
  return (
    <>
      <Hero />
      <Services />
      <AboutUs />
      <MenuSection /> {/* Add the menu section here */}
      {/* <BookingCTA /> */}
    </>
  );
};

export default Home;