import store from "../../store";
import {
  getCountries,
  getCountryDetailsByName,
} from "../../services/countriesApi";

export async function loadCountryPageData(countryName) {
  const existingCountries = store.getState().countries.countries;
  const country = await getCountryDetailsByName(countryName);

  if (existingCountries.length > 0) {
    return {
      country,
      countries: existingCountries,
    };
  }

  const hasBorders =
    Array.isArray(country?.borders) && country.borders.length > 0;

  if (!hasBorders) {
    return {
      country,
      countries: [],
    };
  }

  try {
    const countries = await getCountries();

    return {
      country,
      countries,
    };
  } catch {
    return {
      country,
      countries: [],
    };
  }
}

export function normalizeCountryName(countryName) {
  return countryName?.trim().toLowerCase() ?? "";
}

export function getCountryPath(countryName) {
  return `/country/${encodeURIComponent(countryName)}`;
}

export function findCountryByName(countries, countryName) {
  const normalizedName = normalizeCountryName(countryName);

  return countries.find((country) => {
    const commonName = normalizeCountryName(country.name.common);
    const officialName = normalizeCountryName(country.name.official);

    return commonName === normalizedName || officialName === normalizedName;
  });
}

export function getNativeName(country) {
  const nativeNames = country?.name?.nativeName
    ? Object.values(country.name.nativeName)
    : [];

  if (nativeNames.length === 0) {
    return country?.name?.official || country?.name?.common || "Not available";
  }

  return (
    nativeNames[0].common ||
    nativeNames[0].official ||
    country.name.official ||
    country.name.common
  );
}

export function getCapital(country) {
  return Array.isArray(country?.capital) && country.capital.length > 0
    ? country.capital.join(", ")
    : "No capital";
}

export function getTopLevelDomain(country) {
  return Array.isArray(country?.tld) && country.tld.length > 0
    ? country.tld.join(", ")
    : "Not available";
}

export function getCurrencies(country) {
  if (!country?.currencies) return "Not available";

  const currencies = Object.values(country.currencies).map(
    ({ name, symbol }) => {
      const formattedName = name
        ? `${name.slice(0, 1).toUpperCase()}${name.slice(1)}`
        : "Unknown currency";

      return symbol ? `${formattedName} (${symbol})` : formattedName;
    },
  );

  return currencies.length > 0 ? currencies.join(", ") : "Not available";
}

export function getLanguages(country) {
  if (!country?.languages) return "Not available";

  const languages = Object.values(country.languages);
  return languages.length > 0 ? languages.join(", ") : "Not available";
}

export function getBorderCountries(countries, borderCodes = []) {
  if (!Array.isArray(borderCodes) || borderCodes.length === 0) return [];

  return borderCodes
    .map((borderCode) =>
      countries.find((country) => country.cca3 === borderCode),
    )
    .filter(Boolean);
}
