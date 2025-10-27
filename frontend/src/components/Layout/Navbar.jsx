import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const navbarRef = useRef(null);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);

      // Update active section based on scroll position
      const sections = ['home', 'services', 'about', 'menu', 'gallery', 'contact'];
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
    
    // Animate navbar entrance
    tl.fromTo(navbarRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
    );

    // Stagger animation for nav items
    tl.fromTo('.nav-item',
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'back.out(1.7)' },
      '-=0.3'
    );

    // Logo animation
    tl.fromTo('.nav-logo',
      { scale: 0, rotation: -180 },
      { scale: 1, rotation: 0, duration: 0.8, ease: 'elastic.out(1, 0.5)' },
      '-=0.5'
    );
  }, []);

  const navItems = [
    { href: '#home', text: 'Home' },
    { href: '#services', text: 'Services' },
    { href: '#about', text: 'About Us' },
    { href: '#menu', text: 'Menu' },
    { href: '#gallery', text: 'Gallery' },
    { href: '#contact', text: 'Contact' }
  ];

  return (
    <motion.nav 
      ref={navbarRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-espresso/95 backdrop-blur-xl shadow-2xl py-2 border-b border-gold/20' 
          : 'bg-gradient-to-r from-espresso/90 via-espresso/80 to-walnut/90 backdrop-blur-lg py-4'
      }`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center gap-8">
          
          {/* Left Navigation Links */}
          <div className="hidden md:flex items-center space-x-4 flex-1 justify-end">
            {navItems.slice(0, 3).map((item, index) => (
              <NavButton 
                key={item.href}
                href={item.href} 
                text={item.text}
                isActive={activeSection === item.href.slice(1)}
                index={index}
              />
            ))}
          </div>

          {/* Centered Logo */}
          <motion.div 
            className="flex items-center justify-center flex-shrink-0 nav-logo"
            whileHover={{ 
              scale: 1.1,
              rotate: 5,
              transition: { type: "spring", stiffness: 300 }
            }}
          >
            <div className="relative w-16 h-16 md:w-20 md:h-20 flex items-center justify-center">
              {/* Animated border */}
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-r from-gold via-beige to-gold p-0.5"
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                <div className="w-full h-full rounded-full bg-espresso overflow-hidden">
                  <motion.img 
                    src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80"
                    alt="Numba Cafe Logo"
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.2 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </motion.div>
              
              {/* Pulsing glow effect */}
              <motion.div
                className="absolute inset-0 rounded-full bg-gold opacity-20"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.2, 0.4, 0.2],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>
          </motion.div>
          
          {/* Right Navigation Links */}
          <div className="hidden md:flex items-center space-x-4 flex-1 justify-start">
            {navItems.slice(3).map((item, index) => (
              <NavButton 
                key={item.href}
                href={item.href} 
                text={item.text}
                isActive={activeSection === item.href.slice(1)}
                index={index + 3}
              />
            ))}
          </div>

          {/* Mobile menu button */}
          <motion.div 
            className="md:hidden absolute right-4"
            whileTap={{ scale: 0.9 }}
          >
            <motion.button 
              className="bg-gradient-to-br from-gold to-beige text-espresso w-12 h-12 rounded-full font-semibold shadow-2xl border border-gold border-opacity-30 relative overflow-hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileHover={{ 
                scale: 1.1,
                boxShadow: "0 10px 30px rgba(212, 175, 55, 0.4)"
              }}
              animate={{
                rotate: isMobileMenuOpen ? 90 : 0
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} 
                  />
                </svg>
              </div>
              
              {/* Button glow effect */}
              <motion.div
                className="absolute inset-0 bg-gold rounded-full"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: isMobileMenuOpen ? 1.5 : 0, 
                  opacity: isMobileMenuOpen ? 0 : 0 
                }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          </motion.div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              className="md:hidden absolute left-4 right-4 mt-4 bg-espresso/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gold/20 overflow-hidden"
              initial={{ opacity: 0, scale: 0.8, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -20 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="flex flex-col p-4 space-y-3">
                {navItems.map((item, index) => (
                  <MobileNavButton 
                    key={item.href}
                    href={item.href} 
                    text={item.text}
                    isActive={activeSection === item.href.slice(1)}
                    onClick={() => setIsMobileMenuOpen(false)}
                    index={index}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

// Desktop Navigation Button Component
const NavButton = ({ href, text, isActive, index }) => {
  return (
    <motion.a 
      href={href} 
      className={`nav-item relative px-6 py-3 rounded-full font-semibold text-sm border backdrop-blur-sm whitespace-nowrap transition-all duration-300 group ${
        isActive 
          ? 'bg-gradient-to-br from-gold to-beige text-espresso border-gold shadow-2xl scale-105' 
          : 'bg-beige/10 text-beige border-beige/20 hover:bg-beige/20'
      }`}
      whileHover={{ 
        scale: 1.05,
        y: -2,
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
            className="ml-2 w-2 h-2 bg-espresso rounded-full"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500 }}
          />
        )}
      </span>
      
      {/* Hover effect */}
      {!isActive && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-gold/20 to-beige/20 rounded-full opacity-0 group-hover:opacity-100"
          initial={{ scale: 0.8 }}
          whileHover={{ scale: 1 }}
          transition={{ duration: 0.2 }}
        />
      )}
      
      {/* Active indicator pulse */}
      {isActive && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-gold to-beige rounded-full"
          initial={{ scale: 1 }}
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}
    </motion.a>
  );
};

// Mobile Navigation Button Component
const MobileNavButton = ({ href, text, isActive, onClick, index }) => {
  return (
    <motion.a 
      href={href} 
      onClick={onClick}
      className={`relative px-6 py-4 rounded-xl font-semibold text-center text-sm border backdrop-blur-sm transition-all duration-300 ${
        isActive 
          ? 'bg-gradient-to-br from-gold to-beige text-espresso border-gold shadow-lg' 
          : 'bg-beige/10 text-beige border-beige/20'
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
            className="ml-2 w-2 h-2 bg-espresso rounded-full"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500 }}
          />
        )}
      </span>
      
      {/* Active background animation */}
      {isActive && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-gold to-beige rounded-xl"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 400 }}
        />
      )}
    </motion.a>
  );
};

export default Navbar;