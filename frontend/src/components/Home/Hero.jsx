import React from 'react';
import OurMenu from './Menu';
const Hero = () => {
  return (
    <section className="relative w-full h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 flex items-center justify-center">
      <div className="text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-6xl md:text-7xl font-bold text-gray-800 mb-6">
          Welcome to Our Cafe
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 mb-8">
          Experience the finest coffee and warmest atmosphere
        </p>
        <button onClick={OurMenu} className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:scale-105 shadow-lg">
          Explore Menu
          {/* <OurMenu/> */}
        </button>
      </div>
    </section>
  );
};

export default Hero;