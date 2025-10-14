import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  Coffee, 
  Phone, 
  Mail, 
  Calendar,
  Clock,
  ArrowRight,
  Star,
  MapPin,
  ChevronRight,
  Users,
  Zap,
  Wifi
} from 'lucide-react';

const BookingCTA = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCard, setActiveCard] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const FloatingElement = ({ delay, size, position }) => (
    <div 
      className={`absolute bg-yellow-400 opacity-5 rounded-full ${size} ${position}`}
      style={{
        animation: `float 8s ease-in-out ${delay}s infinite`
      }}
    />
  );

  const hotelFeatures = [
    { icon: Calendar, label: "Check-in", value: "3:00 PM" },
    { icon: Calendar, label: "Check-out", value: "11:00 AM" },
    { icon: MapPin, label: "Location", value: "Acadia, Maine" },
    { icon: Wifi, label: "Free WiFi", value: "High-Speed" }
  ];

  const cafeFeatures = [
    { icon: Clock, label: "Weekdays", value: "7:00 AM - 9:00 PM" },
    { icon: Clock, label: "Weekends", value: "8:00 AM - 10:00 PM" },
    { icon: Users, label: "Max Party", value: "Up to 20 guests" },
    { icon: MapPin, label: "Location", value: "Ground Floor" }
  ];

  return (
    <section id="booking" className="py-24 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      {/* Enhanced Background Elements */}
      <FloatingElement delay={0} size="w-40 h-40" position="top-10 left-10" />
      <FloatingElement delay={2} size="w-56 h-56" position="bottom-20 right-20" />
      <FloatingElement delay={4} size="w-32 h-32" position="top-1/3 right-1/4" />
      <FloatingElement delay={1.5} size="w-44 h-44" position="bottom-1/3 left-5" />

      {/* Animated Gradient Glow */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-yellow-400 rounded-full opacity-5 blur-3xl"
          style={{ animation: 'pulse-glow 6s ease-in-out infinite' }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        
        {/* Premium Header Section */}
        <div className={`text-center mb-20 transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-yellow-400 bg-opacity-10 border border-yellow-400 border-opacity-30">
            <Zap className="w-4 h-4 text-yellow-400" />
            <span className="text-yellow-400 font-semibold text-sm">Premium Experience Awaits</span>
          </div>

          <h2 className="text-5xl md:text-6xl font-bold mb-4 text-white">
            Ready to Experience 
            <span className="bg-gradient-to-r from-yellow-300 via-yellow-400 to-amber-300 bg-clip-text text-transparent block mt-2">
              Numba?
            </span>
          </h2>
          
          <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto mt-6 leading-relaxed">
            Discover the perfect blend of luxury hospitality and artisan excellence. Book your room or reserve your table for an unforgettable Acadia experience.
          </p>
        </div>

        {/* Main Booking Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          
          {/* Hotel Card */}
          <div 
            className={`transform transition-all duration-700 delay-200 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
            onMouseEnter={() => setActiveCard('hotel')}
            onMouseLeave={() => setActiveCard(null)}
          >
            <div className="relative h-full">
              {/* Card Border Glow */}
              <div className={`absolute -inset-0.5 bg-gradient-to-r from-yellow-400 to-amber-400 rounded-3xl opacity-0 transition-opacity duration-500 ${
                activeCard === 'hotel' ? 'opacity-20' : ''
              }`} style={{ filter: 'blur(8px)' }} />
              
              <div className="relative bg-gray-800 bg-opacity-80 backdrop-blur-xl p-8 rounded-3xl border border-yellow-400 border-opacity-20 hover:border-opacity-40 transition-all duration-500 h-full flex flex-col">
                
                {/* Icon Section */}
                <div className="mb-8">
                  <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-amber-400 rounded-2xl flex items-center justify-center mx-auto transform group-hover:scale-110 transition-transform duration-500 shadow-2xl shadow-yellow-400/20">
                    <Building2 className="w-12 h-12 text-gray-900" strokeWidth={1.5} />
                  </div>
                </div>

                {/* Title & Description */}
                <h3 className="text-3xl font-bold text-white mb-3 text-center">
                  Hotel Stay
                </h3>
                <p className="text-gray-300 mb-8 text-center leading-relaxed">
                  Experience luxury and comfort in our exquisitely designed boutique rooms with breathtaking Acadia views and premium amenities.
                </p>
                
                {/* Features Grid */}
                <div className="space-y-4 mb-8 flex-grow">
                  {hotelFeatures.map((feature, idx) => {
                    const Icon = feature.icon;
                    return (
                      <div 
                        key={idx}
                        className="flex items-center gap-4 p-3 rounded-lg bg-gray-700 bg-opacity-40 hover:bg-opacity-60 transition-all duration-300 border border-gray-600 border-opacity-30"
                      >
                        <div className="p-2 rounded-lg bg-yellow-400 bg-opacity-10">
                          <Icon className="w-5 h-5 text-yellow-400" strokeWidth={2} />
                        </div>
                        <div className="flex-1">
                          <p className="text-gray-400 text-sm">{feature.label}</p>
                          <p className="text-white font-semibold">{feature.value}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Button */}
                <button className="w-full bg-gradient-to-r from-yellow-400 to-amber-400 hover:from-yellow-300 hover:to-amber-300 text-gray-900 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-yellow-400/30 flex items-center justify-center gap-3 group">
                  <span>Book Your Room</span>
                  <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" strokeWidth={2.5} />
                </button>
              </div>
            </div>
          </div>

          {/* Cafe Card */}
          <div 
            className={`transform transition-all duration-700 delay-400 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
            onMouseEnter={() => setActiveCard('cafe')}
            onMouseLeave={() => setActiveCard(null)}
          >
            <div className="relative h-full">
              {/* Card Border Glow */}
              <div className={`absolute -inset-0.5 bg-gradient-to-r from-yellow-400 to-amber-400 rounded-3xl opacity-0 transition-opacity duration-500 ${
                activeCard === 'cafe' ? 'opacity-20' : ''
              }`} style={{ filter: 'blur(8px)' }} />
              
              <div className="relative bg-gray-800 bg-opacity-80 backdrop-blur-xl p-8 rounded-3xl border border-yellow-400 border-opacity-20 hover:border-opacity-40 transition-all duration-500 h-full flex flex-col">
                
                {/* Icon Section */}
                <div className="mb-8">
                  <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-amber-400 rounded-2xl flex items-center justify-center mx-auto transform group-hover:scale-110 transition-transform duration-500 shadow-2xl shadow-yellow-400/20">
                    <Coffee className="w-12 h-12 text-gray-900" strokeWidth={1.5} />
                  </div>
                </div>

                {/* Title & Description */}
                <h3 className="text-3xl font-bold text-white mb-3 text-center">
                  Cafe Reservation
                </h3>
                <p className="text-gray-300 mb-8 text-center leading-relaxed">
                  Reserve your perfect table for artisan coffee, gourmet pastries, and memorable moments with friends and family.
                </p>
                
                {/* Features Grid */}
                <div className="space-y-4 mb-8 flex-grow">
                  {cafeFeatures.map((feature, idx) => {
                    const Icon = feature.icon;
                    return (
                      <div 
                        key={idx}
                        className="flex items-center gap-4 p-3 rounded-lg bg-gray-700 bg-opacity-40 hover:bg-opacity-60 transition-all duration-300 border border-gray-600 border-opacity-30"
                      >
                        <div className="p-2 rounded-lg bg-yellow-400 bg-opacity-10">
                          <Icon className="w-5 h-5 text-yellow-400" strokeWidth={2} />
                        </div>
                        <div className="flex-1">
                          <p className="text-gray-400 text-sm">{feature.label}</p>
                          <p className="text-white font-semibold">{feature.value}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Button */}
                <button className="w-full bg-gradient-to-r from-yellow-400 to-amber-400 hover:from-yellow-300 hover:to-amber-300 text-gray-900 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-yellow-400/30 flex items-center justify-center gap-3 group">
                  <span>Reserve Table</span>
                  <ChevronRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" strokeWidth={2.5} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div 
          className={`bg-gradient-to-r from-gray-800 to-gray-900 border border-yellow-400 border-opacity-20 rounded-3xl p-10 transform transition-all duration-700 delay-600 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Phone */}
            <div className="text-center group">
              <div className="w-16 h-16 bg-yellow-400 bg-opacity-10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-opacity-20 transition-all duration-300">
                <Phone className="w-8 h-8 text-yellow-400" strokeWidth={2} />
              </div>
              <p className="text-gray-400 text-sm mb-2">Call Us Anytime</p>
              <p className="text-2xl font-bold text-yellow-400 group-hover:text-yellow-300 transition-colors duration-300">
                +256 xxx xxxxxxx
              </p>
            </div>

            {/* Hours */}
            <div className="text-center group">
              <div className="w-16 h-16 bg-yellow-400 bg-opacity-10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-opacity-20 transition-all duration-300">
                <Clock className="w-8 h-8 text-yellow-400" strokeWidth={2} />
              </div>
              <p className="text-gray-400 text-sm mb-2">Operating Hours</p>
              <p className="text-lg font-bold text-white">
                7:00 AM - 9:00 PM
              </p>
              <p className="text-sm text-gray-400 mt-1">Open Daily</p>
            </div>

            {/* Email */}
            <div className="text-center group">
              <div className="w-16 h-16 bg-yellow-400 bg-opacity-10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-opacity-20 transition-all duration-300">
                <Mail className="w-8 h-8 text-yellow-400" strokeWidth={2} />
              </div>
              <p className="text-gray-400 text-sm mb-2">Email Us</p>
              <p className="text-lg font-bold text-white">
                info@numbacafe.com
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10 pt-10 border-t border-gray-700">
            <button className="px-8 py-3 border-2 border-yellow-400 text-yellow-400 rounded-xl font-semibold hover:bg-yellow-400 hover:text-gray-900 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 group">
              <Phone className="w-5 h-5 group-hover:scale-110 transition-transform" strokeWidth={2} />
              Call Now
            </button>
            <button className="px-8 py-3 border-2 border-yellow-400 text-yellow-400 rounded-xl font-semibold hover:bg-yellow-400 hover:text-gray-900 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 group">
              <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" strokeWidth={2} />
              Email Us
            </button>
          </div>
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg); 
          }
          50% { 
            transform: translateY(-30px) rotate(180deg); 
          }
        }
        
        @keyframes pulse-glow {
          0%, 100% { 
            opacity: 0.05; 
            transform: translate(-50%, -50%) scale(1); 
          }
          50% { 
            opacity: 0.1; 
            transform: translate(-50%, -50%) scale(1.2); 
          }
        }
      `}</style>
    </section>
  );
};

export default BookingCTA;