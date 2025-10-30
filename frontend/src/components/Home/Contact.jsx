import React, { useState } from 'react';
import { MapPin, Phone, Mail, Globe, Clock, Send } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      alert('Thank you for your message! We will get back to you soon.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      setIsSubmitting(false);
    }, 2000);
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone Numbers',
      details: ['+256 39421455', '+256 757 004478'],
      link: 'tel:+25639421455'
    },
    {
      icon: Mail,
      title: 'Email Address',
      details: ['arcadialodgesuganda@gmail.com'],
      link: 'mailto:arcadialodgesuganda@gmail.com'
    },
    {
      icon: Globe,
      title: 'Website',
      details: ['www.arcadialodges.com'],
      link: 'https://www.arcadialodges.com'
    },
    {
      icon: MapPin,
      title: 'Location',
      details: ['Heart of Kabale Town', 'Uganda'],
      link: 'https://maps.google.com/?q=Kabale+Town,+Uganda'
    },
    {
      icon: Clock,
      title: 'Restaurant Hours',
      details: ['Monday - Sunday: 7:00 AM - 10:00 PM'],
      link: null
    }
  ];

  return (
    <section id="contact" className="py-20 bg-beige">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-espresso mb-4">
            Contact Numba Hotel
          </h2>
          <p className="text-xl text-walnut max-w-3xl mx-auto">
            Get in touch with us for reservations, inquiries, or to plan your unforgettable experience
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-espresso mb-6">
                Get In Touch
              </h3>
              <p className="text-walnut mb-8 leading-relaxed">
                We're here to help you plan your perfect stay. Whether you're interested in 
                gorilla trekking adventures, romantic getaways, or simply want to experience 
                the finest Ugandan cuisine, our team is ready to assist you.
              </p>
            </div>

            {/* Contact Details */}
            <div className="space-y-6">
              {contactInfo.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div 
                    key={index}
                    className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-gold to-walnut rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-white" strokeWidth={2} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-espresso mb-1">
                        {item.title}
                      </h4>
                      {item.details.map((detail, detailIndex) => (
                        <div key={detailIndex}>
                          {item.link ? (
                            <a 
                              href={item.link} 
                              className="text-walnut hover:text-gold transition-colors"
                              target={item.title === 'Website' ? '_blank' : '_self'}
                              rel={item.title === 'Website' ? 'noopener noreferrer' : ''}
                            >
                              {detail}
                            </a>
                          ) : (
                            <p className="text-walnut">{detail}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Additional Info */}
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h4 className="font-bold text-espresso mb-3">
                Why Choose Numba Hotel?
              </h4>
              <ul className="text-walnut space-y-2">
                <li>• Six beautifully ensuite boutique rooms</li>
                <li>• Delectable Ugandan cuisine</li>
                <li>• Perfect base for gorilla trekking</li>
                <li>• Romantic getaway destination</li>
                <li>• Tranquil retreat in Kabale town</li>
              </ul>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h3 className="text-2xl font-bold text-espresso mb-6">
              Send us a Message
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-espresso mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-walnut rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent transition-all"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-espresso mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-walnut rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent transition-all"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-espresso mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-walnut rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent transition-all"
                    placeholder="+256 XXX XXX XXX"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-espresso mb-2">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-walnut rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent transition-all"
                  >
                    <option value="">Select a subject</option>
                    <option value="reservation">Room Reservation</option>
                    <option value="restaurant">Restaurant Inquiry</option>
                    <option value="gorilla-trekking">Gorilla Trekking</option>
                    <option value="events">Events & Catering</option>
                    <option value="general">General Inquiry</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-espresso mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="6"
                  className="w-full px-4 py-3 border border-walnut rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent transition-all resize-vertical"
                  placeholder="Tell us about your inquiry or how we can help you plan your stay..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-gold to-walnut text-white py-4 px-6 rounded-lg font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
              >
                <Send className="w-5 h-5" />
                <span>
                  {isSubmitting ? 'Sending Message...' : 'Send Message'}
                </span>
              </button>
            </form>

            {/* Quick Actions */}
            <div className="mt-8 pt-8 border-t border-walnut border-opacity-20">
              <h4 className="font-bold text-espresso mb-4 text-center">
                Quick Actions
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <a
                  href="tel:+25639421455"
                  className="bg-espresso text-white py-3 px-4 rounded-lg text-center hover:bg-walnut transition-colors"
                >
                  Call Now
                </a>
                <a
                  href="mailto:arcadialodgesuganda@gmail.com"
                  className="bg-gold text-espresso py-3 px-4 rounded-lg text-center hover:bg-beige transition-colors"
                >
                  Email Us
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-16 bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="h-96 bg-gradient-to-br from-espresso to-walnut flex items-center justify-center">
            <div className="text-center text-white">
              <MapPin className="w-16 h-16 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">Visit Us in Kabale</h3>
              <p className="text-beige">Heart of Kabale Town, Uganda</p>
              <a 
                href="https://maps.google.com/?q=Kabale+Town,+Uganda"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 bg-gold text-espresso px-6 py-3 rounded-lg font-bold hover:bg-beige transition-colors"
              >
                View on Google Maps
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;