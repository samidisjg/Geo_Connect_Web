import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { TextInput, Select, Button, Spinner } from "flowbite-react";
import {
  fetchAllCountries,
  fetchCountriesByName,
  fetchCountriesByRegion,
  fetchCountryByCode,
} from "../services/Api";
import CountryCard from "../components/FlagCard";
import CountryDetailModal from "../components/CountryPopup";
import { FaSearch, FaGlobeAmericas, FaFilter, FaSort } from "react-icons/fa";

const SearchCountriesPage = () => {
  const [formData, setFormData] = useState({
    searchTerm: "",
    region: "",
    sortBy: "name",
    sortOrder: "asc"
  });
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // Handle form input changes
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id || e.target.name]: e.target.value,
    }));
  };

  // Handle form submit and update URL
  const handleSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (formData.searchTerm) params.set("searchTerm", formData.searchTerm);
    if (formData.region) params.set("region", formData.region);
    navigate(`/searchCountries?${params.toString()}`);
  };

  // Apply filters to countries
  useEffect(() => {
    if (countries.length === 0) {
      setFilteredCountries([]);
      return;
    }

    let result = [...countries];

    // Apply sorting
    result.sort((a, b) => {
      if (formData.sortBy === "name") {
        return formData.sortOrder === "asc"
          ? a.name.common.localeCompare(b.name.common)
          : b.name.common.localeCompare(a.name.common);
      } else if (formData.sortBy === "population") {
        return formData.sortOrder === "asc"
          ? a.population - b.population
          : b.population - a.population;
      }
      return 0;
    });

    setFilteredCountries(result);
  }, [countries, formData.sortBy, formData.sortOrder]);

  // Fetch countries based on search term or region when the URL query changes.
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchTerm = params.get("searchTerm") || "";
    const region = params.get("region") || "";

    const fetchData = async () => {
      setLoading(true);
      try {
        if (searchTerm) {
          const data = await fetchCountriesByName(searchTerm);
          setCountries(data);
        } else if (region) {
          const data = await fetchCountriesByRegion(region);
          setCountries(data);
        } else {
          const data = await fetchAllCountries();
          setCountries(data);
        }
      } catch (err) {
        setCountries([]);
      }
      setLoading(false);
    };

    setFormData(prev => ({ ...prev, searchTerm, region }));
    fetchData();
  }, [location.search]);

  // When a country is selected from the list, fetch full country details by code.
  const handleSelectCountry = async (code) => {
    const data = await fetchCountryByCode(code);
    setSelectedCountry(data[0]);
    setShowModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-secondary-50 to-primary-100 relative overflow-hidden">
      {/* Decorative circles in the background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-primary-100/30 blur-3xl"></div>
        <div className="absolute top-40 right-20 w-80 h-80 rounded-full bg-secondary-100/30 blur-3xl"></div>
        <div className="absolute bottom-20 left-1/4 w-72 h-72 rounded-full bg-primary-200/20 blur-3xl"></div>
        <div className="absolute bottom-40 right-1/3 w-60 h-60 rounded-full bg-secondary-200/20 blur-3xl"></div>
        <div className="absolute top-1/3 left-1/3 w-40 h-40 rounded-full bg-primary-300/20 blur-2xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-50 h-50 rounded-full bg-secondary-300/20 blur-2xl"></div>
      </div>
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-gradient-to-r from-primary-500 to-secondary-500 p-3 rounded-full mr-3">
              <FaGlobeAmericas className="text-white text-2xl" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-700 to-secondary-700 bg-clip-text text-transparent">
              Explore Countries
            </h1>
          </div>
          <p className="text-lg text-primary-600 max-w-2xl mx-auto">
            Discover information about countries around the world. Search by name, filter by region, and explore detailed statistics.
          </p>
        </div>

        {/* Search Bar */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 mb-8 border border-primary-100">
          <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 items-end">
            <div className="flex-1">
              <label className="block text-primary-700 font-medium mb-2">Search Countries</label>
              <div className="relative">
                <TextInput
                  id="searchTerm"
                  type="text"
                  placeholder="Enter country name..."
                  value={formData.searchTerm}
                  onChange={handleChange}
                  className="w-full pl-10 border-primary-200 focus:border-primary-500 focus:ring-primary-500"
                />
                <FaSearch className="absolute left-3 top-3 text-primary-400" />
              </div>
            </div>
            
            <div className="w-full md:w-64">
              <label className="block text-primary-700 font-medium mb-2">Filter by Region</label>
              <Select
                name="region"
                value={formData.region}
                onChange={handleChange}
                className="border-primary-200 focus:border-primary-500 focus:ring-primary-500"
              >
                <option value="">All Regions</option>
                <option value="Africa">Africa</option>
                <option value="Americas">Americas</option>
                <option value="Asia">Asia</option>
                <option value="Europe">Europe</option>
                <option value="Oceania">Oceania</option>
              </Select>
            </div>
            
            <Button
              type="submit"
              className="bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white font-medium py-2.5 px-6"
            >
              Search
            </Button>
          </form>
        </div>

        {/* Results Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-primary-100">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-primary-800">
              {filteredCountries.length > 0 
                ? `Found ${filteredCountries.length} ${filteredCountries.length === 1 ? 'country' : 'countries'}`
                : 'Search Results'}
            </h2>
            <Button
              color="light"
              className="text-primary-700 hover:bg-primary-50"
              onClick={() => setShowFilters(!showFilters)}
            >
              <FaFilter className="mr-2" />
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </Button>
          </div>
          
          {/* Advanced Filters */}
          {showFilters && (
            <div className="bg-primary-50 rounded-lg p-4 mb-6 border border-primary-100">
              <h3 className="text-lg font-semibold text-primary-800 mb-4">Sort Options</h3>
              
              <div className="flex gap-4 items-end">
                <div className="flex-1">
                  <label className="block text-primary-700 font-medium mb-2">Sort By</label>
                  <Select
                    id="sortBy"
                    value={formData.sortBy}
                    onChange={handleChange}
                    className="w-full border-primary-200 focus:border-primary-500 focus:ring-primary-500"
                  >
                    <option value="name">Name</option>
                    <option value="population">Population</option>
                  </Select>
                </div>
                
                <div className="w-40">
                  <label className="block text-primary-700 font-medium mb-2">Order</label>
                  <Select
                    id="sortOrder"
                    value={formData.sortOrder}
                    onChange={handleChange}
                    className="w-full border-primary-200 focus:border-primary-500 focus:ring-primary-500"
                  >
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                  </Select>
                </div>
              </div>
            </div>
          )}
          
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Spinner size="xl" className="text-primary-500" />
              <p className="mt-4 text-primary-600 font-medium">Loading countries...</p>
            </div>
          ) : !filteredCountries || filteredCountries?.length === 0 ? (
            <div className="text-center py-12">
              <FaGlobeAmericas className="text-5xl text-primary-300 mx-auto mb-4" />
              <p className="text-xl font-medium text-primary-600">
                No countries found matching your criteria.
              </p>
              <p className="text-primary-500 mt-2">
                Try adjusting your search or filters.
              </p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredCountries?.map((country) => (
                <CountryCard
                  key={country.cca3}
                  country={country}
                  onSelect={() => handleSelectCountry(country.cca3)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {selectedCountry && (
        <CountryDetailModal
          showModal={showModal}
          onClose={() => setShowModal(false)}
          country={selectedCountry}
        />
      )}
    </div>
  );
};

export default SearchCountriesPage;
