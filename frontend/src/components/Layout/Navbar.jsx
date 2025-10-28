import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);
  const navbarRef = useRef(null);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 20);

      const sections = ['home', 'services', 'about', 'gallery', 'contact'];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // GSAP animations on mount
  useEffect(() => {
    const tl = gsap.timeline();
    
    tl.fromTo(navbarRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
    );

    tl.fromTo('.nav-item',
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'back.out(1.7)' },
      '-=0.3'
    );

    tl.fromTo('.nav-logo',
      { scale: 0, rotation: -180 },
      { scale: 1, rotation: 0, duration: 0.8, ease: 'elastic.out(1, 0.5)' },
      '-=0.5'
    );
  }, []);

  const openMenuModal = () => {
    setIsMobileMenuOpen(false);
    setIsMenuModalOpen(true);
  };

  const navItems = [
    { href: '#home', text: 'Home' },
    { href: '#services', text: 'Services' },
    { href: '#about', text: 'About' },
    { 
      text: 'Menu', 
      onClick: openMenuModal,
      isMenu: true 
    },
    { href: '#gallery', text: 'Gallery' },
    { href: '#contact', text: 'Contact' }
  ];

  return (
    <>
      <motion.nav 
        ref={navbarRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-xl shadow-lg py-2' 
            : 'bg-transparent py-4'
        }`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center gap-8">
            
            {/* Left Navigation Links */}
            <div className="hidden lg:flex items-center space-x-2 flex-1 justify-end">
              {navItems.slice(0, 3).map((item, index) => (
                <NavButton 
                  key={item.href || item.text}
                  href={item.href}
                  text={item.text}
                  onClick={item.onClick}
                  isActive={activeSection === item.href?.slice(1)}
                  index={index}
                  isScrolled={isScrolled}
                />
              ))}
            </div>

            {/* Centered Logo */}
            <motion.div 
              className="flex items-center justify-center flex-shrink-0 nav-logo mx-4"
              whileHover={{ 
                scale: 1.05,
                transition: { type: "spring", stiffness: 400 }
              }}
            >
              <div className="relative w-20 h-20 md:w-24 md:h-24 flex items-center justify-center">
                <motion.div
                  className="relative w-full h-full flex items-center justify-center overflow-hidden"
                  whileHover={{
                    scale: 1.08,
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.img 
                    src="/images/logo.png"
                    alt="Your Brand Logo"
                    className="w-full h-full object-contain"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    animate={{
                      x: [-100, 300],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      repeatDelay: 5,
                      ease: "easeInOut"
                    }}
                  />
                </motion.div>
                
                <motion.div
                  className="absolute -top-2 -right-2 w-3 h-3 bg-blue-500 rounded-full shadow-lg"
                  animate={{
                    y: [0, -12, 0],
                    scale: [1, 1.3, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <motion.div
                  className="absolute -bottom-2 -left-2 w-2 h-2 bg-purple-500 rounded-full shadow-lg"
                  animate={{
                    y: [0, 10, 0],
                    scale: [1, 1.4, 1],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5
                  }}
                />
              </div>
            </motion.div>
            
            {/* Right Navigation Links */}
            <div className="hidden lg:flex items-center space-x-2 flex-1 justify-start">
              {navItems.slice(3).map((item, index) => (
                <NavButton 
                  key={item.href || item.text}
                  href={item.href}
                  text={item.text}
                  onClick={item.onClick}
                  isActive={activeSection === item.href?.slice(1)}
                  index={index + 3}
                  isScrolled={isScrolled}
                />
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden lg:block ml-8">
              <motion.button
                className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold text-sm shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
                whileHover={{ 
                  scale: 1.05,
                  y: -2
                }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10">Book your stay</span>
                
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  initial={{ x: -100 }}
                  whileHover={{ x: 400 }}
                  transition={{ duration: 0.5 }}
                />
              </motion.button>
            </div>

            {/* Mobile menu button */}
            <motion.div 
              className="lg:hidden flex items-center space-x-4"
              whileTap={{ scale: 0.9 }}
            >
              <motion.button
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold text-xs shadow-lg relative overflow-hidden group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10">Book</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  initial={{ x: -50 }}
                  whileHover={{ x: 200 }}
                  transition={{ duration: 0.4 }}
                />
              </motion.button>

              <motion.button 
                className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 ${
                  isScrolled ? 'bg-gray-100' : 'bg-white/20 backdrop-blur-sm'
                }`}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                whileHover={{ 
                  scale: 1.1,
                  backgroundColor: isScrolled ? 'rgb(243, 244, 246)' : 'rgba(255,255,255,0.3)'
                }}
                animate={{
                  rotate: isMobileMenuOpen ? 90 : 0
                }}
              >
                <div className="flex flex-col items-center justify-center space-y-1">
                  <motion.span 
                    className={`block w-4 h-0.5 rounded-full ${
                      isScrolled ? 'bg-gray-900' : 'bg-white'
                    }`}
                    animate={{ 
                      rotate: isMobileMenuOpen ? 45 : 0,
                      y: isMobileMenuOpen ? 3 : 0
                    }}
                  />
                  <motion.span 
                    className={`block w-4 h-0.5 rounded-full ${
                      isScrolled ? 'bg-gray-900' : 'bg-white'
                    }`}
                    animate={{ opacity: isMobileMenuOpen ? 0 : 1 }}
                  />
                  <motion.span 
                    className={`block w-4 h-0.5 rounded-full ${
                      isScrolled ? 'bg-gray-900' : 'bg-white'
                    }`}
                    animate={{ 
                      rotate: isMobileMenuOpen ? -45 : 0,
                      y: isMobileMenuOpen ? -3 : 0
                    }}
                  />
                </div>
              </motion.button>
            </motion.div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div 
                className="lg:hidden absolute left-4 right-4 mt-4 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden"
                initial={{ opacity: 0, scale: 0.8, y: -20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: -20 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <div className="flex flex-col p-2">
                  <div className="flex justify-center py-4">
                    <div className="relative w-16 h-16 flex items-center justify-center">
                      <motion.img 
                        src="/images/logo.png"
                        alt="Your Brand Logo"
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>
                  
                  {navItems.map((item, index) => (
                    <MobileNavButton 
                      key={item.href || item.text}
                      href={item.href}
                      text={item.text}
                      onClick={item.onClick || (() => setIsMobileMenuOpen(false))}
                      isActive={activeSection === item.href?.slice(1)}
                      index={index}
                    />
                  ))}
                  <div className="p-4 mt-2">
                    <motion.button
                      className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg relative overflow-hidden group"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="relative z-10">Book your stay</span>
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        initial={{ x: -100 }}
                        whileHover={{ x: 400 }}
                        transition={{ duration: 0.5 }}
                      />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>

      {/* PDF Menu Modal */}
      <AnimatePresence>
        {isMenuModalOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMenuModalOpen(false)}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl h-[90vh] flex flex-col"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex justify-between items-center p-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900">Our Menu</h2>
                <motion.button
                  className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsMenuModalOpen(false)}
                >
                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </motion.button>
              </div>

              {/* PDF Viewer */}
              <div className="flex-1 p-6">
                <div className="w-full h-full border-2 border-gray-300 rounded-lg overflow-hidden">
                  <iframe
                    src="/menu.pdf"
                    className="w-full h-full"
                    title="Menu PDF"
                  />
                  
                  {/* Fallback message if PDF doesn't load */}
                  <div className="hidden md:flex items-center justify-center h-full bg-gray-50">
                    <div className="text-center text-gray-500">
                      <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <p className="text-lg font-medium mb-2">Menu PDF</p>
                      <p className="text-sm">Click below to download our menu</p>
                      <motion.a
                        href="/menu.pdf"
                        download
                        className="inline-block mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Download Menu
                      </motion.a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Download Button for Mobile */}
              <div className="p-6 border-t border-gray-200 md:hidden">
                <motion.a
                  href="/menu.pdf"
                  download
                  className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium text-center block hover:bg-blue-700 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Download Menu PDF
                </motion.a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// Desktop Navigation Button Component
