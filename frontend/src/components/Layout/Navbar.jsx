import React, { useState } from 'react';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-espresso via-espresso to-walnut shadow-2xl fixed top-0 left-0 right-0 z-50 border-b border-gold border-opacity-30 py-4 w-full">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center gap-8">
          
          {/* Left Navigation Links */}
          <div className="hidden md:flex items-center space-x-6 flex-1 justify-end">
            <NavButton href="#home" text="Home" />
            <NavButton href="#services" text="Services" />
            <NavButton href="#about" text="About Us" />
          </div>

          {/* Centered Logo - Ready for your custom logo */}
          <div className="flex items-center justify-center flex-shrink-0">
            <div className="relative w-20 h-20 flex items-center justify-center">
              <img 
                src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80"
                alt="Numba Cafe Logo"
                className="w-full h-full rounded-full object-cover border-3 border-gold shadow-2xl"
              />
            </div>
          </div>
          
          {/* Right Navigation Links */}
          <div className="hidden md:flex items-center space-x-6 flex-1 justify-start">
            <NavButton href="#menu" text="Menu" />
            <NavButton href="#gallery" text="Gallery" />
            <NavButton href="#contact" text="Contact" />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden absolute right-4">
            <button 
              className="bg-gradient-to-br from-gold to-walnut text-espresso px-4 py-3 rounded-full font-semibold shadow-2xl border border-gold border-opacity-30"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-gradient-to-b from-espresso to-walnut border-t border-gold border-opacity-30 py-4 mt-3 rounded-b-2xl shadow-2xl">
            <div className="flex flex-col space-y-3 px-4">
              <MobileNavButton href="#home" text="Home" onClick={() => setIsMobileMenuOpen(false)} />
              <MobileNavButton href="#services" text="Services" onClick={() => setIsMobileMenuOpen(false)} />
              <MobileNavButton href="#about" text="About Us" onClick={() => setIsMobileMenuOpen(false)} />
              <MobileNavButton href="#menu" text="Menu" onClick={() => setIsMobileMenuOpen(false)} />
              <MobileNavButton href="#gallery" text="Gallery" onClick={() => setIsMobileMenuOpen(false)} />
              <MobileNavButton href="#contact" text="Contact" onClick={() => setIsMobileMenuOpen(false)} />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

// Desktop Navigation Button Component
const NavButton = ({ href, text }) => {
  return (
    <a 
      href={href} 
      className="bg-gradient-to-br from-gold to-beige text-espresso px-6 py-3 rounded-full font-semibold shadow-lg text-sm border border-gold border-opacity-30 relative overflow-hidden whitespace-nowrap hover:shadow-xl hover:scale-105 transition-all duration-300"
    >
      <span className="relative z-10">{text}</span>
    </a>
  );
};

// Mobile Navigation Button Component
const MobileNavButton = ({ href, text, onClick }) => {
  return (
    <a 
      href={href} 
      onClick={onClick}
      className="bg-gradient-to-br from-gold to-beige text-espresso px-6 py-3 rounded-full font-semibold shadow-lg text-center text-sm border border-gold border-opacity-30"
    >
      {text}
    </a>
  );
};

export default Navbar;