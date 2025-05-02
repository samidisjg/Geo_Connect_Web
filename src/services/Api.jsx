const BASE_URL = "https://restcountries.com/v3.1";

// Fetch all countries from the API
export const fetchAllCountries = async () => {
  try {
    const res = await fetch(`${BASE_URL}/all`);
    if (!res.ok) throw new Error("Failed to fetch countries");
    return await res.json();
  } catch (error) {
    console.error("Error fetching all countries:", error);
  }
};

// Fetch countries that match the given name.
export const fetchCountriesByName = async (name) => {
  try {
    const res = await fetch(`${BASE_URL}/name/${name}`);
    if (!res.ok) throw new Error("Country not found");
    return await res.json();
  } catch (error) {
    console.error(`Error fetching countries by name "${name}":`, error);
  }
};

// Fetch countries within the specified region.
export const fetchCountriesByRegion = async (region) => {
  try {
    const res = await fetch(`${BASE_URL}/region/${region}`);
    if (!res.ok) throw new Error("Region not found");
    return await res.json();
  } catch (error) {
    console.error(`Error fetching countries by region "${region}":`, error);
  }
};

// Fetch countries using specific code.
export const fetchCountryByCode = async (code) => {
  try {
    const res = await fetch(`${BASE_URL}/alpha/${code}`);
    if (!res.ok) throw new Error("Country code not found");
    return await res.json();
  } catch (error) {
    console.error(`Error fetching country by code "${code}":`, error);
  }
};
