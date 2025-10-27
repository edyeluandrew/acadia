
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  BedDouble, 
  Utensils, 
  Wine, 
  ParkingCircle, 
  CarTaxiFront, 
  Wifi, 
  Coffee,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Star,
  Heart,
  Shield,
  CheckCircle,
  Loader
} from 'lucide-react';

const Services = () => {
  const [currentImageIndices, setCurrentImageIndices] = useState({});
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Map backend service names to icons
  const getServiceIcon = (serviceName) => {
    const iconMap = {
      'luxury rooms': <BedDouble className="w-6 h-6" />,
      'gourmet dining': <Utensils className="w-6 h-6" />,
      'premium bar': <Wine className="w-6 h-6" />,
      'coffee bar': <Coffee className="w-6 h-6" />,
      'tour & transport': <CarTaxiFront className="w-6 h-6" />,
      'secure parking': <ParkingCircle className="w-6 h-6" />,
      'wifi': <Wifi className="w-6 h-6" />,
      'high-speed wifi': <Wifi className="w-6 h-6" />,
      'tour desk': <MapPin className="w-6 h-6" />,
      // Add more mappings as needed
    };

    const lowerName = serviceName.toLowerCase();
    return iconMap[lowerName] || <BedDouble className="w-6 h-6" />;
  };

  // Default images for services based on type
  const getDefaultImages = (serviceName) => {
    const imageMap = {
      'luxury rooms': [
        "https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&w=800",
        "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&w=800",
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&w=800"
      ],
      'gourmet dining': [
        "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&w=800",
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&w=800",
        "https://images.unsplash.com/photo-1559339352-11d035aa65de?ixlib=rb-4.0.3&w=800"
      ],
      'premium bar': [
        "https://images.unsplash.com/photo-1544145945-f90425340c7e?ixlib=rb-4.0.3&w=800",
        "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?ixlib=rb-4.0.3&w=800",
        "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?ixlib=rb-4.0.3&w=800"
      ],
      'coffee bar': [
        "https://images.unsplash.com/photo-1509042239860-f550ce710b93?ixlib=rb-4.0.3&w=800",
        "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?ixlib=rb-4.0.3&w=800",
        "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?ixlib=rb-4.0.3&w=800"
      ],
      'tour & transport': [
        "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&w=800",
        "https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&w=800",
        "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?ixlib=rb-4.0.3&w=800"
      ],
      'secure parking': [
        "https://images.unsplash.com/photo-1551524164-6ca64fb04d0e?ixlib=rb-4.0.3&w=800",
        "https://images.unsplash.com/photo-1577702318058-1393a58e5c64?ixlib=rb-4.0.3&w=800",
        "https://images.unsplash.com/photo-1549399542-7c4f5fb4a2bc?ixlib=rb-4.0.3&w=800"
      ],
      'wifi': [
        "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&w=800",
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&w=800",
        "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&w=800"
      ],
      'high-speed wifi': [
        "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&w=800",
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&w=800",
        "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&w=800"
      ],
      'tour desk': [
        "https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&w=800",
        "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&w=800",
        "https://images.unsplash.com/photo-1501555088652-021faa106b9b?ixlib=rb-4.0.3&w=800"
      ]
    };

    const lowerName = serviceName.toLowerCase();
    return imageMap[lowerName] || [
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&w=800",
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&w=800"
    ];
  };

  // Default features based on service type
  const getDefaultFeatures = (serviceName) => {
    const featureMap = {
      'luxury rooms': ["Premium Bedding", "City Views", "Daily Cleaning", "24/7 Service", "Smart TV", "Mini Bar"],
      'gourmet dining': ["Local Ingredients", "Expert Chefs", "Daily Specials", "Vegetarian Options", "Wine Pairing", "Dessert Menu"],
      'premium bar': ["Craft Cocktails", "Fine Wines", "Live Music", "Happy Hours", "Premium Spirits", "Snack Menu"],
      'coffee bar': ["Single-Origin Beans", "Expert Baristas", "Cozy Seating", "Fresh Pastries", "Tea Selection", "Takeaway Option"],
      'tour & transport': ["Airport Pickup", "City Tours", "Professional Drivers", "Comfortable Cars", "Multiple Languages", "Flexible Scheduling"],
      'secure parking': ["24/7 Security", "Well-Lit Area", "Easy Access", "Valet Service", "Covered Parking", "EV Charging"],
      'wifi': ["Fiber Optic", "Whole Property", "Unlimited Data", "24/7 Support", "Multiple Devices", "Secure Connection"],
      'high-speed wifi': ["Fiber Optic", "Whole Property", "Unlimited Data", "24/7 Support", "Multiple Devices", "Secure Connection"],
      'tour desk': ["Local Experts", "Custom Tours", "Best Prices", "Easy Booking", "Group Discounts", "Multilingual Guides"]
    };

    const lowerName = serviceName.toLowerCase();
    return featureMap[lowerName] || ["Premium Service", "Quality Guaranteed", "Expert Staff", "24/7 Support"];
  };

  // Map backend data to frontend structure
  const mapServiceData = (backendServices) => {
    return backendServices.map((service, index) => {
      // Initialize image index for this service
      setCurrentImageIndices(prev => ({
        ...prev,
        [index]: 0
      }));

      return {
        id: service.id,
        icon: getServiceIcon(service.name),
        title: service.name,
        description: service.description || service.short_description || "Premium service offering exceptional quality and comfort.",
        images: getDefaultImages(service.name),
        features: getDefaultFeatures(service.name),
        highlight: index === 0 ? "Most Popular" : null, // You can modify this logic based on your needs
        rating: 5.0 // Default rating since it's not in your model
      };
    });
  };

  // Fetch services from backend API
  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await axios.get('http://127.0.0.1:8000/api/v1/services');
        
        if (response.data) {
          // Your API returns an array of services directly or as response.data
          const servicesData = Array.isArray(response.data) ? response.data : response.data;
          const mappedServices = mapServiceData(servicesData);
          setServices(mappedServices);
        } else {
          throw new Error('Invalid response format');
        }
      } catch (err) {
        console.error('Error fetching services:', err);
        setError(err.response?.data?.message || err.message || 'Failed to load services');
        
        // Fallback to mock data if API fails
        const mockServices = mapServiceData([
          { id: 1, name: "Luxury Rooms", description: "Experience ultimate comfort in our beautifully designed rooms." },
          { id: 2, name: "Gourmet Dining", description: "Savor exquisite flavors crafted by our expert chefs." }
        ]);
        setServices(mockServices);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const nextImage = (serviceIndex) => {
    setCurrentImageIndices(prev => ({
      ...prev,
      [serviceIndex]: prev[serviceIndex] === services[serviceIndex]?.images?.length - 1 ? 0 : prev[serviceIndex] + 1
    }));
  };

  const prevImage = (serviceIndex) => {
    setCurrentImageIndices(prev => ({
      ...prev,
      [serviceIndex]: prev[serviceIndex] === 0 ? services[serviceIndex]?.images?.length - 1 : prev[serviceIndex] - 1
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
          
          {/* Image Slider - Alternates sides */}
          <div className={`${reverse ? 'lg:col-start-2' : ''}`}>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <div className="relative h-96 lg:h-[500px]">
                <img
                  src={service.images[currentImageIndices[index]] || service.images[0]}
                  alt={service.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&w=800";
                  }}
                />
                
                {/* Navigation Arrows */}
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

                {/* Image Indicators */}
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

                {/* Service Badge */}
                <div className="absolute top-6 left-6 bg-black/70 text-white px-4 py-2 rounded-full backdrop-blur-sm">
                  <div className="flex items-center gap-2">
                    {service.icon}
                    <span className="font-semibold text-sm">
                      {service.title}
                    </span>
                  </div>
                </div>

                {/* Highlight Badge */}
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
              {/* Rating */}
              <div className="flex items-center gap-2 mb-6">
                <div className="flex items-center gap-1 bg-amber-50 text-amber-700 px-3 py-2 rounded-lg">
                  <Star className="w-5 h-5 fill-amber-400" />
                  <span className="font-semibold">{service.rating || 5.0}</span>
                </div>
                <span className="text-gray-600">Excellent Service</span>
              </div>

              {/* Title & Description */}
              <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                {service.title}
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                {service.description}
              </p>

              {/* Features */}
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

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg">
                  Book This Service
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

  // Loading State
  if (loading) {
    return (
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex flex-col items-center justify-center py-20">
            <Loader className="w-12 h-12 text-amber-500 animate-spin mb-4" />
            <h3 className="text-xl font-semibold text-gray-700">Loading Services...</h3>
            <p className="text-gray-500 mt-2">Please wait while we fetch our amazing services</p>
          </div>
        </div>
      </section>
    );
  }

  // Error State
  if (error && services.length === 0) {
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
      {/* Header */}
      <div className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-3 rounded-full text-sm font-semibold mb-6 shadow-lg">
            <Heart className="w-4 h-4 fill-white" />
            Everything You Need For A Perfect Stay
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Amazing Services
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            From comfortable rooms to unforgettable experiences - we provide everything to make your stay perfect
          </p>
        </div>
      </div>

      {/* Services Sections */}
      {services.length > 0 ? (
        services.map((service, index) => (
          <ServiceSection 
            key={service.id}
            service={service}
            index={index}
            reverse={index % 2 !== 0} // Alternate sides for each service
          />
        ))
      ) : (
        <div className="py-20 text-center">
          <p className="text-gray-500 text-lg">No services available at the moment.</p>
        </div>
      )}

      {/* Bottom CTA */}
      <div className="py-20 bg-gradient-to-br from-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-r from-gray-800 to-black rounded-2xl p-12 text-white shadow-2xl">
            <h3 className="text-3xl font-bold mb-4">
              Ready to Experience Numba Cafe?
            </h3>
            <p className="text-gray-300 text-xl mb-8 max-w-2xl mx-auto">
              Book your stay today and enjoy all our amazing services in one perfect location
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
                Book Your Room Now
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





























































// import React, { useState } from 'react';
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
//   CheckCircle
// } from 'lucide-react';

// const Services = () => {
//   const [currentImageIndices, setCurrentImageIndices] = useState({
//     0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0
//   });

//   const services = [
//     {
//       icon: <BedDouble className="w-6 h-6" />,
//       title: "Luxury Rooms",
//       description: "Experience ultimate comfort in our beautifully designed rooms with premium amenities, stunning views, and exceptional service. Each room is meticulously crafted to provide you with the perfect blend of luxury and comfort.",
//       images: [
//         "https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&w=800",
//         "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&w=800",
//         "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&w=800"
//       ],
//       features: ["Premium Bedding", "City Views", "Daily Cleaning", "24/7 Service", "Smart TV", "Mini Bar"],
//       highlight: "Most Popular"
//     },
//     {
//       icon: <Utensils className="w-6 h-6" />,
//       title: "Gourmet Dining",
//       description: "Savor exquisite flavors crafted by our expert chefs using the freshest local ingredients and traditional recipes. Our restaurant offers a culinary journey you won't forget.",
//       images: [
//         "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&w=800",
//         "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&w=800",
//         "https://images.unsplash.com/photo-1559339352-11d035aa65de?ixlib=rb-4.0.3&w=800"
//       ],
//       features: ["Local Ingredients", "Expert Chefs", "Daily Specials", "Vegetarian Options", "Wine Pairing", "Dessert Menu"],
//       highlight: "Chef's Choice"
//     },
//     {
//       icon: <Wine className="w-6 h-6" />,
//       title: "Premium Bar",
//       description: "Unwind with handcrafted cocktails, fine wines, and premium spirits in our sophisticated bar atmosphere. Perfect for evening relaxation or social gatherings.",
//       images: [
//         "https://images.unsplash.com/photo-1544145945-f90425340c7e?ixlib=rb-4.0.3&w=800",
//         "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?ixlib=rb-4.0.3&w=800",
//         "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?ixlib=rb-4.0.3&w=800"
//       ],
//       features: ["Craft Cocktails", "Fine Wines", "Live Music", "Happy Hours", "Premium Spirits", "Snack Menu"]
//     },
//     {
//       icon: <Coffee className="w-6 h-6" />,
//       title: "Coffee Bar",
//       description: "Start your day right with our specialty coffee brewed from single-origin beans by expert baristas. The perfect spot for morning meetings or quiet moments.",
//       images: [
//         "https://images.unsplash.com/photo-1509042239860-f550ce710b93?ixlib=rb-4.0.3&w=800",
//         "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?ixlib=rb-4.0.3&w=800",
//         "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?ixlib=rb-4.0.3&w=800"
//       ],
//       features: ["Single-Origin Beans", "Expert Baristas", "Cozy Seating", "Fresh Pastries", "Tea Selection", "Takeaway Option"]
//     },
//     {
//       icon: <CarTaxiFront className="w-6 h-6" />,
//       title: "Tour & Transport",
//       description: "Explore the city in comfort with our reliable tourist cars and professional driver services. We make transportation seamless and enjoyable.",
//       images: [
//         "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&w=800",
//         "https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&w=800",
//         "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?ixlib=rb-4.0.3&w=800"
//       ],
//       features: ["Airport Pickup", "City Tours", "Professional Drivers", "Comfortable Cars", "Multiple Languages", "Flexible Scheduling"]
//     },
//     {
//       icon: <ParkingCircle className="w-6 h-6" />,
//       title: "Secure Parking",
//       description: "Park with peace of mind in our 24/7 monitored secure parking facility with easy access. Your vehicle's safety is our priority.",
//       images: [
//         "https://images.unsplash.com/photo-1551524164-6ca64fb04d0e?ixlib=rb-4.0.3&w=800",
//         "https://images.unsplash.com/photo-1577702318058-1393a58e5c64?ixlib=rb-4.0.3&w=800",
//         "https://images.unsplash.com/photo-1549399542-7c4f5fb4a2bc?ixlib=rb-4.0.3&w=800"
//       ],
//       features: ["24/7 Security", "Well-Lit Area", "Easy Access", "Valet Service", "Covered Parking", "EV Charging"]
//     },
//     {
//       icon: <Wifi className="w-6 h-6" />,
//       title: "High-Speed WiFi",
//       description: "Stay connected with our super-fast fiber optic internet throughout the entire property. Perfect for work or streaming entertainment.",
//       images: [
//         "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&w=800",
//         "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&w=800",
//         "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&w=800"
//       ],
//       features: ["Fiber Optic", "Whole Property", "Unlimited Data", "24/7 Support", "Multiple Devices", "Secure Connection"]
//     },
//     {
//       icon: <MapPin className="w-6 h-6" />,
//       title: "Tour Desk",
//       description: "Discover hidden gems with personalized tour recommendations from our local experts. We help you create unforgettable memories.",
//       images: [
//         "https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&w=800",
//         "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&w=800",
//         "https://images.unsplash.com/photo-1501555088652-021faa106b9b?ixlib=rb-4.0.3&w=800"
//       ],
//       features: ["Local Experts", "Custom Tours", "Best Prices", "Easy Booking", "Group Discounts", "Multilingual Guides"]
//     }
//   ];

//   const nextImage = (serviceIndex) => {
//     setCurrentImageIndices(prev => ({
//       ...prev,
//       [serviceIndex]: prev[serviceIndex] === services[serviceIndex].images.length - 1 ? 0 : prev[serviceIndex] + 1
//     }));
//   };

//   const prevImage = (serviceIndex) => {
//     setCurrentImageIndices(prev => ({
//       ...prev,
//       [serviceIndex]: prev[serviceIndex] === 0 ? services[serviceIndex].images.length - 1 : prev[serviceIndex] - 1
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
//                   src={service.images[currentImageIndices[index]]}
//                   alt={service.title}
//                   className="w-full h-full object-cover"
//                 />
                
//                 {/* Navigation Arrows */}
//                 <button
//                   onClick={() => prevImage(index)}
//                   className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
//                 >
//                   <ChevronLeft className="w-6 h-6" />
//                 </button>
//                 <button
//                   onClick={() => nextImage(index)}
//                   className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
//                 >
//                   <ChevronRight className="w-6 h-6" />
//                 </button>

//                 {/* Image Indicators */}
//                 <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2">
//                   {service.images.map((_, imageIndex) => (
//                     <button
//                       key={imageIndex}
//                       onClick={() => selectImage(index, imageIndex)}
//                       className={`w-3 h-3 rounded-full transition-all duration-200 ${
//                         currentImageIndices[index] === imageIndex
//                           ? 'bg-white scale-125'
//                           : 'bg-white/50 hover:bg-white/80'
//                       }`}
//                     />
//                   ))}
//                 </div>

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
//                   <span className="font-semibold">5.0</span>
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
//                   Book This Service
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
//             Our Amazing Services
//           </h2>
//           <p className="text-xl text-gray-600 max-w-2xl mx-auto">
//             From comfortable rooms to unforgettable experiences - we provide everything to make your stay perfect
//           </p>
//         </div>
//       </div>

//       {/* Services Sections */}
//       {services.map((service, index) => (
//         <ServiceSection 
//           key={index}
//           service={service}
//           index={index}
//           reverse={index % 2 !== 0} // Alternate sides for each service
//         />
//       ))}

//       {/* Bottom CTA */}
//       <div className="py-20 bg-gradient-to-br from-gray-900 to-black">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//           <div className="bg-gradient-to-r from-gray-800 to-black rounded-2xl p-12 text-white shadow-2xl">
//             <h3 className="text-3xl font-bold mb-4">
//               Ready to Experience Numba Cafe?
//             </h3>
//             <p className="text-gray-300 text-xl mb-8 max-w-2xl mx-auto">
//               Book your stay today and enjoy all our amazing services in one perfect location
//             </p>
//             <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
//               <button className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
//                 Book Your Room Now
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