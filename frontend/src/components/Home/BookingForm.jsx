import React, { useState } from 'react';

const BookingForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    telephone: '',
    roomType: 'single',
    checkIn: '',
    checkOut: '',
    guests: 1,
    specialRequests: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Booking submitted:', formData);
    alert('Thank you for your booking request! We will contact you shortly.');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-espresso bg-opacity-90 z-50 flex items-center justify-center p-4">
      <div className="bg-beige rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-espresso to-walnut p-6 rounded-t-2xl">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-bold text-gold">Book Your Stay</h2>
            <button
              onClick={onClose}
              className="text-gold hover:text-beige transition duration-300 text-2xl"
            >
              ×
            </button>
          </div>
          <p className="text-beige mt-2">Complete the form below to reserve your perfect getaway</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Personal Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-espresso font-semibold mb-2">
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-walnut border-opacity-30 focus:outline-none focus:ring-2 focus:ring-gold bg-stone"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label className="block text-espresso font-semibold mb-2">
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-walnut border-opacity-30 focus:outline-none focus:ring-2 focus:ring-gold bg-stone"
                placeholder="your.email@example.com"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-espresso font-semibold mb-2">
                Telephone *
              </label>
              <input
                type="tel"
                name="telephone"
                value={formData.telephone}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-walnut border-opacity-30 focus:outline-none focus:ring-2 focus:ring-gold bg-stone"
                placeholder="+1 (555) 123-4567"
              />
            </div>

            <div>
              <label className="block text-espresso font-semibold mb-2">
                Number of Guests *
              </label>
              <select
                name="guests"
                value={formData.guests}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-walnut border-opacity-30 focus:outline-none focus:ring-2 focus:ring-gold bg-stone"
              >
                {[1, 2, 3, 4, 5, 6].map(num => (
                  <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Room Type */}
          <div>
            <label className="block text-espresso font-semibold mb-2">
              Room Type *
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { value: 'single', label: 'Single Room', description: 'Perfect for solo travelers' },
                { value: 'double', label: 'Double Room', description: 'Ideal for couples' },
                { value: 'family', label: 'Family Suite', description: 'Spacious for families' }
              ].map(room => (
                <label
                  key={room.value}
                  className={`relative flex flex-col p-4 border-2 rounded-lg cursor-pointer transition-all duration-300 ${
                    formData.roomType === room.value
                      ? 'border-gold bg-gold bg-opacity-10'
                      : 'border-walnut border-opacity-30 hover:border-gold'
                  }`}
                >
                  <input
                    type="radio"
                    name="roomType"
                    value={room.value}
                    checked={formData.roomType === room.value}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <span className="font-semibold text-espresso">{room.label}</span>
                  <span className="text-sm text-walnut mt-1">{room.description}</span>
                  {formData.roomType === room.value && (
                    <div className="absolute top-2 right-2 w-4 h-4 bg-gold rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-espresso rounded-full"></div>
                    </div>
                  )}
                </label>
              ))}
            </div>
          </div>

          {/* Date Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-espresso font-semibold mb-2">
                Check-in Date *
              </label>
              <input
                type="date"
                name="checkIn"
                value={formData.checkIn}
                onChange={handleChange}
                required
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-3 rounded-lg border border-walnut border-opacity-30 focus:outline-none focus:ring-2 focus:ring-gold bg-stone"
              />
            </div>

            <div>
              <label className="block text-espresso font-semibold mb-2">
                Check-out Date *
              </label>
              <input
                type="date"
                name="checkOut"
                value={formData.checkOut}
                onChange={handleChange}
                required
                min={formData.checkIn || new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-3 rounded-lg border border-walnut border-opacity-30 focus:outline-none focus:ring-2 focus:ring-gold bg-stone"
              />
            </div>
          </div>

          {/* Special Requests */}
          <div>
            <label className="block text-espresso font-semibold mb-2">
              Special Requests
            </label>
            <textarea
              name="specialRequests"
              value={formData.specialRequests}
              onChange={handleChange}
              rows="3"
              className="w-full px-4 py-3 rounded-lg border border-walnut border-opacity-30 focus:outline-none focus:ring-2 focus:ring-gold bg-stone resize-none"
              placeholder="Any special requirements or preferences..."
            />
          </div>

          {/* Form Actions */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              type="submit"
              className="flex-1 bg-gold text-espresso px-8 py-4 rounded-lg font-semibold hover:bg-opacity-90 transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Confirm Booking
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border-2 border-walnut text-espresso px-8 py-4 rounded-lg font-semibold hover:bg-walnut hover:text-beige transition duration-300"
            >
              Cancel
            </button>
          </div>

          <p className="text-walnut text-sm text-center">
            * Required fields. We'll contact you within 24 hours to confirm your reservation.
          </p>
        </form>
      </div>
    </div>
  );
};

export default BookingForm;