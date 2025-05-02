import React from "react";
import { Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { FaGlobeAmericas, FaSearch, FaChartBar, FaInfoCircle } from "react-icons/fa";

const HomePage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/searchCountries");
  };

  return (
    <div className="min-h-screen bg-primary-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/world-map.jpeg" 
            alt="World Map" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-700/90 to-secondary-700/90"></div>
        </div>
        
        {/* Content */}
        <div className="container-custom relative z-10 py-24 md:py-32">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-in">
              World at Your Fingertips with GeoConnect
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8 animate-fade-in">
              Your Interactive Window to the World — Dive into Country Stats, Languages, and Cultures via GeoConnect
            </p>
            <Button
              size="lg"
              onClick={handleGetStarted}
              className="bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white text-lg px-8 py-3 animate-slide-up"
            >
              Let's Explore
            </Button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white relative overflow-hidden">
        {/* Decorative Circles */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary-100 rounded-full opacity-70"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-secondary-100 rounded-full opacity-70"></div>
        <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-primary-200 rounded-full opacity-60"></div>
        <div className="absolute bottom-40 right-1/3 w-20 h-20 bg-secondary-200 rounded-full opacity-60"></div>
        <div className="absolute top-1/3 right-1/4 w-12 h-12 bg-primary-100 rounded-full opacity-50"></div>
        <div className="absolute bottom-1/4 left-1/3 w-28 h-28 bg-secondary-100 rounded-full opacity-50"></div>
        
        <div className="container-custom relative z-10">
          <h2 className="text-3xl font-bold text-center text-primary-800 mb-12">
            What You Can Discover
          </h2>
          
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-1/2">
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary-100 rounded-full opacity-50"></div>
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-secondary-100 rounded-full opacity-50"></div>
                <img 
                  src="/images/EarthMan.png" 
                  alt="World Map" 
                  className="w-full h-auto rounded-xl shadow-xl relative z-10"
                />
              </div>
            </div>
            
            <div className="md:w-1/2 space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-4">
                  <div className="bg-gradient-to-r from-primary-500 to-secondary-500 p-3 rounded-full text-white">
                    <FaSearch className="text-xl" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-primary-800 mb-2">Search Countries</h3>
                  <p className="text-primary-600">
                    Find any country by name, region, or filter by various criteria. Our intuitive search makes it easy to discover information about any nation.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-4">
                  <div className="bg-gradient-to-r from-secondary-500 to-primary-500 p-3 rounded-full text-white">
                    <FaChartBar className="text-xl" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-secondary-800 mb-2">Detailed Statistics</h3>
                  <p className="text-secondary-600">
                    View comprehensive data including population, area, languages, and more. Get a complete picture of any country's demographics and characteristics.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-4">
                  <div className="bg-gradient-to-r from-primary-500 to-secondary-500 p-3 rounded-full text-white">
                    <FaInfoCircle className="text-xl" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-primary-800 mb-2">Rich Information</h3>
                  <p className="text-primary-600">
                    Learn about capitals, currencies, timezones, and other fascinating details. Explore the unique aspects that make each country special.
                  </p>
                </div>
              </div>
              
              <div className="mt-6">
                <Button
                  size="md"
                  onClick={handleGetStarted}
                  className="bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white"
                >
                  Explore All Features
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-gradient-to-r from-primary-100 to-secondary-100">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold text-primary-800 mb-6">
            Ready to Explore the World?
          </h2>
          <p className="text-lg text-primary-600 mb-8 max-w-2xl mx-auto">
            Start your journey of discovery with GeoConnect. Find information about any country in the world with just a few clicks.
          </p>
          <Button
            size="lg"
            onClick={handleGetStarted}
            className="bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white text-lg px-8 py-3"
          >
            Start Exploring
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
