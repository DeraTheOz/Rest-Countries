const API_URL = "https://restcountries.com/v3.1";

const COUNTRY_SUMMARY_FIELDS = "cca3,name,flags,population,region,capital";
const COUNTRY_DETAILS_FIELDS =
  "name,flags,population,region,subregion,capital,tld,currencies,languages,borders";

async function requestCountries(url, errorMessage) {
  try {
    const res = await fetch(url);

    if (!res.ok) {
      if (res.status === 404) {
        throw new Error("Country not found");
      }

      throw new Error(errorMessage);
    }

    return await res.json();
  } catch (error) {
    console.error(error.message);
    throw error;
  }
}

export async function getCountries() {
  return requestCountries(
    `${API_URL}/all?fields=${COUNTRY_SUMMARY_FIELDS}`,
    "Unable to fetch countries data",
  );
}

export async function getCountryDetailsByName(countryName) {
  const encodedCountryName = encodeURIComponent(countryName);
  const data = await requestCountries(
    `${API_URL}/name/${encodedCountryName}?fullText=true&fields=${COUNTRY_DETAILS_FIELDS}`,
    "Unable to fetch country details",
  );

  return Array.isArray(data) ? data[0] : data;
}
