import React from 'react';
import { motion } from 'framer-motion';

const MenuSection = () => {
  // Array of menu page images (after converting your PDF)
  const menuPages = [
    "/images/menu/menu-page-1.jpg",
    "/images/menu/menu-page-2.jpg", 
    "/images/menu/menu-page-3.jpg",
    "/images/menu/menu-page-4.jpg",
    "/images/menu/menu-page-5.jpg",
    "/images/menu/menu-page-6.jpg",
    "/images/menu/menu-page-7.jpg",
    "/images/menu/menu-page-8.jpg"
  ];

  // Function to split array into chunks of 2 for rows
  const chunkArray = (array, size) => {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  };

  const menuChunks = chunkArray(menuPages, 2);

  return (
    <section id="menu" className="min-h-screen py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            OUR MENU
          </h3>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-8"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our exquisite selection of dishes, beverages, and specialty coffees at Numba Cafe & Boutique Hotel
          </p>
        </motion.div>

        {/* Menu Pages Display */}
        <motion.div
          className="space-y-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {menuChunks.map((chunk, chunkIndex) => (
            <motion.div 
              key={chunkIndex}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: chunkIndex * 0.1 }}
              viewport={{ once: true }}
            >
              {chunk.map((image, index) => (
                <motion.div 
                  key={index}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-2xl transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="relative overflow-hidden">
                    <img 
                      src={image}
                      alt={`Numba Cafe Menu Page ${chunkIndex * 2 + index + 1}`}
                      className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                      <motion.button
                        className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 px-6 py-3 bg-white text-gray-900 rounded-full font-semibold shadow-lg"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => window.open(image, '_blank')}
                      >
                        View Full Size
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ))}
        </motion.div>

        {/* Quick Menu Categories Preview */}
        <motion.div 
          className="mt-20 grid grid-cols-1 md:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🌅</span>
            </div>
            <h6 className="font-bold text-gray-900 mb-2">Breakfast</h6>
            <p className="text-sm text-gray-600">6AM - 11AM</p>
            <p className="text-xs text-gray-500 mt-2">Full English, Rolex, Waffles & more</p>
          </div>
          
          <div className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🍽️</span>
            </div>
            <h6 className="font-bold text-gray-900 mb-2">Main Courses</h6>
            <p className="text-sm text-gray-600">All Day Dining</p>
            <p className="text-xs text-gray-500 mt-2">Steaks, Burgers, Local Specialties</p>
          </div>
          
          <div className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🍹</span>
            </div>
            <h6 className="font-bold text-gray-900 mb-2">Bar & Drinks</h6>
            <p className="text-sm text-gray-600">Extensive Selection</p>
            <p className="text-xs text-gray-500 mt-2">Wines, Spirits, Cocktails & Beers</p>
          </div>
          
          <div className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">☕</span>
            </div>
            <h6 className="font-bold text-gray-900 mb-2">Coffee Bar</h6>
            <p className="text-sm text-gray-600">Barista Specials</p>
            <p className="text-xs text-gray-500 mt-2">Fresh Juices, Smoothies & Coffee</p>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
            <h4 className="text-2xl font-bold mb-4">Visit Us Today!</h4>
            <p className="mb-6 opacity-90">Experience the taste of Numba Cafe & Boutique Hotel</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="#contact"
                className="px-6 py-3 bg-white text-blue-600 rounded-full font-semibold hover:shadow-lg transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Make Reservation
              </motion.a>
              <motion.a
                href="tel:+25639421455"
                className="px-6 py-3 bg-transparent border-2 border-white text-white rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Call +256 394 21455
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MenuSection;