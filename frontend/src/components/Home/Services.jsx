// import React, { useState, useEffect } from 'react';
// import { 
//   BedDouble, 
//   Utensils, 
//   Wine, 
//   ParkingCircle, 
//   CarTaxiFront, 
//   Shield,
//   ChevronLeft,
//   ChevronRight,
//   Star,
//   Heart,
//   CheckCircle,
//   Loader,
//   XCircle
// } from 'lucide-react';
// import Booking from './Booking'; // Updated import path

// const Services = () => {
//   const [currentImageIndices, setCurrentImageIndices] = useState({});
//   const [services, setServices] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
  
//   // Booking states
//   const [isBookingOpen, setIsBookingOpen] = useState(false);
//   const [selectedServiceId, setSelectedServiceId] = useState(null);

//   // Icon mapping for UI - this is fine since it's presentation logic
//   const getServiceIcon = (serviceName) => {
//     const iconMap = {
//       'food': <Utensils className="w-6 h-6" />,
//       'accommodation': <BedDouble className="w-6 h-6" />,
//       'accomodation': <BedDouble className="w-6 h-6" />,
//       'bar': <Wine className="w-6 h-6" />,
//       'parking': <ParkingCircle className="w-6 h-6" />,
//       'tourist cars': <CarTaxiFront className="w-6 h-6" />,
//       'tourist car': <CarTaxiFront className="w-6 h-6" />,
//     };
//     const lowerName = serviceName?.toLowerCase().trim() || '';
//     return iconMap[lowerName] || <Shield className="w-6 h-6" />;
//   };

//   // Process images from backend
//   const processServiceImages = (service) => {
//     const images = [];
//     const baseURL = 'https://hotel-numba-qlg2.onrender.com';
    
//     // Check for icon field (from Django ImageField)
//     if (service.icon) {
//       const iconUrl = service.icon.startsWith('http') 
//         ? service.icon 
//         : `${baseURL}${service.icon}`;
//       images.push(iconUrl);
//     }
    
//     // Check for multiple image fields (in case you add them later)
//     for (let i = 1; i <= 10; i++) {
//       const imageField = service[`image${i}`] || service[`image_${i}`];
//       if (imageField) {
//         const imageUrl = imageField.startsWith('http') 
//           ? imageField 
//           : `${baseURL}${imageField}`;
//         images.push(imageUrl);
//       }
//     }
    
//     // Check for images array (in case you add related images model)
//     if (service.images && Array.isArray(service.images)) {
//       service.images.forEach(img => {
//         const imageUrl = typeof img === 'string' 
//           ? (img.startsWith('http') ? img : `${baseURL}${img}`)
//           : (img.image ? (img.image.startsWith('http') ? img.image : `${baseURL}${img.image}`) : null);
        
//         if (imageUrl) {
//           images.push(imageUrl);
//         }
//       });
//     }
    
//     // Fallback placeholder if no images at all
//     if (images.length === 0) {
//       // Use service-specific placeholder from Unsplash
//       const placeholders = {
//         'food': 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800',
//         'accommodation': 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
//         'bar': 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800',
//         'parking': 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=800',
//         'tourist cars': 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800',
//       };
//       const lowerName = service.name?.toLowerCase().trim() || '';
//       images.push(placeholders[lowerName] || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800');
//     }
    
//     return images;
//   };

//   // Map backend data to frontend - NO HARDCODING of content
//   const mapServiceData = (backendServices) => {
//     return backendServices.map((service, index) => {
//       // Initialize image index
//       setCurrentImageIndices(prev => ({
//         ...prev,
//         [index]: 0
//       }));

//       return {
//         id: service.id,
//         icon: getServiceIcon(service.name), // Lucide icon for UI
//         title: service.name, // Backend name directly
//         description: service.description || service.short_description || '',
//         images: processServiceImages(service), // Backend images
//         features: service.features || [], // Backend features (empty for now)
//         highlight: service.highlight || null, // Backend highlight (null for now)
//         rating: service.rating || null // Backend rating (null for now)
//       };
//     });
//   };

//   // Fetch services from backend
//   useEffect(() => {
//     const fetchServices = async () => {
//       try {
//         setLoading(true);
//         setError(null);
        
//         const response = await fetch('https://hotel-numba-qlg2.onrender.com/api/v1/services/', {
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         });
        
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
        
//         const data = await response.json();
        
