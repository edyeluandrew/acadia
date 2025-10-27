import React, { useState, useEffect } from 'react';
import { Coffee, Utensils, BedDouble, ArrowRight } from 'lucide-react';

const Hero = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const images = [
    {
      url: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1920&h=1080&fit=crop&q=80',
      title: 'Welcome to',
      highlight: 'Numba Cafe',
      description: 'Experience the perfect blend of artisan coffee and boutique hospitality nestled in the heart of Acadia.',
      cards: [
        { title: "Artisan Coffee", description: "Freshly roasted beans, expertly brewed", icon: <Coffee className="w-8 h-8" /> },
        { title: "Boutique Rooms", description: "Luxurious comfort with personal touch", icon: <BedDouble className="w-8 h-8" /> },
        { title: "Acadia Views", description: "Stunning natural surroundings", icon: <ArrowRight className="w-8 h-8" /> }
      ]
    },
    {
      url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&h=1080&fit=crop&q=80',
      title: 'Luxury Meets',
      highlight: 'Comfort',
      description: 'Indulge in our elegantly designed rooms with premium amenities and breathtaking views of nature.',
      cards: [
        { title: "Premium Suites", description: "Designed for ultimate relaxation", icon: <BedDouble className="w-8 h-8" /> },
        { title: "Modern Amenities", description: "Everything you need and more", icon: <Coffee className="w-8 h-8" /> },
        { title: "24/7 Service", description: "We're here whenever you need us", icon: <Utensils className="w-8 h-8" /> }
      ]
    },
    {
      url: 'https://images.unsplash.com/photo-1571863533956-01c88e79957e?w=1920&h=1080&fit=crop&q=80',
      title: 'Culinary',
      highlight: 'Excellence',
      description: 'Savor gourmet dining experiences crafted by expert chefs using the finest local ingredients.',
      cards: [
        { title: "Farm to Table", description: "Fresh, locally sourced ingredients", icon: <Utensils className="w-8 h-8" /> },
        { title: "Expert Chefs", description: "Culinary masters at work", icon: <Coffee className="w-8 h-8" /> },
        { title: "Fine Dining", description: "An unforgettable experience", icon: <BedDouble className="w-8 h-8" /> }
      ]
    }
  ];

  // Pop animation transition
  useEffect(() => {
    const interval = setInterval(() => {
      // Start pop-out animation
      setIsVisible(false);
      
      // Change image after pop-out completes
      setTimeout(() => {
        setCurrentImage((prev) => (prev + 1) % images.length);
        // Start pop-in animation
        setIsVisible(true);
      }, 300);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  const handleImageChange = (index) => {
    setIsVisible(false);
    setTimeout(() => {
      setCurrentImage(index);
      setIsVisible(true);
    }, 300);
  };

  const handleBookNowClick = () => {
    console.log('Book now clicked');
  };

  const handleExploreMenuClick = () => {
    console.log('Explore menu clicked');
  };

  return (
    <section id="home" className="relative w-full h-screen flex items-center overflow-hidden pt-20 md:pt-24">
      {/* Background with Pop Animation */}
      <div className="absolute inset-0 z-0 w-full h-full">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full transition-all duration-500 ${
              index === currentImage 
                ? isVisible 
                  ? 'opacity-100 scale-100' 
                  : 'opacity-0 scale-110'
                : 'opacity-0 scale-100'
            }`}
          >
            <img 
              src={image.url} 
              alt={`Background ${index + 1}`}
              className="w-full h-full object-cover"
              loading="eager"
            />
            {/* Gradient overlay for better text visibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/60" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />
          </div>
        ))}
      </div>

      {/* Image Selector Dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-40 flex space-x-3">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => handleImageChange(index)}
            className={`w-4 h-4 rounded-full transition-all duration-300 transform hover:scale-125 ${
              index === currentImage 
                ? 'bg-yellow-400 scale-125 shadow-lg shadow-yellow-400/50' 
                : 'bg-white/50 hover:bg-white/80'
            }`}
            aria-label={`Select image ${index + 1}`}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 relative z-30 w-full">
        <div className="max-w-4xl">
          {/* Main Title with Pop Animation */}
          <div className={`transform transition-all duration-500 ${
            isVisible ? 'scale-100 opacity-100' : 'scale-105 opacity-0'
          }`}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-4 sm:mb-6 leading-tight tracking-tight">
              {images[currentImage].title}
              <span className="block bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent mt-2 sm:mt-4 mb-4 sm:mb-6">
                {images[currentImage].highlight}
              </span>
            </h1>
          </div>
          
          {/* Description with Pop Animation */}
          <div className={`transform transition-all duration-500 delay-100 ${
            isVisible ? 'scale-100 opacity-100' : 'scale-105 opacity-0'
          }`}>
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-100 mb-8 sm:mb-12 leading-relaxed font-medium backdrop-blur-sm bg-black/40 p-6 sm:p-8 rounded-3xl border border-white/20 shadow-2xl">
              {images[currentImage].description}
            </p>
          </div>
          
          {/* Buttons with Pop Animation */}
          <div className={`flex flex-col sm:flex-row gap-4 sm:gap-6 mb-12 sm:mb-16 transform transition-all duration-500 delay-200 ${
            isVisible ? 'scale-100 opacity-100' : 'scale-105 opacity-0'
          }`}>
            <button 
              onClick={handleBookNowClick}
              className="group bg-gradient-to-br from-yellow-400 to-orange-500 hover:from-yellow-300 hover:to-orange-400 text-gray-900 px-8 py-4 sm:px-10 sm:py-5 rounded-2xl font-bold text-lg sm:text-xl border-2 border-yellow-300 flex-1 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <span className="flex items-center justify-center gap-2">
                Book Your Stay
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
            
            <button 
              onClick={handleExploreMenuClick}
              className="group border-2 border-yellow-400 text-white px-8 py-4 sm:px-10 sm:py-5 rounded-2xl font-bold text-lg sm:text-xl backdrop-blur-lg bg-white/10 hover:bg-white/20 flex items-center justify-center gap-3 sm:gap-4 flex-1 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
            >
              <Utensils className="w-5 h-5 sm:w-6 sm:h-6 group-hover:rotate-12 transition-transform" />
              Explore Menu
            </button>
          </div>

          {/* Feature Cards with Pop Animation */}
          <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mt-12 sm:mt-16 transform transition-all duration-500 delay-300 ${
            isVisible ? 'scale-100 opacity-100 translate-y-0' : 'scale-105 opacity-0 translate-y-4'
          }`}>
            {images[currentImage].cards.map((card, idx) => (
              <div
                key={idx}
                className="group bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-xl p-6 sm:p-8 rounded-3xl border border-white/30 hover:border-white/50 hover:shadow-2xl transition-all duration-500 transform hover:scale-105 cursor-pointer min-h-[180px] sm:min-h-[200px] flex flex-col"
              >
                <div className="text-yellow-400 mb-4 group-hover:scale-110 transition-transform duration-300">
                  {card.icon}
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4 group-hover:text-yellow-300 transition-colors">
                  {card.title}
                </h3>
                <p className="text-gray-200 font-light leading-relaxed text-base sm:text-lg flex-grow">
                  {card.description}
                </p>
                <div className="mt-4 pt-4 border-t border-white/20 group-hover:border-yellow-400/50 transition-colors">
                  <span className="text-yellow-400 text-sm font-semibold group-hover:translate-x-2 transition-transform duration-300 inline-block">
                    Learn more →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-40 flex items-center space-x-2 bg-black/30 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
        <span className="text-white text-sm font-medium">
          {currentImage + 1} / {images.length}
        </span>
        <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
      </div>
    </section>
  );
};

export default Hero;