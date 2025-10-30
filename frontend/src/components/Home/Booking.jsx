
import React, { useState, useEffect } from 'react';
import { 
  Bed, 
  Users, 
  Wifi, 
  Coffee, 
  Tv, 
  Wind, 
  Car, 
  CheckCircle, 
  XCircle, 
  Loader,
  Calendar,
  X,
  Star,
  Shield,
  Search
} from 'lucide-react';

const Booking = ({ isOpen, onClose, serviceId }) => {
  const [availableRoomTypes, setAvailableRoomTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedRoomType, setSelectedRoomType] = useState(null);
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [guests, setGuests] = useState(1);
  const [step, setStep] = useState(1);
  
  const [guestInfo, setGuestInfo] = useState({
    full_name: '',
    email: '',
    phone: '',
    special_requests: ''
  });

  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  const getMinCheckOutDate = () => {
    if (!checkInDate) return getTomorrowDate();
    const minDate = new Date(checkInDate);
    minDate.setDate(minDate.getDate() + 1);
    return minDate.toISOString().split('T')[0];
  };

  const fetchAvailableRoomTypes = async (checkIn, checkOut) => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Fetching room types...');
      const roomTypesResponse = await fetch(
        'https://hotel-numba-qlg2.onrender.com/api/v1/rooms/room-types/'
      );
      
      if (!roomTypesResponse.ok) {
        throw new Error('Failed to fetch room types');
      }
      
      const roomTypesData = await roomTypesResponse.json();
      const roomTypes = roomTypesData.results || roomTypesData;
      
      console.log('Room types fetched:', roomTypes);
      
      // Check availability for each room type
      const availabilityChecks = await Promise.all(
        roomTypes.map(async (roomType) => {
          try {
            console.log(`Checking availability for ${roomType.name}...`);
            
            const availResponse = await fetch(
              'https://hotel-numba-qlg2.onrender.com/api/v1/bookings/check-availability/',
              {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  room_type_id: roomType.id,
                  check_in: checkIn,
                  check_out: checkOut
                })
              }
            );
            
            if (!availResponse.ok) {
              console.error(`Availability check failed for ${roomType.name}`);
              return { 
                ...roomType, 
                is_available: false, 
                available_count: 0,
                error: 'Failed to check availability'
              };
            }
            
            const availData = await availResponse.json();
            console.log(`Availability for ${roomType.name}:`, availData);
            
            return {
              ...roomType,
              is_available: availData.available === true && availData.available_count > 0,
              available_count: availData.available_count || 0,
              nights: availData.nights,
              total_price: availData.total_price,
              price_per_night: availData.price_per_night || roomType.base_price
            };
          } catch (err) {
            console.error(`Error checking availability for ${roomType.name}:`, err);
            return { 
              ...roomType, 
              is_available: false, 
              available_count: 0,
              error: err.message
            };
          }
        })
      );
      
      console.log('All availability checks complete:', availabilityChecks);
      setAvailableRoomTypes(availabilityChecks);
      setStep(2);
      
    } catch (err) {
      console.error('Error fetching room types:', err);
      setError('Failed to fetch available rooms. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const createBooking = async () => {
    try {
      setLoading(true);
      
      const bookingData = {
        full_name: guestInfo.full_name,
        email: guestInfo.email,
        phone: guestInfo.phone,
        room_type: selectedRoomType.id,
        check_in: checkInDate,
        check_out: checkOutDate,
        guests: guests,
        special_requests: guestInfo.special_requests
      };
      
      console.log('Creating booking:', bookingData);
      
      const response = await fetch(
        'https://hotel-numba-qlg2.onrender.com/api/v1/bookings/create/',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(bookingData)
        }
      );
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Booking failed');
      }
      
      const result = await response.json();
      console.log('Booking created:', result);
      
      alert('Booking request submitted successfully! You will receive a confirmation email shortly.');
      onClose();
      
    } catch (err) {
      console.error('Error creating booking:', err);
      setError(err.message || 'Failed to create booking. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isOpen) {
      setAvailableRoomTypes([]);
      setSelectedRoomType(null);
      setCheckInDate('');
      setCheckOutDate('');
      setGuests(1);
      setGuestInfo({
        full_name: '',
        email: '',
        phone: '',
        special_requests: ''
      });
      setError(null);
      setStep(1);
      setLoading(false);
    }
  }, [isOpen]);

  const handleCheckRooms = () => {
    if (!checkInDate || !checkOutDate) {
      alert('Please select both check-in and check-out dates');
      return;
    }
    
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    
    if (checkOut <= checkIn) {
      alert('Check-out date must be after check-in date');
      return;
    }
    
    fetchAvailableRoomTypes(checkInDate, checkOutDate);
  };

  const handleRoomTypeSelect = (roomType) => {
    if (roomType.is_available) {
      setSelectedRoomType(roomType);
      setStep(3);
    } else {
      alert('This room type is not available for the selected dates. Please choose another room type or change your dates.');
    }
  };

  const handleBookNow = async () => {
    if (!selectedRoomType) return;
    
    if (!guestInfo.full_name || !guestInfo.email) {
      alert('Please fill in your name and email');
      return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(guestInfo.email)) {
      alert('Please enter a valid email address');
      return;
    }
    
    await createBooking();
  };

  const calculateTotalPrice = () => {
    if (!checkInDate || !checkOutDate || !selectedRoomType) return 0;
    
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
    
    return nights * (parseFloat(selectedRoomType.base_price) || parseFloat(selectedRoomType.price_per_night) || 0);
  };

  const calculateNights = () => {
    if (!checkInDate || !checkOutDate) return 0;
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    return Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
  };

  const handleBack = () => {
    if (step === 2) {
      setStep(1);
      setAvailableRoomTypes([]);
    } else if (step === 3) {
      setStep(2);
      setSelectedRoomType(null);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-4">
              {step > 1 && (
                <button
                  onClick={handleBack}
                  className="text-gray-400 hover:text-gray-600 transition-colors p-2"
                >
                  <X className="w-6 h-6 rotate-45" />
                </button>
              )}
              <h2 className="text-2xl font-bold text-gray-900">
                {step === 1 && 'Select Your Dates'}
                {step === 2 && 'Choose Your Room Type'}
                {step === 3 && 'Complete Booking'}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors p-2"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <div className="flex items-center justify-center mb-4">
            <div className="flex items-center">
              {[1, 2, 3].map((stepNumber) => (
                <React.Fragment key={stepNumber}>
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                    step >= stepNumber ? 'bg-amber-500 text-white' : 'bg-gray-300 text-gray-600'
                  } font-semibold text-sm`}>
                    {stepNumber}
                  </div>
                  {stepNumber < 3 && (
                    <div className={`w-16 h-1 mx-2 ${
                      step > stepNumber ? 'bg-amber-500' : 'bg-gray-300'
                    }`} />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {step === 1 ? (
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
                <Calendar className="w-5 h-5 text-amber-500" />
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">Check-in Date</label>
                  <input
                    type="date"
                    value={checkInDate}
                    min={getTomorrowDate()}
                    onChange={(e) => setCheckInDate(e.target.value)}
                    className="mt-1 bg-transparent border-none p-0 text-gray-900 focus:outline-none focus:ring-0 w-full"
                  />
                </div>
              </div>
              
              <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
                <Calendar className="w-5 h-5 text-amber-500" />
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">Check-out Date</label>
                  <input
                    type="date"
                    value={checkOutDate}
                    min={getMinCheckOutDate()}
                    onChange={(e) => setCheckOutDate(e.target.value)}
                    className="mt-1 bg-transparent border-none p-0 text-gray-900 focus:outline-none focus:ring-0 w-full"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="mt-4 bg-amber-50 border border-amber-200 rounded-lg p-4">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-6">
                  <div>
                    <span className="text-sm text-gray-600">Check-in</span>
                    <p className="font-semibold text-gray-900">{checkInDate}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Check-out</span>
                    <p className="font-semibold text-gray-900">{checkOutDate}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Nights</span>
                    <p className="font-semibold text-gray-900">{calculateNights()}</p>
                  </div>
                </div>
                <button
                  onClick={() => setStep(1)}
                  className="text-amber-600 hover:text-amber-700 text-sm font-semibold underline"
                >
                  Change Dates
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="p-6">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Loader className="w-8 h-8 text-amber-500 animate-spin mb-4" />
              <p className="text-gray-600">
                {step === 1 ? 'Checking availability...' : 'Processing...'}
              </p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <XCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <p className="text-red-600 mb-4">{error}</p>
              <button
                onClick={() => {
                  setError(null);
                  if (step === 2) setStep(1);
                }}
                className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Try Again
              </button>
            </div>
          ) : step === 1 ? (
            <div className="max-w-2xl mx-auto py-8">
              <div className="text-center mb-8">
                <Calendar className="w-16 h-16 text-amber-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Select Your Stay Dates</h3>
                <p className="text-gray-600">Choose your check-in and check-out dates to see available room types</p>
              </div>
              
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-6 border border-amber-200">
                <div className="text-center">
                  <button
                    onClick={handleCheckRooms}
                    disabled={!checkInDate || !checkOutDate}
                    className={`flex items-center justify-center gap-3 mx-auto px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
                      checkInDate && checkOutDate
                        ? 'bg-amber-500 hover:bg-amber-600 text-white transform hover:scale-105 shadow-lg'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    <Search className="w-6 h-6" />
                    Check Available Rooms
                  </button>
                  {(!checkInDate || !checkOutDate) && (
                    <p className="text-amber-600 mt-3 text-sm">
                      Please select both check-in and check-out dates
                    </p>
                  )}
                </div>
              </div>
            </div>
          ) : step === 2 ? (
            <div>
              {availableRoomTypes.length === 0 ? (
                <div className="text-center py-12">
                  <Bed className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">No room types available</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {availableRoomTypes.map((roomType) => (
                    <div
                      key={roomType.id}
                      className={`border-2 rounded-xl p-4 transition-all duration-200 ${
                        roomType.is_available
                          ? 'border-gray-200 hover:border-amber-300 hover:shadow-lg cursor-pointer'
                          : 'border-gray-100 bg-gray-50 opacity-60 cursor-not-allowed'
                      }`}
                      onClick={() => handleRoomTypeSelect(roomType)}
                    >
                      <div className="relative h-48 rounded-lg overflow-hidden mb-4">
                        <img
                          src={roomType.icon || roomType.image || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400'}
                          alt={roomType.name}
                          className="w-full h-full object-cover"
                        />
                        {!roomType.is_available && (
                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                            <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                              Not Available
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="space-y-3">
                        <div className="flex justify-between items-start">
                          <h4 className="font-semibold text-gray-900">{roomType.name}</h4>
                          <div className="text-right">
                            <div className="text-amber-600 font-bold text-lg">
                              ${roomType.base_price || roomType.price_per_night}/night
                            </div>
                            {roomType.is_available ? (
                              <div className="flex items-center gap-1 text-green-600 text-sm">
                                <CheckCircle className="w-4 h-4" />
                                {roomType.available_count} available
                              </div>
                            ) : (
                              <div className="flex items-center gap-1 text-red-600 text-sm">
                                <XCircle className="w-4 h-4" />
                                Fully Booked
                              </div>
                            )}
                          </div>
                        </div>

                        {roomType.description && (
                          <p className="text-sm text-gray-600 line-clamp-2">{roomType.description}</p>
                        )}

                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            <span>Up to {roomType.capacity} guests</span>
                          </div>
                        </div>

                        <button 
                          className={`w-full py-2 rounded-lg font-semibold transition-colors ${
                            roomType.is_available
                              ? 'bg-amber-500 hover:bg-amber-600 text-white'
                              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          }`}
                          disabled={!roomType.is_available}
                        >
                          {roomType.is_available ? 'Select This Room Type' : 'Not Available'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="max-w-2xl mx-auto">
              <div className="bg-gray-50 rounded-xl p-6 mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Guest Information</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={guestInfo.full_name}
                      onChange={(e) => setGuestInfo({...guestInfo, full_name: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      value={guestInfo.email}
                      onChange={(e) => setGuestInfo({...guestInfo, email: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={guestInfo.phone}
                      onChange={(e) => setGuestInfo({...guestInfo, phone: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Number of Guests
                    </label>
                    <input
                      type="number"
                      min="1"
                      max={selectedRoomType?.capacity || 10}
                      value={guests}
                      onChange={(e) => setGuests(parseInt(e.target.value))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Special Requests
                    </label>
                    <textarea
                      value={guestInfo.special_requests}
                      onChange={(e) => setGuestInfo({...guestInfo, special_requests: e.target.value})}
                      rows="3"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      placeholder="Any special requirements or requests?"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Booking Summary</h3>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Room Type:</span>
                    <span className="font-semibold">{selectedRoomType?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Check-in:</span>
                    <span className="font-semibold">{checkInDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Check-out:</span>
                    <span className="font-semibold">{checkOutDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Nights:</span>
                    <span className="font-semibold">{calculateNights()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Guests:</span>
                    <span className="font-semibold">{guests}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-gray-900">Total Amount:</span>
                    <span className="text-2xl font-bold text-amber-600">${calculateTotalPrice().toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handleBack}
                  className="flex-1 border-2 border-gray-300 text-gray-700 py-3 rounded-lg font-semibold transition-colors hover:border-gray-400"
                >
                  Back
                </button>
                <button
                  onClick={handleBookNow}
                  disabled={loading}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition-colors disabled:bg-gray-400"
                >
                  {loading ? 'Processing...' : 'Confirm Booking Request'}
                </button>
              </div>
              
              <p className="text-sm text-gray-500 mt-4 text-center">
                Your booking will be confirmed by our staff. You will receive an email once confirmed.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Booking;









































// import React, { useState, useEffect } from 'react';
// import { 
//   Bed, 
//   Users, 
//   Wifi, 
//   Coffee, 
//   Tv, 
//   Wind, 
//   Car, 
//   CheckCircle, 
//   XCircle, 
//   Loader,
//   Calendar,
//   X,
//   Star,
//   Shield,
//   Search
// } from 'lucide-react';

// const Booking = ({ isOpen, onClose, serviceId }) => {
//   const [availableRoomTypes, setAvailableRoomTypes] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [selectedRoomType, setSelectedRoomType] = useState(null);
//   const [checkInDate, setCheckInDate] = useState('');
//   const [checkOutDate, setCheckOutDate] = useState('');
//   const [guests, setGuests] = useState(1);
//   const [step, setStep] = useState(1);
  
//   const [guestInfo, setGuestInfo] = useState({
//     full_name: '',
//     email: '',
//     phone: '',
//     special_requests: ''
//   });

//   const getTomorrowDate = () => {
//     const tomorrow = new Date();
//     tomorrow.setDate(tomorrow.getDate() + 1);
//     return tomorrow.toISOString().split('T')[0];
//   };

//   const getMinCheckOutDate = () => {
//     if (!checkInDate) return getTomorrowDate();
//     const minDate = new Date(checkInDate);
//     minDate.setDate(minDate.getDate() + 1);
//     return minDate.toISOString().split('T')[0];
//   };

//   const fetchAvailableRoomTypes = async (checkIn, checkOut) => {
//     try {
//       setLoading(true);
//       setError(null);
      
//       const roomTypesResponse = await fetch(
//         'https://hotel-numba-qlg2.onrender.com/api/v1/rooms/room-types/'
//       );
      
//       if (!roomTypesResponse.ok) throw new Error('Failed to fetch room types');
      
//       const roomTypesData = await roomTypesResponse.json();
//       const roomTypes = roomTypesData.results || roomTypesData;
      
//       const availabilityChecks = await Promise.all(
//         roomTypes.map(async (roomType) => {
//           try {
//             const availResponse = await fetch(
//               'https://hotel-numba-qlg2.onrender.com/api/v1/bookings/check-availability/',
//               {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({
//                   room_type_id: roomType.id,
//                   check_in: checkIn,
//                   check_out: checkOut
//                 })
//               }
//             );
            
//             if (!availResponse.ok) {
//               return { ...roomType, is_available: false, available_count: 0 };
//             }
            
//             const availData = await availResponse.json();
            
//             return {
//               ...roomType,
//               is_available: availData.available,
//               available_count: availData.available_count,
//               nights: availData.nights,
//               total_price: availData.total_price,
//               price_per_night: availData.price_per_night
//             };
//           } catch (err) {
//             console.error(`Error checking availability for ${roomType.name}:`, err);
//             return { ...roomType, is_available: false, available_count: 0 };
//           }
//         })
//       );
      
//       setAvailableRoomTypes(availabilityChecks);
//       setStep(2);
      
//     } catch (err) {
//       console.error('Error fetching room types:', err);
//       setError('Failed to fetch available rooms. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const createBooking = async () => {
//     try {
//       setLoading(true);
      
//       const bookingData = {
//         full_name: guestInfo.full_name,
//         email: guestInfo.email,
//         phone: guestInfo.phone,
//         room_type: selectedRoomType.id,
//         check_in: checkInDate,
//         check_out: checkOutDate,
//         guests: guests,
//         special_requests: guestInfo.special_requests
//       };
      
//       const response = await fetch(
//         'https://hotel-numba-qlg2.onrender.com/api/v1/bookings/create/',
//         {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify(bookingData)
//         }
//       );
      
//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.error || 'Booking failed');
//       }
      
//       alert('Booking request submitted successfully! You will receive a confirmation email shortly.');
//       onClose();
      
//     } catch (err) {
//       console.error('Error creating booking:', err);
//       setError(err.message || 'Failed to create booking. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (!isOpen) {
//       setAvailableRoomTypes([]);
//       setSelectedRoomType(null);
//       setCheckInDate('');
//       setCheckOutDate('');
//       setGuests(1);
//       setGuestInfo({
//         full_name: '',
//         email: '',
//         phone: '',
//         special_requests: ''
//       });
//       setError(null);
//       setStep(1);
//       setLoading(false);
//     }
//   }, [isOpen]);

//   const handleCheckRooms = () => {
//     if (!checkInDate || !checkOutDate) {
//       alert('Please select both check-in and check-out dates');
//       return;
//     }
//     fetchAvailableRoomTypes(checkInDate, checkOutDate);
//   };

//   const handleRoomTypeSelect = (roomType) => {
//     if (roomType.is_available) {
//       setSelectedRoomType(roomType);
//       setStep(3);
//     }
//   };

//   const handleBookNow = async () => {
//     if (!selectedRoomType) return;
    
//     if (!guestInfo.full_name || !guestInfo.email) {
//       alert('Please fill in your name and email');
//       return;
//     }
    
//     await createBooking();
//   };

//   const calculateTotalPrice = () => {
//     if (!checkInDate || !checkOutDate || !selectedRoomType) return 0;
    
//     const checkIn = new Date(checkInDate);
//     const checkOut = new Date(checkOutDate);
//     const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
    
//     return nights * (parseFloat(selectedRoomType.base_price) || parseFloat(selectedRoomType.price_per_night) || 0);
//   };

//   const calculateNights = () => {
//     if (!checkInDate || !checkOutDate) return 0;
//     const checkIn = new Date(checkInDate);
//     const checkOut = new Date(checkOutDate);
//     return Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
//   };

//   const handleBack = () => {
//     if (step === 2) {
//       setStep(1);
//       setAvailableRoomTypes([]);
//     } else if (step === 3) {
//       setStep(2);
//       setSelectedRoomType(null);
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
//         <div className="p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
//           <div className="flex justify-between items-center mb-4">
//             <div className="flex items-center gap-4">
//               {step > 1 && (
//                 <button
//                   onClick={handleBack}
//                   className="text-gray-400 hover:text-gray-600 transition-colors p-2"
//                 >
//                   <X className="w-6 h-6 rotate-45" />
//                 </button>
//               )}
//               <h2 className="text-2xl font-bold text-gray-900">
//                 {step === 1 && 'Select Your Dates'}
//                 {step === 2 && 'Choose Your Room Type'}
//                 {step === 3 && 'Complete Booking'}
//               </h2>
//             </div>
//             <button
//               onClick={onClose}
//               className="text-gray-400 hover:text-gray-600 transition-colors p-2"
//             >
//               <X className="w-6 h-6" />
//             </button>
//           </div>
          
//           <div className="flex items-center justify-center mb-4">
//             <div className="flex items-center">
//               {[1, 2, 3].map((stepNumber) => (
//                 <React.Fragment key={stepNumber}>
//                   <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
//                     step >= stepNumber ? 'bg-amber-500 text-white' : 'bg-gray-300 text-gray-600'
//                   } font-semibold text-sm`}>
//                     {stepNumber}
//                   </div>
//                   {stepNumber < 3 && (
//                     <div className={`w-16 h-1 mx-2 ${
//                       step > stepNumber ? 'bg-amber-500' : 'bg-gray-300'
//                     }`} />
//                   )}
//                 </React.Fragment>
//               ))}
//             </div>
//           </div>

//           {step === 1 ? (
//             <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
//                 <Calendar className="w-5 h-5 text-amber-500" />
//                 <div className="flex-1">
//                   <label className="block text-sm font-medium text-gray-700">Check-in Date</label>
//                   <input
//                     type="date"
//                     value={checkInDate}
//                     min={getTomorrowDate()}
//                     onChange={(e) => setCheckInDate(e.target.value)}
//                     className="mt-1 bg-transparent border-none p-0 text-gray-900 focus:outline-none focus:ring-0 w-full"
//                   />
//                 </div>
//               </div>
              
//               <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
//                 <Calendar className="w-5 h-5 text-amber-500" />
//                 <div className="flex-1">
//                   <label className="block text-sm font-medium text-gray-700">Check-out Date</label>
//                   <input
//                     type="date"
//                     value={checkOutDate}
//                     min={getMinCheckOutDate()}
//                     onChange={(e) => setCheckOutDate(e.target.value)}
//                     className="mt-1 bg-transparent border-none p-0 text-gray-900 focus:outline-none focus:ring-0 w-full"
//                   />
//                 </div>
//               </div>
//             </div>
//           ) : (
//             <div className="mt-4 bg-amber-50 border border-amber-200 rounded-lg p-4">
//               <div className="flex flex-col md:flex-row justify-between items-center gap-4">
//                 <div className="flex items-center gap-6">
//                   <div>
//                     <span className="text-sm text-gray-600">Check-in</span>
//                     <p className="font-semibold text-gray-900">{checkInDate}</p>
//                   </div>
//                   <div>
//                     <span className="text-sm text-gray-600">Check-out</span>
//                     <p className="font-semibold text-gray-900">{checkOutDate}</p>
//                   </div>
//                   <div>
//                     <span className="text-sm text-gray-600">Nights</span>
//                     <p className="font-semibold text-gray-900">{calculateNights()}</p>
//                   </div>
//                 </div>
//                 <button
//                   onClick={() => setStep(1)}
//                   className="text-amber-600 hover:text-amber-700 text-sm font-semibold underline"
//                 >
//                   Change Dates
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>

//         <div className="p-6">
//           {loading ? (
//             <div className="flex flex-col items-center justify-center py-12">
//               <Loader className="w-8 h-8 text-amber-500 animate-spin mb-4" />
//               <p className="text-gray-600">
//                 {step === 1 ? 'Checking availability...' : 'Processing...'}
//               </p>
//             </div>
//           ) : error ? (
//             <div className="text-center py-12">
//               <XCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
//               <p className="text-red-600 mb-4">{error}</p>
//               <button
//                 onClick={() => setError(null)}
//                 className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-2 rounded-lg transition-colors"
//               >
//                 Close
//               </button>
//             </div>
//           ) : step === 1 ? (
//             <div className="max-w-2xl mx-auto py-8">
//               <div className="text-center mb-8">
//                 <Calendar className="w-16 h-16 text-amber-500 mx-auto mb-4" />
//                 <h3 className="text-2xl font-bold text-gray-900 mb-2">Select Your Stay Dates</h3>
//                 <p className="text-gray-600">Choose your check-in and check-out dates to see available room types</p>
//               </div>
              
//               <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-6 border border-amber-200">
//                 <div className="text-center">
//                   <button
//                     onClick={handleCheckRooms}
//                     disabled={!checkInDate || !checkOutDate}
//                     className={`flex items-center justify-center gap-3 mx-auto px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
//                       checkInDate && checkOutDate
//                         ? 'bg-amber-500 hover:bg-amber-600 text-white transform hover:scale-105 shadow-lg'
//                         : 'bg-gray-300 text-gray-500 cursor-not-allowed'
//                     }`}
//                   >
//                     <Search className="w-6 h-6" />
//                     Check Available Rooms
//                   </button>
//                   {(!checkInDate || !checkOutDate) && (
//                     <p className="text-amber-600 mt-3 text-sm">
//                       Please select both check-in and check-out dates
//                     </p>
//                   )}
//                 </div>
//               </div>
//             </div>
//           ) : step === 2 ? (
//             <div>
//               {availableRoomTypes.length === 0 ? (
//                 <div className="text-center py-12">
//                   <Bed className="w-12 h-12 text-gray-400 mx-auto mb-4" />
//                   <p className="text-gray-600 mb-4">No room types available</p>
//                 </div>
//               ) : (
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                   {availableRoomTypes.map((roomType) => (
//                     <div
//                       key={roomType.id}
//                       className={`border-2 rounded-xl p-4 transition-all duration-200 cursor-pointer ${
//                         roomType.is_available
//                           ? selectedRoomType?.id === roomType.id
//                             ? 'border-amber-500 bg-amber-50'
//                             : 'border-gray-200 hover:border-amber-300 hover:shadow-lg'
//                           : 'border-gray-100 bg-gray-50 opacity-60 cursor-not-allowed'
//                       }`}
//                       onClick={() => handleRoomTypeSelect(roomType)}
//                     >
//                       <div className="relative h-48 rounded-lg overflow-hidden mb-4">
//                         <img
//                           src={roomType.icon || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400'}
//                           alt={roomType.name}
//                           className="w-full h-full object-cover"
//                         />
//                         {!roomType.is_available && (
//                           <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
//                             <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
//                               Not Available
//                             </span>
//                           </div>
//                         )}
//                       </div>

//                       <div className="space-y-3">
//                         <div className="flex justify-between items-start">
//                           <h4 className="font-semibold text-gray-900">{roomType.name}</h4>
//                           <div className="text-right">
//                             <div className="text-amber-600 font-bold text-lg">
//                               ${roomType.base_price || roomType.price_per_night}/night
//                             </div>
//                             {roomType.is_available ? (
//                               <div className="flex items-center gap-1 text-green-600 text-sm">
//                                 <CheckCircle className="w-4 h-4" />
//                                 {roomType.available_count} available
//                               </div>
//                             ) : (
//                               <div className="flex items-center gap-1 text-red-600 text-sm">
//                                 <XCircle className="w-4 h-4" />
//                                 Fully Booked
//                               </div>
//                             )}
//                           </div>
//                         </div>

//                         <p className="text-sm text-gray-600">{roomType.description}</p>

//                         <div className="flex items-center gap-4 text-sm text-gray-600">
//                           <div className="flex items-center gap-1">
//                             <Users className="w-4 h-4" />
//                             <span>Up to {roomType.capacity} guests</span>
//                           </div>
//                         </div>

//                         <button 
//                           className={`w-full py-2 rounded-lg font-semibold transition-colors ${
//                             roomType.is_available
//                               ? 'bg-amber-500 hover:bg-amber-600 text-white'
//                               : 'bg-gray-300 text-gray-500 cursor-not-allowed'
//                           }`}
//                         >
//                           {roomType.is_available ? 'Select This Room Type' : 'Not Available'}
//                         </button>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           ) : (
//             <div className="max-w-2xl mx-auto">
//               <div className="bg-gray-50 rounded-xl p-6 mb-6">
//                 <h3 className="text-xl font-semibold text-gray-900 mb-4">Guest Information</h3>
                
//                 <div className="space-y-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Full Name *
//                     </label>
//                     <input
//                       type="text"
//                       value={guestInfo.full_name}
//                       onChange={(e) => setGuestInfo({...guestInfo, full_name: e.target.value})}
//                       className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
//                       required
//                     />
//                   </div>
                  
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Email *
//                     </label>
//                     <input
//                       type="email"
//                       value={guestInfo.email}
//                       onChange={(e) => setGuestInfo({...guestInfo, email: e.target.value})}
//                       className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
//                       required
//                     />
//                   </div>
                  
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Phone
//                     </label>
//                     <input
//                       type="tel"
//                       value={guestInfo.phone}
//                       onChange={(e) => setGuestInfo({...guestInfo, phone: e.target.value})}
//                       className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
//                     />
//                   </div>
                  
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Number of Guests
//                     </label>
//                     <input
//                       type="number"
//                       min="1"
//                       max={selectedRoomType?.capacity || 10}
//                       value={guests}
//                       onChange={(e) => setGuests(parseInt(e.target.value))}
//                       className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
//                     />
//                   </div>
                  
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Special Requests
//                     </label>
//                     <textarea
//                       value={guestInfo.special_requests}
//                       onChange={(e) => setGuestInfo({...guestInfo, special_requests: e.target.value})}
//                       rows="3"
//                       className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
//                       placeholder="Any special requirements or requests?"
//                     />
//                   </div>
//                 </div>
//               </div>

//               <div className="bg-gray-50 rounded-xl p-6 mb-6">
//                 <h3 className="text-xl font-semibold text-gray-900 mb-4">Booking Summary</h3>
                
//                 <div className="space-y-2 mb-4">
//                   <div className="flex justify-between">
//                     <span className="text-gray-600">Room Type:</span>
//                     <span className="font-semibold">{selectedRoomType?.name}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-gray-600">Check-in:</span>
//                     <span className="font-semibold">{checkInDate}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-gray-600">Check-out:</span>
//                     <span className="font-semibold">{checkOutDate}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-gray-600">Nights:</span>
//                     <span className="font-semibold">{calculateNights()}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-gray-600">Guests:</span>
//                     <span className="font-semibold">{guests}</span>
//                   </div>
//                 </div>

//                 <div className="pt-4 border-t border-gray-200">
//                   <div className="flex justify-between items-center">
//                     <span className="text-lg font-semibold text-gray-900">Total Amount:</span>
//                     <span className="text-2xl font-bold text-amber-600">${calculateTotalPrice()}</span>
//                   </div>
//                 </div>
//               </div>

//               <div className="flex gap-4">
//                 <button
//                   onClick={handleBack}
//                   className="flex-1 border-2 border-gray-300 text-gray-700 py-3 rounded-lg font-semibold transition-colors hover:border-gray-400"
//                 >
//                   Back
//                 </button>
//                 <button
//                   onClick={handleBookNow}
//                   disabled={loading}
//                   className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition-colors disabled:bg-gray-400"
//                 >
//                   {loading ? 'Processing...' : 'Confirm Booking Request'}
//                 </button>
//               </div>
              
//               <p className="text-sm text-gray-500 mt-4 text-center">
//                 Your booking will be confirmed by our staff. You will receive an email once confirmed.
//               </p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Booking;






























































// import React, { useState, useEffect } from 'react';
// import { 
//   Bed, 
//   Users, 
//   Wifi, 
//   Coffee, 
//   Tv, 
//   Wind, 
//   Car, 
//   CheckCircle, 
//   XCircle, 
//   Loader,
//   Calendar,
//   X,
//   Star,
//   Shield,
//   Search
// } from 'lucide-react';
// import axios from 'axios';

// const Booking = ({ isOpen, onClose, serviceId }) => {
//   const [availableRooms, setAvailableRooms] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [selectedRoom, setSelectedRoom] = useState(null);
//   const [checkInDate, setCheckInDate] = useState('');
//   const [checkOutDate, setCheckOutDate] = useState('');
//   const [step, setStep] = useState(1); // 1: Select dates, 2: Select room, 3: Booking details

//   // Calculate tomorrow's date for min check-in
//   const getTomorrowDate = () => {
//     const tomorrow = new Date();
//     tomorrow.setDate(tomorrow.getDate() + 1);
//     return tomorrow.toISOString().split('T')[0];
//   };

//   // Calculate min check-out date (check-in + 1 day)
//   const getMinCheckOutDate = () => {
//     if (!checkInDate) return getTomorrowDate();
//     const minDate = new Date(checkInDate);
//     minDate.setDate(minDate.getDate() + 1);
//     return minDate.toISOString().split('T')[0];
//   };

//   // API Integration Functions
  
//   /**
//    * Fetch available rooms based on dates
//    * TODO: Replace with your actual API endpoint
//    */
//   const fetchAvailableRooms = async (checkIn = '', checkOut = '') => {
//     try {
//       setLoading(true);
//       setError(null);
      
//       // Example API call - update with your actual endpoint
//     //   const response = await axios.post(`https://hotel-numba-qlg2.onrender.com/api/v1/bookings/check-availability/`, {
//         const response = await axios.get(`https://hotel-numba-qlg2.onrender.com/api/v1/rooms/room-types/`, {
//         params: {
//           service_id: serviceId,
//           check_in: checkIn,
//           check_out: checkOut
//         }
//       });
      
//       // Adjust based on your API response structure
//     //   const roomsData = response.data.results || response.data.data || response.data;
//     //   setAvailableRooms(roomsData);
//     //   setStep(2); // Move to room selection step

//         const roomsData = response.data.results || response.data.data || response.data;
//         setAvailableRooms(roomsData);
//         setStep(2);

      
//     } catch (err) {
//       console.error('Error fetching available rooms:', err);
//       setError(err.response?.data?.message || 'Failed to fetch available rooms');
//     } finally {
//       setLoading(false);
//     }
//   };

//   /**
//    * Book a room
//    * TODO: Replace with your actual booking API endpoint
//    */
//   const bookRoom = async (roomId, bookingData) => {
//     try {
//       const response = await axios.post(`https://hotel-numba-qlg2.onrender.com/api/v1/bookings/create/`, {
//         room_id: roomId,
//         ...bookingData
//       });
      
//       console.log('Booking successful:', response.data);
//       return response.data;
      
//     } catch (err) {
//       console.error('Error booking room:', err);
//       throw err;
//     }
//   };

//   // Reset when component closes
//   useEffect(() => {
//     if (!isOpen) {
//       setAvailableRooms([]);
//       setSelectedRoom(null);
//       setCheckInDate('');
//       setCheckOutDate('');
//       setError(null);
//       setStep(1);
//       setLoading(false);
//     }
//   }, [isOpen]);

//   // Room amenities icons mapping
//   const getAmenityIcon = (amenity) => {
//     const iconMap = {
//       'wifi': <Wifi className="w-4 h-4" />,
//       'tv': <Tv className="w-4 h-4" />,
//       'ac': <Wind className="w-4 h-4" />,
//       'air conditioning': <Wind className="w-4 h-4" />,
//       'breakfast': <Coffee className="w-4 h-4" />,
//       'parking': <Car className="w-4 h-4" />,
//       'security': <Shield className="w-4 h-4" />,
//     };
//     return iconMap[amenity.toLowerCase()] || <CheckCircle className="w-4 h-4" />;
//   };

//   // Handle check rooms button click
//   const handleCheckRooms = () => {
//     if (!checkInDate || !checkOutDate) {
//       alert('Please select both check-in and check-out dates');
//       return;
//     }
//     fetchAvailableRooms(checkInDate, checkOutDate);
//   };

//   // Handle room selection
//   const handleRoomSelect = (room) => {
//     if (room.is_available) {
//       setSelectedRoom(room);
//       setStep(3);
//     }
//   };

//   // Handle booking submission
//   const handleBookNow = async () => {
//     if (!selectedRoom) return;
    
//     try {
//       const bookingData = {
//         check_in: checkInDate,
//         check_out: checkOutDate,
//         total_price: calculateTotalPrice(),
//         guest_count: 1, // You can make this dynamic
//         // Add other booking details as needed
//       };
      
//       await bookRoom(selectedRoom.id, bookingData);
//       alert('Booking successful!');
//       onClose();
      
//     } catch (err) {
//       console.error('Booking failed:', err);
//       alert('Booking failed. Please try again.');
//     }
//   };

//   // Calculate total price based on nights
//   const calculateTotalPrice = () => {
//     if (!checkInDate || !checkOutDate || !selectedRoom) return 0;
    
//     const checkIn = new Date(checkInDate);
//     const checkOut = new Date(checkOutDate);
//     const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
    
//     return nights * selectedRoom.price;
//   };

//   // Handle back navigation
//   const handleBack = () => {
//     if (step === 2) {
//       setStep(1);
//       setAvailableRooms([]);
//     } else if (step === 3) {
//       setStep(2);
//       setSelectedRoom(null);
//     }
//   };

//   // Group rooms by type for better organization
//   const groupedRooms = availableRooms.reduce((acc, room) => {
//     const type = room.room_type || room.type || 'Standard';
//     if (!acc[type]) {
//       acc[type] = [];
//     }
//     acc[type].push(room);
//     return acc;
//   }, {});

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
//         {/* Header */}
//         <div className="p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
//           <div className="flex justify-between items-center mb-4">
//             <div className="flex items-center gap-4">
//               {step > 1 && (
//                 <button
//                   onClick={handleBack}
//                   className="text-gray-400 hover:text-gray-600 transition-colors p-2"
//                 >
//                   <X className="w-6 h-6 rotate-45" />
//                 </button>
//               )}
//               <h2 className="text-2xl font-bold text-gray-900">
//                 {step === 1 && 'Select Your Dates'}
//                 {step === 2 && 'Choose Your Room'}
//                 {step === 3 && 'Complete Booking'}
//               </h2>
//             </div>
//             <button
//               onClick={onClose}
//               className="text-gray-400 hover:text-gray-600 transition-colors p-2"
//             >
//               <X className="w-6 h-6" />
//             </button>
//           </div>
          
//           {/* Progress Steps */}
//           <div className="flex items-center justify-center mb-4">
//             <div className="flex items-center">
//               {[1, 2, 3].map((stepNumber) => (
//                 <React.Fragment key={stepNumber}>
//                   <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
//                     step >= stepNumber ? 'bg-amber-500 text-white' : 'bg-gray-300 text-gray-600'
//                   } font-semibold text-sm`}>
//                     {stepNumber}
//                   </div>
//                   {stepNumber < 3 && (
//                     <div className={`w-16 h-1 mx-2 ${
//                       step > stepNumber ? 'bg-amber-500' : 'bg-gray-300'
//                     }`} />
//                   )}
//                 </React.Fragment>
//               ))}
//             </div>
//           </div>

//           {/* Date Selection - Always show in step 1, show summary in other steps */}
//           {step === 1 ? (
//             <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
//                 <Calendar className="w-5 h-5 text-amber-500" />
//                 <div className="flex-1">
//                   <label className="block text-sm font-medium text-gray-700">Check-in Date</label>
//                   <input
//                     type="date"
//                     value={checkInDate}
//                     min={getTomorrowDate()}
//                     onChange={(e) => setCheckInDate(e.target.value)}
//                     className="mt-1 bg-transparent border-none p-0 text-gray-900 focus:outline-none focus:ring-0 w-full"
//                   />
//                 </div>
//               </div>
              
//               <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
//                 <Calendar className="w-5 h-5 text-amber-500" />
//                 <div className="flex-1">
//                   <label className="block text-sm font-medium text-gray-700">Check-out Date</label>
//                   <input
//                     type="date"
//                     value={checkOutDate}
//                     min={getMinCheckOutDate()}
//                     onChange={(e) => setCheckOutDate(e.target.value)}
//                     className="mt-1 bg-transparent border-none p-0 text-gray-900 focus:outline-none focus:ring-0 w-full"
//                   />
//                 </div>
//               </div>
//             </div>
//           ) : (
//             <div className="mt-4 bg-amber-50 border border-amber-200 rounded-lg p-4">
//               <div className="flex flex-col md:flex-row justify-between items-center gap-4">
//                 <div className="flex items-center gap-6">
//                   <div>
//                     <span className="text-sm text-gray-600">Check-in</span>
//                     <p className="font-semibold text-gray-900">{checkInDate}</p>
//                   </div>
//                   <div>
//                     <span className="text-sm text-gray-600">Check-out</span>
//                     <p className="font-semibold text-gray-900">{checkOutDate}</p>
//                   </div>
//                   <div>
//                     <span className="text-sm text-gray-600">Nights</span>
//                     <p className="font-semibold text-gray-900">
//                       {checkInDate && checkOutDate ? 
//                         Math.ceil((new Date(checkOutDate) - new Date(checkInDate)) / (1000 * 60 * 60 * 24)) : 
//                         0
//                       }
//                     </p>
//                   </div>
//                 </div>
//                 <button
//                   onClick={() => setStep(1)}
//                   className="text-amber-600 hover:text-amber-700 text-sm font-semibold underline"
//                 >
//                   Change Dates
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Content */}
//         <div className="p-6">
//           {loading ? (
//             <div className="flex flex-col items-center justify-center py-12">
//               <Loader className="w-8 h-8 text-amber-500 animate-spin mb-4" />
//               <p className="text-gray-600">
//                 {step === 1 ? 'Checking room availability...' : 'Loading available rooms...'}
//               </p>
//             </div>
//           ) : error ? (
//             <div className="text-center py-12">
//               <XCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
//               <p className="text-red-600 mb-4">{error}</p>
//               <button
//                 onClick={step === 1 ? () => fetchAvailableRooms(checkInDate, checkOutDate) : handleCheckRooms}
//                 className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-2 rounded-lg transition-colors"
//               >
//                 Try Again
//               </button>
//             </div>
//           ) : step === 1 ? (
//             // Step 1: Date Selection
//             <div className="max-w-2xl mx-auto py-8">
//               <div className="text-center mb-8">
//                 <Calendar className="w-16 h-16 text-amber-500 mx-auto mb-4" />
//                 <h3 className="text-2xl font-bold text-gray-900 mb-2">Select Your Stay Dates</h3>
//                 <p className="text-gray-600">Choose your check-in and check-out dates to see available rooms</p>
//               </div>
              
//               <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-6 border border-amber-200">
//                 <div className="text-center">
//                   <button
//                     onClick={handleCheckRooms}
//                     disabled={!checkInDate || !checkOutDate}
//                     className={`flex items-center justify-center gap-3 mx-auto px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
//                       checkInDate && checkOutDate
//                         ? 'bg-amber-500 hover:bg-amber-600 text-white transform hover:scale-105 shadow-lg'
//                         : 'bg-gray-300 text-gray-500 cursor-not-allowed'
//                     }`}
//                   >
//                     <Search className="w-6 h-6" />
//                     Check Available Rooms
//                   </button>
//                   {(!checkInDate || !checkOutDate) && (
//                     <p className="text-amber-600 mt-3 text-sm">
//                       Please select both check-in and check-out dates
//                     </p>
//                   )}
//                 </div>
//               </div>
//             </div>
//           ) : step === 2 ? (
//             // Step 2: Room Selection
//             <div>
//               {availableRooms.length === 0 ? (
//                 <div className="text-center py-12">
//                   <Bed className="w-12 h-12 text-gray-400 mx-auto mb-4" />
//                   <p className="text-gray-600 mb-4">No rooms available for the selected dates.</p>
//                   <p className="text-gray-500 text-sm mb-6">Please try different dates or contact us for availability.</p>
//                   <button
//                     onClick={() => setStep(1)}
//                     className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-2 rounded-lg transition-colors"
//                   >
//                     Change Dates
//                   </button>
//                 </div>
//               ) : (
//                 <div className="space-y-8">
//                   {Object.entries(groupedRooms).map(([roomType, rooms]) => (
//                     <div key={roomType} className="border border-gray-200 rounded-xl overflow-hidden">
//                       <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
//                         <h3 className="text-xl font-semibold text-gray-900">{roomType} Rooms</h3>
//                         <p className="text-gray-600 text-sm">
//                           {rooms.filter(room => room.is_available).length} available
//                         </p>
//                       </div>
//                       <div className="p-6">
//                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                           {rooms.map((room) => (
//                             <div
//                               key={room.id}
//                               className={`border-2 rounded-xl p-4 transition-all duration-200 cursor-pointer ${
//                                 room.is_available
//                                   ? selectedRoom?.id === room.id
//                                     ? 'border-amber-500 bg-amber-50'
//                                     : 'border-gray-200 hover:border-amber-300 hover:shadow-lg'
//                                   : 'border-gray-100 bg-gray-50 opacity-60 cursor-not-allowed'
//                               }`}
//                               onClick={() => handleRoomSelect(room)}
//                             >
//                               {/* Room Image */}
//                               <div className="relative h-48 rounded-lg overflow-hidden mb-4">
//                                 <img
//                                   src={room.image || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400'}
//                                   alt={room.name}
//                                   className="w-full h-full object-cover"
//                                 />
//                                 {!room.is_available && (
//                                   <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
//                                     <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
//                                       Booked
//                                     </span>
//                                   </div>
//                                 )}
//                                 <div className="absolute top-3 right-3 bg-black/70 text-white px-2 py-1 rounded text-xs font-semibold">
//                                   Room {room.room_number}
//                                 </div>
//                               </div>

//                               {/* Room Details */}
//                               <div className="space-y-3">
//                                 <div className="flex justify-between items-start">
//                                   <h4 className="font-semibold text-gray-900">{room.name}</h4>
//                                   <div className="text-right">
//                                     <div className="text-amber-600 font-bold text-lg">${room.price}/night</div>
//                                     {room.is_available ? (
//                                       <div className="flex items-center gap-1 text-green-600 text-sm">
//                                         <CheckCircle className="w-4 h-4" />
//                                         Available
//                                       </div>
//                                     ) : (
//                                       <div className="flex items-center gap-1 text-red-600 text-sm">
//                                         <XCircle className="w-4 h-4" />
//                                         Booked
//                                       </div>
//                                     )}
//                                   </div>
//                                 </div>

//                                 <div className="flex items-center gap-4 text-sm text-gray-600">
//                                   <div className="flex items-center gap-1">
//                                     <Users className="w-4 h-4" />
//                                     <span>{room.capacity || 2} guests</span>
//                                   </div>
//                                   <div className="flex items-center gap-1">
//                                     <Bed className="w-4 h-4" />
//                                     <span>{room.beds || '1 bed'}</span>
//                                   </div>
//                                 </div>

//                                 {/* Amenities */}
//                                 {room.amenities && room.amenities.length > 0 && (
//                                   <div className="flex flex-wrap gap-2">
//                                     {room.amenities.slice(0, 3).map((amenity, index) => (
//                                       <div
//                                         key={index}
//                                         className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded text-xs text-gray-700"
//                                         title={amenity}
//                                       >
//                                         {getAmenityIcon(amenity)}
//                                         <span className="capitalize">{amenity}</span>
//                                       </div>
//                                     ))}
//                                     {room.amenities.length > 3 && (
//                                       <div className="bg-gray-100 px-2 py-1 rounded text-xs text-gray-700">
//                                         +{room.amenities.length - 3} more
//                                       </div>
//                                     )}
//                                   </div>
//                                 )}

//                                 <button 
//                                   className={`w-full py-2 rounded-lg font-semibold transition-colors ${
//                                     room.is_available
//                                       ? 'bg-amber-500 hover:bg-amber-600 text-white'
//                                       : 'bg-gray-300 text-gray-500 cursor-not-allowed'
//                                   }`}
//                                 >
//                                   {room.is_available ? 'Select This Room' : 'Not Available'}
//                                 </button>
//                               </div>
//                             </div>
//                           ))}
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           ) : (
//             // Step 3: Booking Summary
//             <div className="max-w-2xl mx-auto">
//               <div className="bg-gray-50 rounded-xl p-6 mb-6">
//                 <h3 className="text-xl font-semibold text-gray-900 mb-4">Booking Summary</h3>
                
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   {/* Room Details */}
//                   <div>
//                     <h4 className="font-semibold text-gray-700 mb-2">Room Details</h4>
//                     <div className="space-y-2">
//                       <p className="text-gray-600"><strong>Type:</strong> {selectedRoom?.room_type}</p>
//                       <p className="text-gray-600"><strong>Room:</strong> {selectedRoom?.name} (Room {selectedRoom?.room_number})</p>
//                       <p className="text-gray-600"><strong>Price per night:</strong> ${selectedRoom?.price}</p>
//                     </div>
//                   </div>

//                   {/* Stay Details */}
//                   <div>
//                     <h4 className="font-semibold text-gray-700 mb-2">Stay Details</h4>
//                     <div className="space-y-2">
//                       <p className="text-gray-600"><strong>Check-in:</strong> {checkInDate}</p>
//                       <p className="text-gray-600"><strong>Check-out:</strong> {checkOutDate}</p>
//                       <p className="text-gray-600"><strong>Nights:</strong> {
//                         checkInDate && checkOutDate ? 
//                         Math.ceil((new Date(checkOutDate) - new Date(checkInDate)) / (1000 * 60 * 60 * 24)) : 
//                         0
//                       }</p>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Total Price */}
//                 <div className="mt-6 pt-4 border-t border-gray-200">
//                   <div className="flex justify-between items-center">
//                     <span className="text-lg font-semibold text-gray-900">Total Amount:</span>
//                     <span className="text-2xl font-bold text-amber-600">${calculateTotalPrice()}</span>
//                   </div>
//                 </div>
//               </div>

//               {/* Booking Action */}
//               <div className="flex gap-4">
//                 <button
//                   onClick={handleBack}
//                   className="flex-1 border-2 border-gray-300 text-gray-700 py-3 rounded-lg font-semibold transition-colors hover:border-gray-400"
//                 >
//                   Back
//                 </button>
//                 <button
//                   onClick={handleBookNow}
//                   className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition-colors"
//                 >
//                   Confirm Booking
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Booking;