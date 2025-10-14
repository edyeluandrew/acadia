import React, { useState, useEffect } from 'react';
import { MapPin, Leaf, Heart, Compass, Users, Award } from 'lucide-react';

const AboutUs = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const features = [
    {
      icon: MapPin,
      title: "Prime Location",
      description: "Hidden gem nestled in the heart of Kabale town, Uganda"
    },
    {
      icon: Leaf,
      title: "Natural Beauty",
      description: "Set within Uganda's magnificent natural landscapes"
    },
    {
      icon: Heart,
      title: "Intimate Retreat",
      description: "Boutique experience with personalized service and elegance"
    },
    {
      icon: Compass,
      title: "Adventure Ready",
      description: "Perfect base for gorilla trekking and exploration"
    },
    {
      icon: Users,
      title: "Diverse Experiences",
      description: "Romantic getaways, family adventures, or personal retreats"
    },
    {
      icon: Award,
      title: "Luxury Standards",
      description: "Beautifully designed interiors and breathtaking exteriors"
    }
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-espresso mb-4">
            About Numba & Acadia
          </h2>
          <p className="text-xl text-walnut max-w-3xl mx-auto">
            Discover the essence of luxury hospitality in Uganda's most enchanting destinations
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16 items-center">
          
          {/* Left Content */}
          <div className={`transform transition-all duration-1000 ${
            isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
          }`}>
            <div className="space-y-6">
              <div>
                <h3 className="text-3xl font-bold text-espresso mb-4">
                  Numba Hotel Kabale
                </h3>
                <p className="text-walnut leading-relaxed mb-4">
                  A hidden gem nestled in the heart of Kabale town, Uganda. Our boutique hotel offers an intimate and tranquil retreat for discerning travelers. With six beautifully ensuite rooms, you'll find comfort and elegance at every turn.
                </p>
                <p className="text-walnut leading-relaxed">
                  Indulge in delectable cuisine at our restaurant, where the flavors of Uganda come alive. Whether you're here for gorilla trekking, a romantic getaway, or simply to recharge, Numba Hotel Kabale promises an unforgettable experience.
                </p>
              </div>
            </div>
          </div>

          {/* Right Image/Visual */}
          <div className={`transform transition-all duration-1000 delay-200 ${
            isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
          }`}>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl h-96 bg-gradient-to-br from-espresso to-walnut p-8 flex flex-col justify-center">
              <img 
                src="https://images.unsplash.com/photo-1571896349842-b46d0e7a0fbb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Numba Hotel Kabale"
                className="w-full h-full object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-espresso bg-opacity-20"></div>
            </div>
          </div>
        </div>

        {/* Acadia Lodges Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16 items-center">
          
          {/* Left Image */}
          <div className={`transform transition-all duration-1000 delay-300 ${
            isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
          }`}>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl h-96">
              <img 
                src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Acadia Lodges Uganda"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-espresso bg-opacity-20"></div>
            </div>
          </div>

          {/* Right Content */}
          <div className={`transform transition-all duration-1000 delay-400 ${
            isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
          }`}>
            <div className="space-y-6">
              <div>
                <h3 className="text-3xl font-bold text-espresso mb-4">
                  Acadia Lodges Collection
                </h3>
                <p className="text-walnut leading-relaxed mb-4">
                  A collection of stunning and luxurious lodges set within Uganda's magnificent natural landscapes. From the lush bushes of Lake Mburo to the serene waters of Lake Bunyonyi, Acadia Lodges offer guests an opportunity to explore Uganda's diverse and vibrant culture.
                </p>
                <p className="text-walnut leading-relaxed">
                  Each lodge is beautifully designed, featuring elegant interiors and breathtaking exteriors, allowing guests to soak up the natural beauty of the surroundings. Whether you are looking to rekindle the romance or to embark on an adventure with your family, our Ugandan lodges provide the perfect base from which to explore the country's stunning natural surroundings.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="bg-beige rounded-2xl p-12 mb-12">
          <h3 className="text-2xl font-bold text-espresso mb-10 text-center">
            Why Choose Us
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={index}
                  className={`transform transition-all duration-700 hover:scale-105 ${
                    isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                  }`}
                  style={{ transitionDelay: `${500 + index * 100}ms` }}
                >
                  <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow h-full">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-gold to-walnut rounded-lg flex items-center justify-center mr-4">
                        <Icon className="w-6 h-6 text-white" strokeWidth={2} />
                      </div>
                      <h4 className="text-lg font-bold text-espresso">
                        {feature.title}
                      </h4>
                    </div>
                    <p className="text-walnut text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-espresso via-walnut to-espresso rounded-2xl p-12 text-center">
          <h3 className="text-3xl font-bold text-beige mb-4">
            Experience the Magic of Africa
          </h3>
          <p className="text-stone mb-8 max-w-2xl mx-auto leading-relaxed">
            Immerse yourself in the beauty of Uganda with Acadia Lodges and Numba Hotel. Book your stay today and create memories that will last a lifetime.
          </p>
          <button className="bg-gradient-to-r from-gold to-beige text-espresso px-8 py-4 rounded-lg font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300">
            Start Your Journey
          </button>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;