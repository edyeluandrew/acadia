import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Import your images as an array
import image1 from "../../assets/images/a.jpg";
import image2 from "../../assets/images/@.jpg";
import image3 from "../../assets/images/baa.jpg";

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: image1,
      title: "Welcome to Our Cafe",
      subtitle: "Experience the finest coffee and warmest atmosphere"
    },
    {
      image: image2,
      title: "Freshly Brewed Coffee",
      subtitle: "Handcrafted beverages made with love"
    },
    {
      image: image3,
      title: "Cozy Ambiance",
      subtitle: "Perfect spot for work or relaxation"
    }
    // Removed the 4th slide since hero4 doesn't exist
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentSlide]);

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Background Slides */}
      <div 
        className="absolute inset-0 transition-transform duration-1000 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        <div className="flex w-full h-full">
          {slides.map((slide, index) => (
            <div
              key={index}
              className="w-full h-full flex-shrink-0 relative"
            >
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/30"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full h-full flex items-center justify-center">
        <div className="text-center px-4 max-w-4xl mx-auto text-white">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 drop-shadow-lg">
            {slides[currentSlide].title}
          </h1>
          <p className="text-xl md:text-2xl mb-8 drop-shadow-md">
            {slides[currentSlide].subtitle}
          </p>
          <button 
            onClick={() => document.getElementById('menu').scrollIntoView({ behavior: 'smooth' })}
            className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
          >
            Explore Menu
          </button>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-white scale-125' 
                : 'bg-white/50 hover:bg-white/80'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;