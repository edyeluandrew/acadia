import React, { useState, useEffect } from 'react';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showRoomSelection, setShowRoomSelection] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [availableRooms, setAvailableRooms] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const slides = [
    {
      image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1920&h=1080&fit=crop&q=80',
      title: 'Welcome to',
      highlight: 'Numba Cafe',
      description: 'Experience the perfect blend of artisan coffee and boutique hospitality nestled in the heart of Acadia.',
      cards: [
        { title: "Artisan Coffee", description: "Freshly roasted beans, expertly brewed" },
        { title: "Boutique Rooms", description: "Luxurious comfort with personal touch" },
        { title: "Acadia Views", description: "Stunning natural surroundings" }
      ]
    },
    {
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&h=1080&fit=crop&q=80',
      title: 'Luxury Meets',
      highlight: 'Comfort',
      description: 'Indulge in our elegantly designed rooms with premium amenities and breathtaking views of nature.',
      cards: [
        { title: "Premium Suites", description: "Designed for ultimate relaxation" },
        { title: "Modern Amenities", description: "Everything you need and more" },
        { title: "24/7 Service", description: "We're here whenever you need us" }
      ]
    },
    {
      image: 'https://images.unsplash.com/photo-1571863533956-01c88e79957e?w=1920&h=1080&fit=crop&q=80',
      title: 'Culinary',
      highlight: 'Excellence',
      description: 'Savor gourmet dining experiences crafted by expert chefs using the finest local ingredients.',
      cards: [
        { title: "Farm to Table", description: "Fresh, locally sourced ingredients" },
        { title: "Expert Chefs", description: "Culinary masters at work" },
        { title: "Fine Dining", description: "An unforgettable experience" }
      ]
    },
    {
      image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1920&h=1080&fit=crop&q=80',
      title: 'Your Perfect',
      highlight: 'Escape',
      description: 'Where every stay feels like home and every cup tells a story. Book your unforgettable experience today.',
      cards: [
        { title: "Relaxation", description: "Unwind in tranquil surroundings" },
        { title: "Adventure", description: "Explore the beauty of Acadia" },
        { title: "Memories", description: "Create moments that last forever" }
      ]
    }
  ];

  const roomTemplates = {
    single: [
      {
        id: 1,
        name: "Cozy Single Suite",
        basePrice: 129,
        image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=600&fit=crop&q=80",
        features: ["Queen Bed", "Mountain View", "Free WiFi", "Work Desk"],
        type: "single"
      },
      {
        id: 2,
        name: "Executive Single",
        basePrice: 159,
        image: "https://images.unsplash.com/photo-1586105251261-72a756497a11?w=800&h=600&fit=crop&q=80",
        features: ["King Bed", "City View", "Mini Bar", "Smart TV"],
        type: "single"
      }
    ],
    double: [
      {
        id: 3,
        name: "Deluxe Double Room",
        basePrice: 199,
        image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&h=600&fit=crop&q=80",
        features: ["Two Queen Beds", "Balcony", "Coffee Machine", "Sofa"],
        type: "double"
      },
      {
        id: 4,
        name: "Premium Double Suite",
        basePrice: 249,
        image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&h=600&fit=crop&q=80",
        features: ["King Bed + Sofa Bed", "Ocean View", "Jacuzzi", "Living Area"],
        type: "double"
      }
    ],
    family: [
      {
        id: 5,
        name: "Family Grand Suite",
        basePrice: 349,
        image: "https://images.unsplash.com/photo-1582582621959-48d27397dc69?w=800&h=600&fit=crop&q=80",
        features: ["Two Bedrooms", "Kitchenette", "Dining Area", "Kids Play Zone"],
        type: "family"
      },
      {
        id: 6,
        name: "Presidential Family Suite",
        basePrice: 499,
        image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&h=600&fit=crop&q=80",
        features: ["Three Bedrooms", "Full Kitchen", "Private Balcony", "Game Room"],
        type: "family"
      }
    ]
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const handleBookNowClick = () => {
    setShowRoomSelection(true);
  };

  const handleExploreMenuClick = () => {
    console.log('Menu feature coming soon...');
  };

  return (
    <>
      <section id="home" className="relative w-full h-screen flex items-center overflow-hidden pt-24">
        {/* Background Images Slider with Zoom Effect */}
        <div className="absolute inset-0 z-0 w-full h-full">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img 
                src={slide.image} 
                alt={`Slide ${index + 1}`}
                className={`w-full h-full object-cover ${
                  index === currentSlide ? 'animate-zoom' : ''
                }`}
              />
              {/* Enhanced Dark Overlay for better text visibility */}
              <div className="absolute inset-0 bg-black opacity-60" />
            </div>
          ))}
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-4">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-4 h-4 rounded-full backdrop-blur-sm transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-yellow-400 shadow-lg shadow-yellow-400/50 scale-125' 
                  : 'bg-white bg-opacity-40 hover:bg-opacity-60'
              }`}
            />
          ))}
        </div>
        
        {/* Dynamic Content */}
        <div className="max-w-7xl mx-auto px-4 py-20 relative z-10 w-full">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 leading-tight animate-fade-in drop-shadow-lg" style={{ textShadow: '0 4px 20px rgba(0, 0, 0, 0.8)' }}>
              {slides[currentSlide].title}
              <span className="block text-yellow-400 mt-3 drop-shadow-lg" style={{ textShadow: '0 4px 20px rgba(0, 0, 0, 0.9)' }}>
                {slides[currentSlide].highlight}
              </span>
            </h1>
            
            <p className="text-lg md:text-2xl text-gray-100 mb-10 leading-relaxed font-light animate-fade-in-delay drop-shadow-md" style={{ textShadow: '0 2px 10px rgba(0, 0, 0, 0.7)' }}>
              {slides[currentSlide].description}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-delay-2">
              <button 
                onClick={handleBookNowClick}
                className="bg-yellow-400 text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-yellow-300 transition-all shadow-lg hover:shadow-xl"
              >
                Book Your Stay
              </button>
              <button 
                onClick={handleExploreMenuClick}
                className="border-2 border-yellow-400 text-white px-8 py-4 rounded-lg font-semibold text-lg backdrop-blur-sm bg-white bg-opacity-10 flex items-center justify-center gap-3 hover:bg-yellow-400 hover:text-gray-900 transition-all shadow-lg"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                Explore Menu
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
              {slides[currentSlide].cards.map((card, idx) => (
                <div
                  key={idx}
                  className="bg-white bg-opacity-15 backdrop-blur-md p-6 rounded-xl border border-yellow-400 border-opacity-30 animate-slide-up hover:bg-opacity-25 transition-all"
                  style={{ animationDelay: `${idx * 150}ms` }}
                >
                  <h3 className="text-lg font-semibold text-white mb-2 drop-shadow-md">{card.title}</h3>
                  <p className="text-gray-100 font-light drop-shadow-sm">{card.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CSS Animations */}
        <style jsx>{`
          @keyframes zoom {
            0% {
              transform: scale(1);
            }
            100% {
              transform: scale(1.1);
            }
          }

          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes slideUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .animate-zoom {
            animation: zoom 6s ease-out forwards;
          }

          .animate-fade-in {
            animation: fadeIn 0.8s ease-out forwards;
          }

          .animate-fade-in-delay {
            opacity: 0;
            animation: fadeIn 0.8s ease-out 0.3s forwards;
          }

          .animate-fade-in-delay-2 {
            opacity: 0;
            animation: fadeIn 0.8s ease-out 0.6s forwards;
          }

          .animate-slide-up {
            opacity: 0;
            animation: slideUp 0.8s ease-out forwards;
          }
        `}</style>
      </section>
    </>
  );
};

export default Hero;