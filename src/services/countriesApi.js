const API_URL = "https://restcountries.com/v3.1/all";

export async function getCountries() {
  try {
    const res = await fetch(
      `${API_URL}?fields=name,flags,population,region,capital,subregion,tld,currencies,languages,borders`,
    );

    if (!res.ok) throw new Error("Unable to fetch countries data");

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error.message);
  }
}