//         let servicesData = data;
//         if (data.results) {
//           servicesData = data.results;
//         } else if (data.data) {
//           servicesData = data.data;
//         }
        
//         if (!Array.isArray(servicesData)) {
//           throw new Error('Invalid response format');
//         }
        
//         console.log('Services from backend:', servicesData);
        
//         const mappedServices = mapServiceData(servicesData);
//         console.log('Mapped services:', mappedServices);
        
//         setServices(mappedServices);
        
//       } catch (err) {
//         console.error('Error fetching services:', err);
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchServices();
//   }, []);

//   const nextImage = (serviceIndex) => {
//     setCurrentImageIndices(prev => ({
//       ...prev,
//       [serviceIndex]: prev[serviceIndex] === services[serviceIndex]?.images?.length - 1 
//         ? 0 
//         : prev[serviceIndex] + 1
//     }));
//   };

//   const prevImage = (serviceIndex) => {
//     setCurrentImageIndices(prev => ({
//       ...prev,
//       [serviceIndex]: prev[serviceIndex] === 0 
//         ? services[serviceIndex]?.images?.length - 1 
//         : prev[serviceIndex] - 1
//     }));
//   };

//   const selectImage = (serviceIndex, imageIndex) => {
//     setCurrentImageIndices(prev => ({
//       ...prev,
//       [serviceIndex]: imageIndex
//     }));
//   };

//   // Check if service is accommodation
//   const isAccommodation = (serviceTitle) => {
//     const accommodationKeywords = ['accommodation', 'accomodation', 'room', 'suite', 'stay', 'hotel'];
//     const lowerTitle = serviceTitle?.toLowerCase().trim() || '';
//     return accommodationKeywords.some(keyword => lowerTitle.includes(keyword));
//   };

//   // Handle booking opening
//   const handleBookNow = (serviceId) => {
//     setSelectedServiceId(serviceId);
//     setIsBookingOpen(true);
//   };

//   // Handle main CTA booking
//   const handleMainBookNow = () => {
//     // Find accommodation service ID or use the first one
//     const accommodationService = services.find(service => isAccommodation(service.title));
//     if (accommodationService) {
//       handleBookNow(accommodationService.id);
//     } else {
//       // Fallback if no accommodation service found
//       setIsBookingOpen(true);
//     }
//   };

//   const ServiceSection = ({ service, index, reverse = false }) => (
//     <div className={`py-16 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
//           reverse ? 'lg:grid-flow-dense' : ''
//         }`}>
          
//           {/* Image Slider */}
//           <div className={`${reverse ? 'lg:col-start-2' : ''}`}>
//             <div className="relative rounded-2xl overflow-hidden shadow-2xl">
//               <div className="relative h-96 lg:h-[500px]">
//                 <img
//                   src={service.images[currentImageIndices[index]] || service.images[0]}
//                   alt={service.title}
//                   className="w-full h-full object-cover"
//                   onError={(e) => {
//                     console.error('Image failed to load:', e.target.src);
//                     // Try next image or use fallback
//                     if (service.images.length > 1) {
//                       const nextIndex = (currentImageIndices[index] + 1) % service.images.length;
//                       e.target.src = service.images[nextIndex];
//                     } else {
//                       e.target.src = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800';
//                     }
//                   }}
//                 />
                
//                 {service.images.length > 1 && (
//                   <>
//                     <button
//                       onClick={() => prevImage(index)}
//                       className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
//                     >
//                       <ChevronLeft className="w-6 h-6" />
//                     </button>
//                     <button
//                       onClick={() => nextImage(index)}
//                       className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
//                     >
//                       <ChevronRight className="w-6 h-6" />
//                     </button>

//                     <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2">
//                       {service.images.map((_, imageIndex) => (
//                         <button
//                           key={imageIndex}
//                           onClick={() => selectImage(index, imageIndex)}
//                           className={`w-3 h-3 rounded-full transition-all duration-200 ${
//                             currentImageIndices[index] === imageIndex
//                               ? 'bg-white scale-125'
//                               : 'bg-white/50 hover:bg-white/80'
//                           }`}
//                         />
//                       ))}
//                     </div>
//                   </>
//                 )}

//                 <div className="absolute top-6 left-6 bg-black/70 text-white px-4 py-2 rounded-full backdrop-blur-sm">
//                   <div className="flex items-center gap-2">
//                     {service.icon}
//                     <span className="font-semibold text-sm">{service.title}</span>
//                   </div>
//                 </div>

