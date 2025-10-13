import React from 'react';

const Contact = () => {
  return (
    <section id="contact" className="py-20 bg-stone">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-espresso mb-4">
            Get In Touch
          </h2>
          <p className="text-xl text-walnut max-w-3xl mx-auto">
            We'd love to hear from you. Visit us, give us a call, or send us a message.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-espresso mb-6">Contact Information</h3>
              
              {/* Address */}
              <div className="flex items-start mb-6">
                <div className="w-10 h-10 bg-gold rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <span className="text-espresso">📍</span>
                </div>
                <div>
                  <h4 className="font-semibold text-espresso">Our Location</h4>
                  <p className="text-walnut">123 Acadia Lodge Road<br />Bar Harbor, ME 04609</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start mb-6">
                <div className="w-10 h-10 bg-gold rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <span className="text-espresso">📞</span>
                </div>
                <div>
                  <h4 className="font-semibold text-espresso">Phone Number</h4>
                  <p className="text-walnut">+1 (555) 123-4567</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start mb-6">
                <div className="w-10 h-10 bg-gold rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <span className="text-espresso">✉️</span>
                </div>
                <div>
                  <h4 className="font-semibold text-espresso">Email</h4>
                  <p className="text-walnut">hello@numbacafe.com</p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start">
                <div className="w-10 h-10 bg-gold rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <span className="text-espresso">🕒</span>
                </div>
                <div>
                  <h4 className="font-semibold text-espresso">Hours</h4>
                  <p className="text-walnut">
                    Cafe: 7:00 AM - 9:00 PM Daily<br />
                    Hotel: 24/7 Front Desk
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-beige p-8 rounded-2xl shadow-lg">
            <h3 className="text-2xl font-bold text-espresso mb-6">Send us a Message</h3>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-espresso mb-2">First Name</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 rounded-lg border border-walnut border-opacity-30 focus:outline-none focus:ring-2 focus:ring-gold"
                    placeholder="Your first name"
                  />
                </div>
                <div>
                  <label className="block text-espresso mb-2">Last Name</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 rounded-lg border border-walnut border-opacity-30 focus:outline-none focus:ring-2 focus:ring-gold"
                    placeholder="Your last name"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-espresso mb-2">Email</label>
                <input 
                  type="email" 
                  className="w-full px-4 py-3 rounded-lg border border-walnut border-opacity-30 focus:outline-none focus:ring-2 focus:ring-gold"
                  placeholder="your.email@example.com"
                />
              </div>
              
              <div>
                <label className="block text-espresso mb-2">Subject</label>
                <select className="w-full px-4 py-3 rounded-lg border border-walnut border-opacity-30 focus:outline-none focus:ring-2 focus:ring-gold">
                  <option>General Inquiry</option>
                  <option>Hotel Booking</option>
                  <option>Cafe Reservation</option>
                  <option>Event Inquiry</option>
                  <option>Feedback</option>
                </select>
              </div>
              
              <div>
                <label className="block text-espresso mb-2">Message</label>
                <textarea 
                  rows="4"
                  className="w-full px-4 py-3 rounded-lg border border-walnut border-opacity-30 focus:outline-none focus:ring-2 focus:ring-gold"
                  placeholder="Your message here..."
                ></textarea>
              </div>
              
              <button 
                type="submit"
                className="w-full bg-gold text-espresso py-4 rounded-lg font-semibold hover:bg-opacity-90 transition duration-300"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Contact;