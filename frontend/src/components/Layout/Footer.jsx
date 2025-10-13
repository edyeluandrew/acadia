import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-espresso text-beige py-12 w-full">
      <div className="max-w-7xl mx-auto px-4">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold text-gold mb-4">
              Numba Cafe & Boutique Hotel
            </h3>
            <p className="text-beige mb-4 max-w-md">
              Experience the perfect blend of artisan coffee and boutique hospitality 
              in the heart of Acadia. Where every stay feels like home.
            </p>
            <div className="flex space-x-4">
              <span className="text-gold">📱</span>
              <span className="text-gold">📷</span>
              <span className="text-gold">🐦</span>
              <span className="text-gold">📘</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-gold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#home" className="hover:text-gold">Home</a></li>
              <li><a href="#cafe" className="hover:text-gold">Cafe Menu</a></li>
              <li><a href="#hotel" className="hover:text-gold">Hotel Rooms</a></li>
              <li><a href="#booking" className="hover:text-gold">Book Now</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-gold mb-4">Contact</h4>
            <ul className="space-y-2">
              <li>123 Acadia Lodge Road</li>
              <li>Bar Harbor, ME 04609</li>
              <li>+1 (555) 123-4567</li>
              <li>hello@numbacafe.com</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gold border-opacity-20 pt-8 text-center">
          <p className="text-beige text-opacity-70">
            © 2024 Numba Cafe & Boutique Hotel by Acadia Lodges. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;