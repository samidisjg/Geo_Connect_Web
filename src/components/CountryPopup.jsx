import React from "react";
import { Modal, Button } from "flowbite-react";
import { FaGlobeAmericas } from "react-icons/fa";

const CountryDetailModal = ({ showModal, onClose, country }) => {
  if (!country) return null;

  const {
    flags,
    name,
    capital,
    region,
    subregion,
    population,
    area,
    languages,
    timezones,
    startOfWeek,
    independent,
    tld,
    cca2,
    cca3,
    status,
  } = country;

  return (
    <Modal show={showModal} onClose={onClose} size="lg" popup>
      <Modal.Header className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white border-none">
        <div className="flex items-center">
          <div className="bg-white/20 p-2 rounded-full mr-3">
            <FaGlobeAmericas className="text-white text-xl" />
          </div>
          <h3 className="text-xl font-bold">{name?.common || "Country Details"}</h3>
        </div>
      </Modal.Header>
      <Modal.Body className="p-0">
        <div className="bg-gradient-to-br from-primary-50 via-secondary-50 to-primary-100 p-6">
          {/* Flag */}
          {flags?.svg ? (
            <div className="relative mb-6 rounded-xl overflow-hidden shadow-lg">
              <img
                src={flags.svg}
                alt={name?.common || "Country Flag"}
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <h2 className="absolute bottom-3 left-3 text-2xl font-bold text-white">
                {name?.common || "Unknown Country"}
              </h2>
            </div>
          ) : (
            <div className="w-full h-48 flex items-center justify-center text-primary-600 bg-primary-100 rounded-xl mb-6">
              No Flag Available
            </div>
          )}

          {/* Details */}
          <div className="space-y-6">
            {/* Basic Information Section */}
            <div className="bg-white/70 backdrop-blur-sm rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-primary-700 mb-4 border-b border-primary-100 pb-2">Basic Information</h3>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  <div className="font-medium text-primary-600">Capital</div>
                  <div className="md:col-span-2 text-primary-800">{capital?.[0] || "N/A"}</div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  <div className="font-medium text-primary-600">Region</div>
                  <div className="md:col-span-2 text-primary-800">{region || "N/A"}</div>
                </div>
                
                {subregion && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    <div className="font-medium text-primary-600">Subregion</div>
                    <div className="md:col-span-2 text-primary-800">{subregion}</div>
                  </div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  <div className="font-medium text-primary-600">Population</div>
                  <div className="md:col-span-2 text-primary-800">{population?.toLocaleString() || "N/A"}</div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  <div className="font-medium text-primary-600">Area</div>
                  <div className="md:col-span-2 text-primary-800">{area ? `${area.toLocaleString()} km²` : "N/A"}</div>
                </div>
              </div>
            </div>
            
            {/* Additional Details Section */}
            <div className="bg-white/70 backdrop-blur-sm rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-primary-700 mb-4 border-b border-primary-100 pb-2">Additional Details</h3>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  <div className="font-medium text-primary-600">Languages</div>
                  <div className="md:col-span-2 text-primary-800">{languages ? Object.values(languages).join(", ") : "N/A"}</div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  <div className="font-medium text-primary-600">Timezone</div>
                  <div className="md:col-span-2 text-primary-800">{timezones?.[0] || "N/A"}</div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  <div className="font-medium text-primary-600">Start of Week</div>
                  <div className="md:col-span-2 text-primary-800">{startOfWeek || "N/A"}</div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  <div className="font-medium text-primary-600">Independent</div>
                  <div className="md:col-span-2 text-primary-800">
                    {independent === true ? "Yes" : independent === false ? "No" : "Unknown"}
                  </div>
                </div>
                
                {status && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    <div className="font-medium text-primary-600">Status</div>
                    <div className="md:col-span-2 text-primary-800">{status}</div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Technical Information Section */}
            <div className="bg-white/70 backdrop-blur-sm rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-primary-700 mb-4 border-b border-primary-100 pb-2">Technical Information</h3>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  <div className="font-medium text-primary-600">Top-Level Domain</div>
                  <div className="md:col-span-2 text-primary-800">{tld?.join(", ") || "N/A"}</div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  <div className="font-medium text-primary-600">Country Codes</div>
                  <div className="md:col-span-2 text-primary-800">
                    <div>CCA2: {cca2 || "N/A"}</div>
                    <div>CCA3: {cca3 || "N/A"}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Close Button */}
          <div className="pt-6 flex justify-center">
            <Button
              className="bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white font-medium py-2.5 px-6"
              onClick={onClose}
            >
              Close
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default CountryDetailModal;