const NavButton = ({ href, text, isActive, index, isScrolled, onClick }) => {
  if (onClick) {
    return (
      <motion.button 
        onClick={onClick}
        className={`nav-item relative px-5 py-2.5 rounded-xl font-medium text-sm whitespace-nowrap transition-all duration-300 group ${
          isActive 
            ? 'text-blue-600 bg-blue-50 scale-105' 
            : isScrolled 
              ? 'text-gray-700 hover:text-blue-600 hover:bg-gray-50' 
              : 'text-white hover:text-white hover:bg-white/10'
        }`}
        whileHover={{ 
          scale: 1.05,
          y: -1,
          transition: { type: "spring", stiffness: 400 }
        }}
        whileTap={{ scale: 0.95 }}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: index * 0.1 + 0.5 }}
      >
        <span className="relative z-10 flex items-center">
          {text}
        </span>
        
        {!isActive && (
          <motion.div
            className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 ${
              isScrolled ? 'bg-gray-100' : 'bg-white/10'
            }`}
            initial={{ scale: 0.8 }}
            whileHover={{ scale: 1 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </motion.button>
    );
  }

  return (
    <motion.a 
      href={href} 
      className={`nav-item relative px-5 py-2.5 rounded-xl font-medium text-sm whitespace-nowrap transition-all duration-300 group ${
        isActive 
          ? 'text-blue-600 bg-blue-50 scale-105' 
          : isScrolled 
            ? 'text-gray-700 hover:text-blue-600 hover:bg-gray-50' 
            : 'text-white hover:text-white hover:bg-white/10'
      }`}
      whileHover={{ 
        scale: 1.05,
        y: -1,
        transition: { type: "spring", stiffness: 400 }
      }}
      whileTap={{ scale: 0.95 }}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: index * 0.1 + 0.5 }}
    >
      <span className="relative z-10 flex items-center">
        {text}
        {isActive && (
          <motion.span
            className="ml-2 w-1.5 h-1.5 bg-blue-600 rounded-full"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500 }}
          />
        )}
      </span>
      
      {!isActive && (
        <motion.div
          className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 ${
            isScrolled ? 'bg-gray-100' : 'bg-white/10'
          }`}
          initial={{ scale: 0.8 }}
          whileHover={{ scale: 1 }}
          transition={{ duration: 0.2 }}
        />
      )}
    </motion.a>
  );
};

// Mobile Navigation Button Component
const MobileNavButton = ({ href, text, isActive, onClick, index }) => {
  if (onClick) {
    return (
      <motion.button 
        onClick={onClick}
        className={`relative px-6 py-4 rounded-xl font-medium text-center text-sm transition-all duration-300 ${
          isActive 
            ? 'bg-blue-50 text-blue-600' 
            : 'text-gray-700 hover:bg-gray-50'
        }`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: index * 0.1 }}
      >
        <span className="relative z-10 flex items-center justify-center">
          {text}
        </span>
      </motion.button>
    );
  }

  return (
    <motion.a 
      href={href} 
      onClick={onClick}
      className={`relative px-6 py-4 rounded-xl font-medium text-center text-sm transition-all duration-300 ${
        isActive 
          ? 'bg-blue-50 text-blue-600' 
          : 'text-gray-700 hover:bg-gray-50'
      }`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: index * 0.1 }}
    >
      <span className="relative z-10 flex items-center justify-center">
        {text}
        {isActive && (
          <motion.span
            className="ml-2 w-1.5 h-1.5 bg-blue-600 rounded-full"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500 }}
          />
        )}
      </span>
    </motion.a>
  );
};

export default Navbar;