import React from 'react';
import { Smartphone, Instagram, Twitter, Facebook, MapPin, Phone, Mail } from 'lucide-react';

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
              <a href="#" className="text-gold hover:text-beige transition-colors" aria-label="Phone">
                <Smartphone className="w-5 h-5" strokeWidth={2} />
              </a>
              <a href="#" className="text-gold hover:text-beige transition-colors" aria-label="Instagram">
                <Instagram className="w-5 h-5" strokeWidth={2} />
              </a>
              <a href="#" className="text-gold hover:text-beige transition-colors" aria-label="Twitter">
                <Twitter className="w-5 h-5" strokeWidth={2} />
              </a>
              <a href="#" className="text-gold hover:text-beige transition-colors" aria-label="Facebook">
                <Facebook className="w-5 h-5" strokeWidth={2} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-gold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#home" className="hover:text-gold transition-colors">Home</a></li>
              <li><a href="#services" className="hover:text-gold transition-colors">Services</a></li>
              <li><a href="#about" className="hover:text-gold transition-colors">About Us</a></li>
              <li><a href="#booking" className="hover:text-gold transition-colors">Book Now</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-gold mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gold flex-shrink-0" strokeWidth={2} />
                <span>Kabale, Uganda</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gold flex-shrink-0" strokeWidth={2} />
                <span>+256 757 004478</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gold flex-shrink-0" strokeWidth={2} />
                <span>info@numbacafe.com</span>
              </li>
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