//                 {service.highlight && (
//                   <div className="absolute top-6 right-6 bg-amber-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
//                     {service.highlight}
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Service Details */}
//           <div className={`${reverse ? 'lg:col-start-1' : ''}`}>
//             <div className="max-w-lg mx-auto lg:max-w-none">
//               {/* Rating - only show if exists */}
//               {service.rating && (
//                 <div className="flex items-center gap-2 mb-6">
//                   <div className="flex items-center gap-1 bg-amber-50 text-amber-700 px-3 py-2 rounded-lg">
//                     <Star className="w-5 h-5 fill-amber-400" />
//                     <span className="font-semibold">{service.rating}</span>
//                   </div>
//                   <span className="text-gray-600">Excellent Service</span>
//                 </div>
//               )}

//               <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
//                 {service.title}
//               </h3>
              
//               {service.description && (
//                 <p className="text-lg text-gray-600 leading-relaxed mb-8">
//                   {service.description}
//                 </p>
//               )}

//               {/* Features - only show if exists */}
//               {service.features && service.features.length > 0 && (
//                 <div className="bg-gradient-to-r from-gray-50 to-white rounded-xl p-6 border border-gray-200 mb-8">
//                   <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2 text-lg">
//                     <CheckCircle className="w-5 h-5 text-green-500" />
//                     What's Included
//                   </h4>
//                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//                     {service.features.map((feature, featureIndex) => (
//                       <div key={featureIndex} className="flex items-center gap-3 text-gray-700">
//                         <div className="w-2 h-2 bg-amber-500 rounded-full flex-shrink-0"></div>
//                         <span className="text-sm">{feature}</span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {/* Only show Book Now button for accommodation services */}
//               {isAccommodation(service.title) && (
//                 <div className="flex gap-4">
//                   <button 
//                     onClick={() => handleBookNow(service.id)}
//                     className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
//                   >
//                     Book Now
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   if (loading) {
//     return (
//       <section id="services" className="py-20 bg-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//           <div className="flex flex-col items-center justify-center py-20">
//             <Loader className="w-12 h-12 text-amber-500 animate-spin mb-4" />
//             <h3 className="text-xl font-semibold text-gray-700">Loading Services...</h3>
//           </div>
//         </div>
//       </section>
//     );
//   }

//   if (error) {
//     return (
//       <section id="services" className="py-20 bg-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//           <div className="bg-red-50 border border-red-200 rounded-2xl p-8 max-w-2xl mx-auto">
//             <h3 className="text-xl font-semibold text-red-700 mb-2">Unable to Load Services</h3>
//             <p className="text-red-600 mb-4">{error}</p>
//             <button 
//               onClick={() => window.location.reload()}
//               className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors"
//             >
//               Try Again
//             </button>
//           </div>
//         </div>
//       </section>
//     );
//   }

//   return (
//     <section id="services" className="bg-white">
//       <div className="py-20 bg-gradient-to-br from-gray-50 to-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//           <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-3 rounded-full text-sm font-semibold mb-6 shadow-lg">
//             <Heart className="w-4 h-4 fill-white" />
//             Everything You Need For A Perfect Stay
//           </div>
//           <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
//             Our Services
//           </h2>
//           <p className="text-xl text-gray-600 max-w-2xl mx-auto">
//             Discover what we have to offer
//           </p>
//         </div>
//       </div>

//       {services.length > 0 ? (
//         services.map((service, index) => (
//           <ServiceSection 
//             key={service.id}
//             service={service}
//             index={index}
//             reverse={index % 2 !== 0}
//           />
//         ))
//       ) : (
//         <div className="py-20 text-center">
//           <p className="text-gray-500 text-lg">No services available at the moment.</p>
//         </div>
//       )}

//       <div className="py-20 bg-gradient-to-br from-gray-900 to-black">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//           <div className="bg-gradient-to-r from-gray-800 to-black rounded-2xl p-12 text-white shadow-2xl">
//             <h3 className="text-3xl font-bold mb-4">
//               Ready to Experience Our Services?
//             </h3>
//             <p className="text-gray-300 text-xl mb-8 max-w-2xl mx-auto">
//               Visit us today and enjoy all our amazing services
//             </p>
//             <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
//               <button 
//                 onClick={handleMainBookNow}
//                 className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
//               >
//                 Book Your Stay Now
//               </button>
//               <button className="border-2 border-white/30 hover:border-white text-white hover:bg-white/10 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300">
//                 Contact Us Today
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Booking Component - Updated to use Booking instead of BookingComponent */}
//       <Booking
//         isOpen={isBookingOpen}
//         onClose={() => setIsBookingOpen(false)}
//         serviceId={selectedServiceId}
//       />
//     </section>
//   );
// };

