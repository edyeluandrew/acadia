import React, { useState, useEffect } from 'react';

const Services = () => {
  return (
    <section id="services" className="py-20 bg-beige">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-espresso mb-4">
            Our Services
          </h2>
          <p className="text-xl text-walnut max-w-3xl mx-auto">
            Experience comprehensive luxury and comfort at Numba Cafe & Boutique Hotel by Acadia Lodges
          </p>
        </div>

        {/* Bar Services */}
        <ServiceSection
          title="Elegant Bar & Lounge"
          subtitle="Entertainment"
          description="Unwind in our sophisticated bar serving craft cocktails, local beers, and fine wines. Perfect for evening relaxation or social gatherings in a refined atmosphere."
          features={[
            "Craft cocktails & premium spirits",
            "Local craft beers & fine wines",
            "Live music on weekends",
            "Outdoor terrace with fire pits"
          ]}
          buttonText="View Bar Menu"
          images={[
            'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=800&h=600&fit=crop&q=80',
            'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&h=600&fit=crop&q=80',
            'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=800&h=600&fit=crop&q=80'
          ]}
          reverse={false}
        />

        {/* Conference Rooms */}
        <ServiceSection
          title="Conference Rooms"
          subtitle="Business & Events"
          description="Professional meeting spaces equipped with modern technology for business meetings, conferences, and special events. Perfect for corporate gatherings and celebrations."
          features={[
            "Capacity for 20-100 people",
            "State-of-the-art AV equipment",
            "Professional catering services",
            "High-speed WiFi & tech support"
          ]}
          buttonText="Book Conference Space"
          images={[
            'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop&q=80',
            'https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=800&h=600&fit=crop&q=80',
            'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&h=600&fit=crop&q=80'
          ]}
          reverse={true}
        />

        {/* Restaurant Services */}
        <ServiceSection
          title="Fine Restaurant"
          subtitle="Dining Experience"
          description="Indulge in gourmet dining featuring locally sourced ingredients and innovative cuisine prepared by our expert chefs. An unforgettable culinary journey awaits."
          features={[
            "Farm-to-table fresh ingredients",
            "Seasonal menu with local flavors",
            "Chef's tasting menu available",
            "Elegant dining atmosphere"
          ]}
          buttonText="View Restaurant Menu"
          images={[
            'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop&q=80',
            'https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=800&h=600&fit=crop&q=80',
            'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop&q=80'
          ]}
          reverse={false}
        />

        {/* Accommodation Services */}
        <ServiceSection
          title="Boutique Accommodation"
          subtitle="Luxury Stay"
          description="Experience unparalleled comfort in our thoughtfully designed rooms and suites, each offering unique character and modern amenities amidst Acadia's natural beauty."
          features={[
            "Elegantly designed boutique rooms",
            "Premium amenities & spa-like bathrooms",
            "Stunning views of Acadia landscapes",
            "24/7 room service & concierge"
          ]}
          buttonText="Explore Rooms & Suites"
          images={[
            'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&h=600&fit=crop&q=80',
            'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&h=600&fit=crop&q=80',
            'https://images.unsplash.com/photo-1582582621959-48d27397dc69?w=800&h=600&fit=crop&q=80'
          ]}
          reverse={true}
        />

        {/* Parking Services */}
        <ServiceSection
          title="Secure Parking"
          subtitle="Convenience & Safety"
          description="Complimentary secured parking facilities for all our guests with 24/7 surveillance and easy access. Your vehicle's safety is our priority."
          features={[
            "Free for hotel guests & visitors",
            "24/7 security monitoring",
            "Electric vehicle charging stations",
            "Covered & uncovered parking options"
          ]}
          buttonText="View Parking Info"
          images={[
            'https://images.unsplash.com/photo-1486496572940-2bb2341fdbdf?w=800&h=600&fit=crop&q=80',
            'https://images.unsplash.com/photo-1551524164-6ca64fb04e0e?w=800&h=600&fit=crop&q=80',
            'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&q=80'
          ]}
          reverse={false}
        />

      </div>
    </section>
  );
};

// Reusable Service Section Component with Image Slider
const ServiceSection = ({ title, subtitle, description, features, buttonText, images, reverse }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const content = (
    <div className="flex flex-col justify-center">
      <span className="text-gold font-semibold mb-2">{subtitle}</span>
      <h3 className="text-3xl font-bold text-espresso mb-6">{title}</h3>
      <p className="text-walnut mb-6 leading-relaxed">{description}</p>
      <ul className="space-y-3 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center text-walnut">
            <span className="w-2 h-2 bg-gold rounded-full mr-3 flex-shrink-0"></span>
            {feature}
          </li>
        ))}
      </ul>
      <button className="bg-gold text-espresso px-6 py-3 rounded-lg font-semibold w-fit">
        {buttonText}
      </button>
    </div>
  );

  const imageSlider = (
    <div className="relative rounded-2xl overflow-hidden h-80 shadow-xl w-full">
      {/* Image Slider */}
      <div className="absolute inset-0">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img 
              src={image} 
              alt={`${title} ${index + 1}`}
              className="w-full h-full object-cover"
            />
            {/* Dark overlay for better contrast */}
            <div className="absolute inset-0 bg-espresso bg-opacity-20"></div>
          </div>
        ))}
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full border-2 border-white ${
              index === currentSlide ? 'bg-gold border-gold' : 'bg-white bg-opacity-30 border-white'
            }`}
          />
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={() => setCurrentSlide((prev) => (prev - 1 + images.length) % images.length)}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-gold bg-opacity-90 text-espresso p-3 rounded-full shadow-lg"
        aria-label="Previous image"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button
        onClick={() => setCurrentSlide((prev) => (prev + 1) % images.length)}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-gold bg-opacity-90 text-espresso p-3 rounded-full shadow-lg"
        aria-label="Next image"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Slide Counter */}
      <div className="absolute top-4 right-4 z-20 bg-espresso bg-opacity-70 text-beige px-3 py-1 rounded-full text-sm">
        {currentSlide + 1} / {images.length}
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
      {reverse ? (
        <>
          {imageSlider}
          {content}
        </>
      ) : (
        <>
          {content}
          {imageSlider}
        </>
      )}
    </div>
  );
};

export default Services;