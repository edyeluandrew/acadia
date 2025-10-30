import React, { useState, useEffect } from 'react';
import { Coffee, MapPin, Clock, Star, ChevronRight } from 'lucide-react';

export default function CoffeeLandingPage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const offerings = [
    {
      title: "Specialty Coffee",
      description: "Handcrafted espresso drinks made with premium beans sourced from the finest coffee regions",
      icon: "☕"
    },
    {
      title: "Fresh Pastries",
      description: "Baked daily with love - croissants, muffins, and artisan breads that pair perfectly with your coffee",
      icon: "🥐"
    },
    {
      title: "Cozy Ambiance",
      description: "A warm, inviting space perfect for work, meetings, or catching up with friends",
      icon: "🪴"
    },
    {
      title: "Breakfast & Brunch",
      description: "Start your day right with our signature breakfast bowls, sandwiches, and hearty brunch options",
      icon: "🍳"
    }
  ];

  const testimonials = [
    {
      name: "Sarah M.",
      text: "Best coffee in town! The atmosphere is perfect for getting work done.",
      rating: 5
    },
    {
      name: "James K.",
      text: "Numba Cafe has become my daily ritual. Their baristas are true artists!",
      rating: 5
    },
    {
      name: "Emily R.",
      text: "Love the cozy vibe and the pastries are to die for. Highly recommend!",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-amber-50">
      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900 via-amber-800 to-amber-950">
          <div className="absolute inset-0 bg-black opacity-40"></div>
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in">
            Welcome to Numba Cafe
          </h1>
          <p className="text-xl md:text-2xl text-amber-100 mb-8">
            Where every cup tells a story, and every sip is an experience
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-amber-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-amber-700 transform hover:scale-105 transition flex items-center justify-center space-x-2">
              <span>Explore Menu</span>
              <ChevronRight className="w-5 h-5" />
            </button>
            <button className="bg-white text-amber-900 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transform hover:scale-105 transition">
              Visit Us
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-amber-900 mb-4">The Numba Cafe Experience</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              More than just coffee - it's a destination for coffee lovers, food enthusiasts, and anyone seeking a moment of warmth
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {offerings.map((offer, idx) => (
              <div key={idx} className="bg-amber-50 p-6 rounded-2xl hover:shadow-xl transform hover:-translate-y-2 transition duration-300">
                <div className="text-5xl mb-4">{offer.icon}</div>
                <h3 className="text-xl font-bold text-amber-900 mb-3">{offer.title}</h3>
                <p className="text-gray-600">{offer.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-20 bg-gradient-to-r from-amber-100 to-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-amber-900 mb-6">Crafted with Passion</h2>
              <p className="text-lg text-gray-700 mb-6">
                Every cup at Numba Cafe is a masterpiece. Our expert baristas take pride in crafting the perfect brew, using only the finest beans sourced from sustainable farms around the world.
              </p>
              <p className="text-lg text-gray-700 mb-8">
                From the first sip of our signature espresso to the last bite of our freshly baked pastries, we're committed to delivering an unforgettable experience that keeps you coming back for more.
              </p>
              <button className="bg-amber-600 text-white px-8 py-3 rounded-full hover:bg-amber-700 transition flex items-center space-x-2">
                <span>Learn Our Story</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-amber-800 h-64 rounded-2xl"></div>
              <div className="bg-amber-700 h-64 rounded-2xl mt-8"></div>
              <div className="bg-amber-600 h-64 rounded-2xl -mt-8"></div>
              <div className="bg-amber-900 h-64 rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-amber-900 text-center mb-12">What Our Customers Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <div key={idx} className="bg-amber-50 p-6 rounded-2xl">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-amber-500 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4">"{testimonial.text}"</p>
                <p className="font-semibold text-amber-900">- {testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-amber-900 to-amber-950">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Visit Us Today</h2>
          <p className="text-xl text-amber-100 mb-8">
            Experience the warmth, taste the passion, and become part of the Numba Cafe family
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 text-white mb-8">
            <div className="flex items-center space-x-2">
              <MapPin className="w-6 h-6" />
              <span>Downtown Kabale</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-6 h-6" />
              <span>7AM - 9PM Daily</span>
            </div>
          </div>
          <button className="bg-white text-amber-900 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transform hover:scale-105 transition">
            Get Directions
          </button>
        </div>
      </section>
    </div>
  );
}