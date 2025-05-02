import React from "react";

const CountryCard = ({ country, onSelect }) => (
  <div
    onClick={onSelect}
    className="bg-white rounded-xl shadow-md hover:shadow-xl cursor-pointer transition-all duration-300 transform hover:-translate-y-1 border border-primary-100 overflow-hidden"
  >
    <div className="relative h-40">
      <img
        src={country.flags.svg}
        alt={country.name.common}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      <h2 className="absolute bottom-3 left-3 text-xl font-bold text-white">
        {country.name.common}
      </h2>
    </div>
    
    <div className="p-4">
      <div className="mb-2">
        <span className="text-primary-600 font-medium">Capital:</span>
        <span className="ml-2 text-primary-700">
          {country.capital?.[0] || "N/A"}
        </span>
      </div>
      
      <div className="mb-2">
        <span className="text-primary-600 font-medium">Population:</span>
        <span className="ml-2 text-primary-700">
          {country.population.toLocaleString()}
        </span>
      </div>
      
      <div className="mb-2">
        <span className="text-primary-600 font-medium">Language:</span>
        <span className="ml-2 text-primary-700 truncate">
          {country.languages ? Object.values(country.languages).join(", ") : "N/A"}
        </span>
      </div>
      
      <div className="mt-3 pt-3 border-t border-primary-100">
        <span className="text-primary-600 font-medium">Region:</span>
        <span className="ml-2 inline-block px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm">
          {country.region}
        </span>
      </div>
    </div>
  </div>
);

export default CountryCard;