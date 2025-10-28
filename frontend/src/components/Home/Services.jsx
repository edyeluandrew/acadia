

import React, { useState, useEffect } from 'react';
import { 
  BedDouble, 
  Utensils, 
  Wine, 
  ParkingCircle, 
  CarTaxiFront, 
  Shield,
  ChevronLeft,
  ChevronRight,
  Star,
  Heart,
  CheckCircle,
  Loader
} from 'lucide-react';

const Services = () => {
  const [currentImageIndices, setCurrentImageIndices] = useState({});
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Icon mapping for UI - this is fine since it's presentation logic
  const getServiceIcon = (serviceName) => {
    const iconMap = {
      'food': <Utensils className="w-6 h-6" />,
      'accommodation': <BedDouble className="w-6 h-6" />,
      'accomodation': <BedDouble className="w-6 h-6" />,
      'bar': <Wine className="w-6 h-6" />,
      'parking': <ParkingCircle className="w-6 h-6" />,
      'tourist cars': <CarTaxiFront className="w-6 h-6" />,
      'tourist car': <CarTaxiFront className="w-6 h-6" />,
    };
    const lowerName = serviceName?.toLowerCase().trim() || '';
    return iconMap[lowerName] || <Shield className="w-6 h-6" />;
  };

  // Process images from backend
  const processServiceImages = (service) => {
    const images = [];
    const baseURL = 'https://hotel-numba-qlg2.onrender.com';
    
    // Check for icon field (from Django ImageField)
    if (service.icon) {
      const iconUrl = service.icon.startsWith('http') 
        ? service.icon 
        : `${baseURL}${service.icon}`;
      images.push(iconUrl);
    }
    
    // Check for multiple image fields (in case you add them later)
    for (let i = 1; i <= 10; i++) {
      const imageField = service[`image${i}`] || service[`image_${i}`];
      if (imageField) {
        const imageUrl = imageField.startsWith('http') 
          ? imageField 
          : `${baseURL}${imageField}`;
        images.push(imageUrl);
      }
    }
    
    // Check for images array (in case you add related images model)
    if (service.images && Array.isArray(service.images)) {
      service.images.forEach(img => {
        const imageUrl = typeof img === 'string' 
          ? (img.startsWith('http') ? img : `${baseURL}${img}`)
          : (img.image ? (img.image.startsWith('http') ? img.image : `${baseURL}${img.image}`) : null);
        
        if (imageUrl) {
          images.push(imageUrl);
        }
      });
    }
    
    // Fallback placeholder if no images at all
    if (images.length === 0) {
      // Use service-specific placeholder from Unsplash
      const placeholders = {
        'food': 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800',
        'accommodation': 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
        'bar': 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800',
        'parking': 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=800',
        'tourist cars': 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800',
      };
      const lowerName = service.name?.toLowerCase().trim() || '';
      images.push(placeholders[lowerName] || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800');
    }
    
    return images;
  };

  // Map backend data to frontend - NO HARDCODING of content
  const mapServiceData = (backendServices) => {
    return backendServices.map((service, index) => {
      // Initialize image index
      setCurrentImageIndices(prev => ({
        ...prev,
        [index]: 0
      }));

      return {
        id: service.id,
        icon: getServiceIcon(service.name), // Lucide icon for UI
        title: service.name, // Backend name directly
        description: service.description || service.short_description || '',
        images: processServiceImages(service), // Backend images
        features: service.features || [], // Backend features (empty for now)
        highlight: service.highlight || null, // Backend highlight (null for now)
        rating: service.rating || null // Backend rating (null for now)
      };
    });
  };

  // Fetch services from backend
  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch('https://hotel-numba-qlg2.onrender.com/api/v1/services/', {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        let servicesData = data;
        if (data.results) {
          servicesData = data.results;
        } else if (data.data) {
          servicesData = data.data;
        }
        
        if (!Array.isArray(servicesData)) {
          throw new Error('Invalid response format');
        }
        
        console.log('Services from backend:', servicesData);
        
        const mappedServices = mapServiceData(servicesData);
        console.log('Mapped services:', mappedServices);
        
        setServices(mappedServices);
        
      } catch (err) {
        console.error('Error fetching services:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const nextImage = (serviceIndex) => {
    setCurrentImageIndices(prev => ({
      ...prev,
      [serviceIndex]: prev[serviceIndex] === services[serviceIndex]?.images?.length - 1 
        ? 0 
        : prev[serviceIndex] + 1
    }));
  };

  const prevImage = (serviceIndex) => {
    setCurrentImageIndices(prev => ({
      ...prev,
      [serviceIndex]: prev[serviceIndex] === 0 
        ? services[serviceIndex]?.images?.length - 1 
        : prev[serviceIndex] - 1
    }));
  };

  const selectImage = (serviceIndex, imageIndex) => {
    setCurrentImageIndices(prev => ({
      ...prev,
      [serviceIndex]: imageIndex
    }));
  };

  const ServiceSection = ({ service, index, reverse = false }) => (
    <div className={`py-16 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
          reverse ? 'lg:grid-flow-dense' : ''
        }`}>
          
          {/* Image Slider */}
          <div className={`${reverse ? 'lg:col-start-2' : ''}`}>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <div className="relative h-96 lg:h-[500px]">
                <img
                  src={service.images[currentImageIndices[index]] || service.images[0]}
                  alt={service.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    console.error('Image failed to load:', e.target.src);
                    // Try next image or use fallback
                    if (service.images.length > 1) {
                      const nextIndex = (currentImageIndices[index] + 1) % service.images.length;
                      e.target.src = service.images[nextIndex];
                    } else {
                      e.target.src = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800';
                    }
                  }}
                />
                
                {service.images.length > 1 && (
                  <>
                    <button
                      onClick={() => prevImage(index)}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      onClick={() => nextImage(index)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>

                    <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2">
                      {service.images.map((_, imageIndex) => (
                        <button
                          key={imageIndex}
                          onClick={() => selectImage(index, imageIndex)}
                          className={`w-3 h-3 rounded-full transition-all duration-200 ${
                            currentImageIndices[index] === imageIndex
                              ? 'bg-white scale-125'
                              : 'bg-white/50 hover:bg-white/80'
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}

                <div className="absolute top-6 left-6 bg-black/70 text-white px-4 py-2 rounded-full backdrop-blur-sm">
                  <div className="flex items-center gap-2">
                    {service.icon}
                    <span className="font-semibold text-sm">{service.title}</span>
                  </div>
                </div>

                {service.highlight && (
                  <div className="absolute top-6 right-6 bg-amber-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                    {service.highlight}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Service Details */}
          <div className={`${reverse ? 'lg:col-start-1' : ''}`}>
            <div className="max-w-lg mx-auto lg:max-w-none">
              {/* Rating - only show if exists */}
              {service.rating && (
                <div className="flex items-center gap-2 mb-6">
                  <div className="flex items-center gap-1 bg-amber-50 text-amber-700 px-3 py-2 rounded-lg">
                    <Star className="w-5 h-5 fill-amber-400" />
                    <span className="font-semibold">{service.rating}</span>
                  </div>
                  <span className="text-gray-600">Excellent Service</span>
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

              {/* Features - only show if exists */}
              {service.features && service.features.length > 0 && (
                <div className="bg-gradient-to-r from-gray-50 to-white rounded-xl p-6 border border-gray-200 mb-8">
                  <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2 text-lg">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    What's Included
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-3 text-gray-700">
                        <div className="w-2 h-2 bg-amber-500 rounded-full flex-shrink-0"></div>
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg">
                  Book Now
                </button>
                <button className="flex-1 border-2 border-gray-300 hover:border-amber-500 text-gray-700 hover:text-amber-600 font-bold py-4 px-6 rounded-xl transition-all duration-300">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex flex-col items-center justify-center py-20">
            <Loader className="w-12 h-12 text-amber-500 animate-spin mb-4" />
            <h3 className="text-xl font-semibold text-gray-700">Loading Services...</h3>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-red-50 border border-red-200 rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold text-red-700 mb-2">Unable to Load Services</h3>
            <p className="text-red-600 mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors"
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
      <div className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-3 rounded-full text-sm font-semibold mb-6 shadow-lg">
            <Heart className="w-4 h-4 fill-white" />
            Everything You Need For A Perfect Stay
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Services
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover what we have to offer
          </p>
        </div>
      </div>

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
        <div className="py-20 text-center">
          <p className="text-gray-500 text-lg">No services available at the moment.</p>
        </div>
      )}

      <div className="py-20 bg-gradient-to-br from-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-r from-gray-800 to-black rounded-2xl p-12 text-white shadow-2xl">
            <h3 className="text-3xl font-bold mb-4">
              Ready to Experience Our Services?
            </h3>
            <p className="text-gray-300 text-xl mb-8 max-w-2xl mx-auto">
              Visit us today and enjoy all our amazing services
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
                Book Your Stay Now
              </button>
              <button className="border-2 border-white/30 hover:border-white text-white hover:bg-white/10 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300">
                Contact Us Today
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;







































// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { 
//   BedDouble, 
//   Utensils, 
//   Wine, 
//   ParkingCircle, 
//   CarTaxiFront, 
//   Wifi, 
//   Coffee,
//   MapPin,
//   ChevronLeft,
//   ChevronRight,
//   Star,
//   Heart,
//   Shield,
//   CheckCircle,
//   Loader
// } from 'lucide-react';

// // Fallback image only
// import fallbackImage from "../../assets/images/a.jpg";

// const Services = () => {
//   const [currentImageIndices, setCurrentImageIndices] = useState({});
//   const [services, setServices] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Map backend service names to icons
//   const getServiceIcon = (serviceName) => {
//     const iconMap = {
//       'food': <Utensils className="w-6 h-6" />,
//       'accommodation': <BedDouble className="w-6 h-6" />,
//       'accomodation': <BedDouble className="w-6 h-6" />, // Handle typo if exists
//       'bar': <Wine className="w-6 h-6" />,
//       'parking': <ParkingCircle className="w-6 h-6" />,
//       'tourist cars': <CarTaxiFront className="w-6 h-6" />,
//       'tourist car': <CarTaxiFront className="w-6 h-6" />,
//     };

//     const lowerName = serviceName.toLowerCase().trim();
//     return iconMap[lowerName] || <Shield className="w-6 h-6" />;
//   };

//   // Default features based on service type
//   const getDefaultFeatures = (serviceName) => {
//     const featureMap = {
//       'food': [
//         "Local & International Cuisine",
//         "Fresh Daily Ingredients",
//         "Expert Chefs",
//         "Breakfast, Lunch & Dinner",
//         "Vegetarian Options",
//         "Takeaway Available"
//       ],
//       'accommodation': [
//         "Comfortable Rooms",
//         "Clean & Modern",
//         "24/7 Reception",
//         "Daily Housekeeping",
//         "Free WiFi",
//         "Hot Water"
//       ],
//       'accomodation': [
//         "Comfortable Rooms",
//         "Clean & Modern",
//         "24/7 Reception",
//         "Daily Housekeeping",
//         "Free WiFi",
//         "Hot Water"
//       ],
//       'bar': [
//         "Wide Selection of Drinks",
//         "Cocktails & Spirits",
//         "Local & Imported Beers",
//         "Wines & Whiskeys",
//         "Relaxed Atmosphere",
//         "Open Till Late"
//       ],
//       'parking': [
//         "Secure Parking Area",
//         "24/7 Security",
//         "Well-Lit Space",
//         "Easy Access",
//         "Guard on Duty",
//         "CCTV Surveillance"
//       ],
//       'tourist cars': [
//         "Professional Drivers",
//         "Clean Vehicles",
//         "Airport Transfers",
//         "City Tours",
//         "Flexible Scheduling",
//         "Affordable Rates"
//       ],
//       'tourist car': [
//         "Professional Drivers",
//         "Clean Vehicles",
//         "Airport Transfers",
//         "City Tours",
//         "Flexible Scheduling",
//         "Affordable Rates"
//       ]
//     };

//     const lowerName = serviceName.toLowerCase().trim();
//     return featureMap[lowerName] || [
//       "Premium Service",
//       "Quality Guaranteed",
//       "Expert Staff",
//       "24/7 Support",
//       "Best Value",
//       "Customer Satisfaction"
//     ];
//   };

//   // Get service title (capitalize properly)
//   const getServiceTitle = (serviceName) => {
//     const titleMap = {
//       'food': 'Food & Dining',
//       'accommodation': 'Accommodation',
//       'accomodation': 'Accommodation',
//       'bar': 'Bar & Lounge',
//       'parking': 'Secure Parking',
//       'tourist cars': 'Tourist Cars',
//       'tourist car': 'Tourist Cars'
//     };

//     const lowerName = serviceName.toLowerCase().trim();
//     return titleMap[lowerName] || serviceName;
//   };

//   // Process images from backend
//   const processServiceImages = (service) => {
//     const images = [];
//     const baseURL = 'https://hotel-numba-qlg2.onrender.com';
    
//     // Check for multiple image fields (image1, image2, image3, etc.)
//     for (let i = 1; i <= 10; i++) {
//       const imageField = service[`image${i}`] || service[`image_${i}`];
//       if (imageField) {
//         // Handle both full URLs and relative paths
//         const imageUrl = imageField.startsWith('http') 
//           ? imageField 
//           : `${baseURL}${imageField}`;
//         images.push(imageUrl);
//       }
//     }
    
//     // Check for single image field
//     if (service.image) {
//       const imageUrl = service.image.startsWith('http') 
//         ? service.image 
//         : `${baseURL}${service.image}`;
//       images.push(imageUrl);
//     }
    
//     // Check for images array
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
    
//     // If no images found, use fallback
//     if (images.length === 0) {
//       images.push(fallbackImage);
//     }
    
//     return images;
//   };

//   // Map backend data to frontend structure
//   const mapServiceData = (backendServices) => {
//     return backendServices.map((service, index) => {
//       // Initialize image index for this service
//       setCurrentImageIndices(prev => ({
//         ...prev,
//         [index]: 0
//       }));

//       return {
//         id: service.id,
//         icon: getServiceIcon(service.name),
//         title: getServiceTitle(service.name),
//         description: service.description || service.short_description || `Experience our exceptional ${service.name} service with quality and comfort.`,
//         images: processServiceImages(service),
//         features: getDefaultFeatures(service.name),
//         highlight: index === 0 ? "Popular Choice" : null,
//         rating: service.rating || 4.8
//       };
//     });
//   };

//   // Fetch services from backend API
//   useEffect(() => {
//     const fetchServices = async () => {
//       try {
//         setLoading(true);
//         setError(null);
        
//         console.log('Fetching from:', 'https://hotel-numba-qlg2.onrender.com/api/v1/services/');
        
//         const response = await axios.get('https://hotel-numba-qlg2.onrender.com/api/v1/services/', {
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           timeout: 10000,
//         });
        
//         console.log('Response:', response.data);
        
//         let servicesData = response.data;
        
//         // Handle different response structures
//         if (response.data.results) {
//           servicesData = response.data.results;
//         } else if (response.data.data) {
//           servicesData = response.data.data;
//         }
        
//         if (!Array.isArray(servicesData)) {
//           console.error('Expected array, got:', typeof servicesData);
//           throw new Error('Invalid response format - expected array');
//         }
        
//         console.log('Services data:', servicesData);
        
//         const mappedServices = mapServiceData(servicesData);
//         console.log('Mapped services:', mappedServices);
        
//         setServices(mappedServices);
        
//       } catch (err) {
//         console.error('Full error:', err);
//         console.error('Error response:', err.response);
        
//         setError(err.message || 'Failed to load services');
        
//         // Use fallback data with your actual services
//         const mockServices = mapServiceData([
//           { id: 1, name: "Food", description: "Delicious meals prepared by our expert chefs using fresh local ingredients." },
//           { id: 2, name: "Accommodation", description: "Comfortable and clean rooms for a relaxing stay." },
//           { id: 3, name: "Bar", description: "Enjoy a wide selection of drinks in our cozy bar." },
//           { id: 4, name: "Parking", description: "Safe and secure parking for your vehicle." },
//           { id: 5, name: "Tourist Cars", description: "Reliable transport for your tours and travels." }
//         ]);
//         setServices(mockServices);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchServices();
//   }, []);

//   const nextImage = (serviceIndex) => {
//     setCurrentImageIndices(prev => ({
//       ...prev,
//       [serviceIndex]: prev[serviceIndex] === services[serviceIndex]?.images?.length - 1 ? 0 : prev[serviceIndex] + 1
//     }));
//   };

//   const prevImage = (serviceIndex) => {
//     setCurrentImageIndices(prev => ({
//       ...prev,
//       [serviceIndex]: prev[serviceIndex] === 0 ? services[serviceIndex]?.images?.length - 1 : prev[serviceIndex] - 1
//     }));
//   };

//   const selectImage = (serviceIndex, imageIndex) => {
//     setCurrentImageIndices(prev => ({
//       ...prev,
//       [serviceIndex]: imageIndex
//     }));
//   };

//   const ServiceSection = ({ service, index, reverse = false }) => (
//     <div className={`py-16 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
//           reverse ? 'lg:grid-flow-dense' : ''
//         }`}>
          
//           {/* Image Slider - Alternates sides */}
//           <div className={`${reverse ? 'lg:col-start-2' : ''}`}>
//             <div className="relative rounded-2xl overflow-hidden shadow-2xl">
//               <div className="relative h-96 lg:h-[500px]">
//                 <img
//                   src={service.images[currentImageIndices[index]] || service.images[0]}
//                   alt={service.title}
//                   className="w-full h-full object-cover"
//                   onError={(e) => {
//                     console.error('Image failed to load:', e.target.src);
//                     e.target.src = fallbackImage;
//                   }}
//                 />
                
//                 {/* Only show navigation if there are multiple images */}
//                 {service.images.length > 1 && (
//                   <>
//                     {/* Navigation Arrows */}
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

//                     {/* Image Indicators */}
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

//                 {/* Service Badge */}
//                 <div className="absolute top-6 left-6 bg-black/70 text-white px-4 py-2 rounded-full backdrop-blur-sm">
//                   <div className="flex items-center gap-2">
//                     {service.icon}
//                     <span className="font-semibold text-sm">
//                       {service.title}
//                     </span>
//                   </div>
//                 </div>

//                 {/* Highlight Badge */}
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
//               {/* Rating */}
//               <div className="flex items-center gap-2 mb-6">
//                 <div className="flex items-center gap-1 bg-amber-50 text-amber-700 px-3 py-2 rounded-lg">
//                   <Star className="w-5 h-5 fill-amber-400" />
//                   <span className="font-semibold">{service.rating}</span>
//                 </div>
//                 <span className="text-gray-600">Excellent Service</span>
//               </div>

//               {/* Title & Description */}
//               <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
//                 {service.title}
//               </h3>
//               <p className="text-lg text-gray-600 leading-relaxed mb-8">
//                 {service.description}
//               </p>

//               {/* Features */}
//               <div className="bg-gradient-to-r from-gray-50 to-white rounded-xl p-6 border border-gray-200 mb-8">
//                 <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2 text-lg">
//                   <CheckCircle className="w-5 h-5 text-green-500" />
//                   What's Included
//                 </h4>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//                   {service.features.map((feature, featureIndex) => (
//                     <div key={featureIndex} className="flex items-center gap-3 text-gray-700">
//                       <div className="w-2 h-2 bg-amber-500 rounded-full flex-shrink-0"></div>
//                       <span className="text-sm">{feature}</span>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* CTA Buttons */}
//               <div className="flex flex-col sm:flex-row gap-4">
//                 <button className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg">
//                   Book Now
//                 </button>
//                 <button className="flex-1 border-2 border-gray-300 hover:border-amber-500 text-gray-700 hover:text-amber-600 font-bold py-4 px-6 rounded-xl transition-all duration-300">
//                   Learn More
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   // Loading State
//   if (loading) {
//     return (
//       <section id="services" className="py-20 bg-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//           <div className="flex flex-col items-center justify-center py-20">
//             <Loader className="w-12 h-12 text-amber-500 animate-spin mb-4" />
//             <h3 className="text-xl font-semibold text-gray-700">Loading Services...</h3>
//             <p className="text-gray-500 mt-2">Please wait while we fetch our amazing services</p>
//           </div>
//         </div>
//       </section>
//     );
//   }

//   // Error State
//   if (error && services.length === 0) {
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
//       {/* Header */}
//       <div className="py-20 bg-gradient-to-br from-gray-50 to-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//           <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-3 rounded-full text-sm font-semibold mb-6 shadow-lg">
//             <Heart className="w-4 h-4 fill-white" />
//             Everything You Need For A Perfect Stay
//           </div>
//           <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
//             Our Services at Numba Cafe
//           </h2>
//           <p className="text-xl text-gray-600 max-w-2xl mx-auto">
//             From delicious food to comfortable accommodation - we provide everything to make your experience unforgettable
//           </p>
//         </div>
//       </div>

//       {/* Services Sections */}
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

//       {/* Bottom CTA */}
//       <div className="py-20 bg-gradient-to-br from-gray-900 to-black">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//           <div className="bg-gradient-to-r from-gray-800 to-black rounded-2xl p-12 text-white shadow-2xl">
//             <h3 className="text-3xl font-bold mb-4">
//               Ready to Experience Numba Cafe?
//             </h3>
//             <p className="text-gray-300 text-xl mb-8 max-w-2xl mx-auto">
//               Visit us today and enjoy all our amazing services in one perfect location
//             </p>
//             <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
//               <button className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
//                 Book Your Stay Now
//               </button>
//               <button className="border-2 border-white/30 hover:border-white text-white hover:bg-white/10 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300">
//                 Contact Us Today
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Services;