// export default Services;



import React, { useState, useEffect } from 'react';
import { 
  Coffee, 
  Utensils, 
  Dessert,
  Star,
  Heart,
  CheckCircle,
  Loader,
  XCircle,
  ChevronLeft,
  ChevronRight,
  Users,
  Clock
} from 'lucide-react';
import Booking from './Booking';

// Import local images
import coffeeBar1 from '../../assets/images/,.jpg';
import coffeeBar2 from '../../assets/images/@.jpg';
import coffeeBar3 from '../../assets/images/a.jpg';
import coffeeServing1 from '../../assets/images/b.jpg';
import coffeeServing2 from '../../assets/images/ba.jpg';
import espressoMachine1 from '../../assets/images/baa.jpg';
import espressoMachine2 from '../../assets/images/baa.jpg';
import baristaWorking1 from '../../assets/images/bar.jpg';
import baristaWorking2 from '../../assets/images/c.jpg';
import customersDrinking1 from '../../assets/images/d.jpg';
import customersDrinking2 from '../../assets/images/dine.jpg';
import groupCoffee1 from '../../assets/images/e.jpg';
import groupCoffee2 from '../../assets/images/h.jpg';
import breakfastTable1 from '../../assets/images/i.jpg';
import breakfastTable2 from '../../assets/images/in.jpg';
import coffeeTasting1 from '../../assets/images/inn.jpg';
import coffeeTasting2 from '../../assets/images/j.jpg';
import restaurantInterior1 from '../../assets/images/k.jpg';
import restaurantInterior2 from '../../assets/images/l.jpg';
import coffeeCup1 from '../../assets/images/m.jpg';
import coffeeCup2 from '../../assets/images/n.jpg';
import peopleDrinking1 from '../../assets/images/o.jpg';
import peopleDrinking2 from '../../assets/images/p.jpg';
import outdoorSeating1 from '../../assets/images/q.jpg';
import outdoorSeating2 from '../../assets/images/r.jpg';

