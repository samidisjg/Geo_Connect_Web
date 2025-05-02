import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "flowbite-react";
import { FaArrowLeft } from "react-icons/fa";

const CountryDetail = () => {
  const { countryCode } = useParams();
  const navigate = useNavigate();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCountryDetails();
  }, [countryCode]);

  const fetchCountryDetails = async () => {
    try {
      const response = await fetch(
        `https://restcountries.com/v3.1/alpha/${countryCode}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch country details");
      }
      const data = await response.json();
      setCountry(data[0]);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto"></div>
          <p className="mt-4 text-neutral-600">Loading country details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <Button
            color="failure"
            onClick={fetchCountryDetails}
            className="bg-primary-500 hover:bg-primary-600"
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  if (!country) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50">
        <div className="text-center">
          <p className="text-neutral-600 mb-4">Country not found</p>
          <Button
            onClick={() => navigate("/searchCountries")}
            className="bg-primary-500 hover:bg-primary-600"
          >
            Back to Search
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 py-8">
      <div className="container-custom">
        <Button
          onClick={() => navigate("/searchCountries")}
          className="mb-8 bg-white hover:bg-neutral-100 text-neutral-700"
        >
          <FaArrowLeft className="mr-2" />
          Back
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="aspect-video relative rounded-lg overflow-hidden shadow-lg">
            <img
              src={country.flags.png}
              alt={`Flag of ${country.name.common}`}
              className="w-full h-full object-cover"
            />
          </div>

          <div>
            <h1 className="text-4xl font-bold text-neutral-900 mb-6">
              {country.name.common}
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                    Native Name
                  </h3>
                  <p className="text-neutral-600">
                    {Object.values(country.name.nativeName)[0]?.common || "N/A"}
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                    Population
                  </h3>
                  <p className="text-neutral-600">
                    {country.population.toLocaleString()}
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                    Region
                  </h3>
                  <p className="text-neutral-600">{country.region}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                    Sub Region
                  </h3>
                  <p className="text-neutral-600">{country.subregion || "N/A"}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                    Capital
                  </h3>
                  <p className="text-neutral-600">
                    {country.capital?.[0] || "N/A"}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                    Top Level Domain
                  </h3>
                  <p className="text-neutral-600">
                    {country.tld?.join(", ") || "N/A"}
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                    Currencies
                  </h3>
                  <p className="text-neutral-600">
                    {Object.values(country.currencies || {})
                      .map((currency) => `${currency.name} (${currency.symbol})`)
                      .join(", ") || "N/A"}
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                    Languages
                  </h3>
                  <p className="text-neutral-600">
                    {Object.values(country.languages || {}).join(", ") || "N/A"}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-4">
                Border Countries
              </h3>
              <div className="flex flex-wrap gap-2">
                {country.borders?.map((border) => (
                  <Button
                    key={border}
                    onClick={() => navigate(`/country/${border}`)}
                    className="bg-white hover:bg-neutral-100 text-neutral-700"
                  >
                    {border}
                  </Button>
                )) || (
                  <p className="text-neutral-600">No border countries</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryDetail; 