const Services = () => {
  const [currentImageIndices, setCurrentImageIndices] = useState({});
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Booking states
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState(null);

  // Coffee marquee images using local assets
  const marqueeImages = [
    coffeeCup1,
    coffeeCup2,
    peopleDrinking1,
    peopleDrinking2,
    customersDrinking1,
    customersDrinking2,
    outdoorSeating1,
    outdoorSeating2,
    groupCoffee1,
    groupCoffee2,
    coffeeServing1,
    coffeeServing2
  ];

  // Mock coffee-focused services data
  const mockCoffeeServices = [
    {
      id: 1,
      name: 'Specialty Coffee',
      description: 'Experience our handcrafted specialty coffees sourced from the finest beans around the world. Each cup is carefully brewed to perfection by our expert baristas. Watch as our skilled team creates your perfect brew while you relax in our cozy atmosphere.',
      features: [
        'Single-origin beans from Ethiopia, Colombia & Brazil',
        'Expert barista service with latte art',
        'Multiple brewing methods (Pour-over, AeroPress, French Press)',
        'Daily fresh roasts from local artisans',
        'Customizable orders to your taste preference'
      ],
      rating: 4.9,
      highlight: 'Barista Choice'
    },
    {
      id: 2,
      name: 'Espresso Bar',
      description: 'Our state-of-the-art espresso bar serves rich, aromatic espresso shots and milk-based classics. Perfect for coffee enthusiasts who appreciate quality. Join the vibrant crowd at our espresso counter and enjoy the theater of coffee making.',
      features: [
        'Premium espresso shots with perfect crema',
        'Latte art specialists creating beautiful designs',
        'Alternative milk options (Oat, Almond, Soy)',
        'Seasonal specials and signature drinks',
        'Takeaway available in eco-friendly cups'
      ],
      rating: 4.8,
      highlight: 'Fresh Daily'
    },
    {
      id: 3,
      name: 'Breakfast & Pastries',
      description: 'Start your day right with our freshly baked pastries and breakfast options, perfectly paired with your favorite coffee selection. Our cozy seating area is perfect for morning meetings, casual catch-ups, or quiet moments with a good book.',
      features: [
        'Freshly baked croissants and muffins daily',
        'Local organic ingredients sourced from nearby farms',
        'Vegetarian and vegan options available',
        'Gluten-free pastries and breads',
        'Expert coffee pairings suggested by our baristas'
      ],
      rating: 4.7,
      highlight: 'Fresh Baked'
    },
    {
      id: 4,
      name: 'Coffee Tasting',
      description: 'Join our interactive coffee tasting sessions and discover the unique flavors and aromas of different coffee beans and brewing techniques. Meet fellow coffee lovers and learn from our passionate experts in a social, engaging environment.',
      features: [
        'Guided tasting sessions with expert baristas',
        '5+ different bean varieties from around the world',
        'Live brewing demonstrations and techniques',
        'Personalized flavor profile guidance',
        'Group bookings for friends and team events'
      ],
      rating: 5.0,
      highlight: 'Expert Led'
    }
  ];

  // Process local coffee restaurant scene images
  const processServiceImages = (service) => {
    const coffeeRestaurantScenes = {
      'specialty coffee': [
        baristaWorking1,
        customersDrinking1,
        coffeeServing1,
        coffeeBar1
      ],
      'espresso bar': [
        espressoMachine1,
        coffeeBar2,
        espressoMachine2,
        baristaWorking2
      ],
      'breakfast & pastries': [
        breakfastTable1,
        coffeeServing2,
        customersDrinking2,
        breakfastTable2
      ],
      'coffee tasting': [
        coffeeTasting1,
        groupCoffee1,
        coffeeTasting2,
        groupCoffee2
      ]
    };

    const lowerName = service.name?.toLowerCase().trim() || '';
    return coffeeRestaurantScenes[lowerName] || [
      restaurantInterior1,
      restaurantInterior2,
      coffeeBar3
    ];
  };

  // Map mock data to frontend format
  const mapServiceData = (backendServices) => {
    return backendServices.map((service, index) => {
      return {
        id: service.id,
        title: service.name,
        description: service.description,
        images: processServiceImages(service),
        features: service.features || [],
        highlight: service.highlight || null,
        rating: service.rating || null
      };
    });
  };

  // Initialize image indices when services are loaded
  useEffect(() => {
    const initializeServices = async () => {
      try {
        setLoading(true);
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mappedServices = mapServiceData(mockCoffeeServices);
        
        // Initialize all image indices to 0
        const initialIndices = {};
        mappedServices.forEach((_, index) => {
          initialIndices[index] = 0;
        });
        setCurrentImageIndices(initialIndices);
        setServices(mappedServices);
        
      } catch (err) {
        console.error('Error initializing services:', err);
        setError('Failed to load services');
      } finally {
        setLoading(false);
      }
    };

    initializeServices();
  }, []);

  const nextImage = (serviceIndex) => {
    setCurrentImageIndices(prev => {
      const currentIndex = prev[serviceIndex] || 0;
      const totalImages = services[serviceIndex]?.images?.length || 1;
      const nextIndex = (currentIndex + 1) % totalImages;
      
      return {
        ...prev,
        [serviceIndex]: nextIndex
      };
    });
  };

  const prevImage = (serviceIndex) => {
    setCurrentImageIndices(prev => {
      const currentIndex = prev[serviceIndex] || 0;
      const totalImages = services[serviceIndex]?.images?.length || 1;
      const prevIndex = currentIndex === 0 ? totalImages - 1 : currentIndex - 1;
      
      return {
        ...prev,
        [serviceIndex]: prevIndex
      };
    });
  };

  const selectImage = (serviceIndex, imageIndex) => {
    setCurrentImageIndices(prev => ({
      ...prev,
      [serviceIndex]: imageIndex
    }));
  };

  // Handle booking opening
  const handleBookNow = (serviceId) => {
    setSelectedServiceId(serviceId);
    setIsBookingOpen(true);
  };

  // Handle main CTA booking
  const handleMainBookNow = () => {
    const coffeeService = services.find(service => service.title.toLowerCase().includes('coffee'));
    if (coffeeService) {
      handleBookNow(coffeeService.id);
    } else {
      setIsBookingOpen(true);
    }
  };

  const ServiceSection = ({ service, index, reverse = false }) => {
    const currentIndex = currentImageIndices[index] || 0;
    const totalImages = service.images?.length || 0;

    return (
      <div className={`py-16 ${index % 2 === 0 ? 'bg-amber-50' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
            reverse ? 'lg:grid-flow-dense' : ''
          }`}>
            
            {/* Image Slider */}
            <div className={`${reverse ? 'lg:col-start-2' : ''}`}>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
                <div className="relative h-96 lg:h-[500px]">
                  <img
                    src={service.images[currentIndex]}
                    alt={`${service.title} at our coffee restaurant`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  
                  {/* Navigation Arrows - Always show if multiple images */}
                  {totalImages > 1 && (
                    <>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          prevImage(index);
                        }}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
                      >
                        <ChevronLeft className="w-6 h-6" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          nextImage(index);
                        }}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
                      >
                        <ChevronRight className="w-6 h-6" />
                      </button>
                    </>
                  )}

                  {/* Image Indicators */}
                  {totalImages > 1 && (
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                      {service.images.map((_, imageIndex) => (
                        <button
                          key={imageIndex}
                          onClick={(e) => {
                            e.stopPropagation();
                            selectImage(index, imageIndex);
                          }}
                          className={`w-3 h-3 rounded-full transition-all duration-300 ${
                            currentIndex === imageIndex
                              ? 'bg-white scale-125'
                              : 'bg-white/50 hover:bg-white/80'
                          }`}
                        />
                      ))}
                    </div>
                  )}

                  {/* Service Title Badge */}
                  <div className="absolute top-4 left-4 bg-amber-600/90 text-white px-4 py-2 rounded-full backdrop-blur-sm">
                    <span className="font-semibold text-sm">{service.title}</span>
                  </div>

                  {/* Highlight Badge */}
                  {service.highlight && (
                    <div className="absolute top-4 right-4 bg-amber-800 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {service.highlight}
                    </div>
                  )}

                  {/* Image Counter */}
                  {totalImages > 1 && (
                    <div className="absolute top-4 right-20 bg-black/50 text-white px-2 py-1 rounded-full text-xs">
                      {currentIndex + 1} / {totalImages}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Service Details */}
            <div className={`${reverse ? 'lg:col-start-1' : ''}`}>
              <div className="max-w-lg mx-auto lg:max-w-none">
                {/* Rating */}
                {service.rating && (
                  <div className="flex items-center gap-2 mb-6">
                    <div className="flex items-center gap-1 bg-amber-100 text-amber-800 px-3 py-2 rounded-lg">
                      <Star className="w-5 h-5 fill-amber-400" />
                      <span className="font-semibold">{service.rating}</span>
                    </div>
                    <span className="text-gray-600">Excellent Quality</span>
                  </div>
                )}

                <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                  {service.title}
                </h3>
                
                {service.description && (
                  <p className="text-lg text-gray-600 leading-relaxed mb-8">
                    {service.description}
                  </p>
                )}

                {/* Features */}
                {service.features && service.features.length > 0 && (
                  <div className="bg-gradient-to-r from-amber-50 to-white rounded-xl p-6 border border-amber-200 mb-8">
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2 text-lg">
                      <CheckCircle className="w-5 h-5 text-amber-600" />
                      What We Offer
                    </h4>
                    <div className="grid grid-cols-1 gap-3">
                      {service.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center gap-3 text-gray-700">
                          <div className="w-2 h-2 bg-amber-600 rounded-full flex-shrink-0"></div>
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-4">
                  <button 
                    onClick={() => handleBookNow(service.id)}
                    className="flex-1 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    Reserve Now
                  </button>
                  <button className="px-6 py-4 border-2 border-amber-600 text-amber-600 hover:bg-amber-50 rounded-xl font-semibold transition-all duration-300">
                    View Menu
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <section id="services" className="py-20 bg-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex flex-col items-center justify-center py-20">
            <Loader className="w-12 h-12 text-amber-600 animate-spin mb-4" />
            <h3 className="text-xl font-semibold text-gray-700">Brewing Our Services...</h3>
            <p className="text-gray-500 mt-2">Preparing your perfect coffee experience</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="services" className="py-20 bg-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-red-50 border border-red-200 rounded-2xl p-8 max-w-2xl mx-auto">
            <XCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-red-700 mb-2">Unable to Load Services</h3>
            <p className="text-red-600 mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="services" className="bg-white">
      {/* Hero Section */}
      <div className="py-20 bg-gradient-to-br from-amber-50 to-amber-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-600 to-amber-700 text-white px-6 py-3 rounded-full text-sm font-semibold mb-6 shadow-lg">
            <Coffee className="w-4 h-4 fill-white" />
            Premium Coffee Experience
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Coffee Services
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            From expertly crafted brews to delightful food pairings, discover everything we offer for the perfect coffee experience.
          </p>
          
          {/* Social Proof Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto mt-12">
            <div className="text-center">
              <div className="text-2xl font-bold text-amber-600">500+</div>
              <div className="text-gray-600 text-sm">Happy Customers Daily</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-amber-600">4.9</div>
              <div className="text-gray-600 text-sm">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-amber-600">50+</div>
              <div className="text-gray-600 text-sm">Coffee Varieties</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-amber-600">5</div>
              <div className="text-gray-600 text-sm">Brewing Methods</div>
            </div>
          </div>
        </div>
      </div>

      {/* Services */}
      {services.length > 0 ? (
        services.map((service, index) => (
          <ServiceSection 
            key={service.id}
            service={service}
            index={index}
            reverse={index % 2 !== 0}
          />
        ))
      ) : (
        <div className="py-20 text-center bg-amber-50">
          <Coffee className="w-16 h-16 text-amber-400 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">Preparing our coffee experiences...</p>
        </div>
      )}

      {/* Coffee Gallery Marquee Section */}
      <div className="py-16 bg-amber-900 overflow-hidden">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-white mb-4">Coffee Moments</h3>
          <p className="text-amber-200 text-lg max-w-2xl mx-auto">
            Glimpse into the vibrant atmosphere of our coffee sanctuary
          </p>
        </div>
        
        {/* Marquee Container */}
        <div className="relative">
          {/* First Marquee */}
          <div className="flex space-x-6 mb-6">
            <div className="flex space-x-6 animate-marquee whitespace-nowrap">
              {marqueeImages.map((image, index) => (
                <div key={index} className="flex-shrink-0 w-64 h-48 rounded-xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-300">
                  <img 
                    src={image} 
                    alt="Coffee moment" 
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
            {/* Duplicate for seamless loop */}
            <div className="flex space-x-6 animate-marquee whitespace-nowrap">
              {marqueeImages.map((image, index) => (
                <div key={`dup-${index}`} className="flex-shrink-0 w-64 h-48 rounded-xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-300">
                  <img 
                    src={image} 
                    alt="Coffee moment" 
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Second Marquee (reverse direction) */}
          <div className="flex space-x-6">
            <div className="flex space-x-6 animate-marquee-reverse whitespace-nowrap">
              {[...marqueeImages].reverse().map((image, index) => (
                <div key={index} className="flex-shrink-0 w-64 h-48 rounded-xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-300">
                  <img 
                    src={image} 
                    alt="Coffee moment" 
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
            {/* Duplicate for seamless loop */}
            <div className="flex space-x-6 animate-marquee-reverse whitespace-nowrap">
              {[...marqueeImages].reverse().map((image, index) => (
                <div key={`dup-rev-${index}`} className="flex-shrink-0 w-64 h-48 rounded-xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-300">
                  <img 
                    src={image} 
                    alt="Coffee moment" 
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Image Card Section - Replaced CTA */}
      <div className="py-20 bg-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Text Content */}
            <div className="text-center lg:text-left">
              <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Visit Our Coffee Sanctuary
              </h3>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Step into our warm, inviting space where the aroma of freshly brewed coffee welcomes you. 
                Our comfortable seating, friendly staff, and vibrant atmosphere make every visit memorable.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button 
                  onClick={handleMainBookNow}
                  className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Book Your Table
                </button>
                <button className="border-2 border-amber-600 text-amber-600 hover:bg-amber-50 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300">
                  Get Directions
                </button>
              </div>
            </div>
            
            {/* Image Card */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={restaurantInterior1}
                alt="Our beautiful coffee restaurant interior with people enjoying coffee"
                className="w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
                <div className="p-6 text-white">
                  <h4 className="text-xl font-bold mb-2">The Perfect Atmosphere</h4>
                  <p className="text-amber-100">Where great coffee meets great company</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Component */}
      <Booking
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        serviceId={selectedServiceId}
      />

      {/* Add custom CSS for marquee animation */}
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-reverse {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .animate-marquee-reverse {
          animation: marquee-reverse 30s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default Services;