import { memo } from "react";
import { Link } from "react-router";

import { formatNumber } from "../utils/formatNumber";
import { getCountryPath } from "../features/countries/countryDetailsUtils";

function CountryCard({ country }) {
  const population =
    country.population === 0
      ? "No inhabitants"
      : formatNumber(country.population);

  const capital =
    !Array.isArray(country.capital) || country.capital.length === 0
      ? "No capital"
      : country.capital.join(", ");

  return (
    <Link
      to={getCountryPath(country.name.common)}
      aria-label={`View details for ${country.name.common}`}
      className="flex max-w-[18.5rem] flex-grow basis-[16.5rem] flex-col justify-between overflow-clip rounded-[0.3125rem] bg-white shadow-md dark:bg-blue-900"
    >
      <img
        src={country.flags.svg}
        alt={country.flags.alt || `${country.name.common} flag`}
        className="aspect-[3/2] h-full w-full object-cover"
      />

      <div className="my-8 px-6">
        <h3 className="mb-4 text-lg font-extrabold">{country.name.common}</h3>

        <ul className="space-y-2 [&_li]:font-light [&_span]:text-sm [&_span]:font-semibold">
          <li>
            <span>Population:</span> {population}
          </li>
          <li>
            <span>Region:</span> {country.region}
          </li>
          <li>
            <span>Capital:</span> {capital}
          </li>
        </ul>
      </div>
    </Link>
  );
}

export default memo(CountryCard);
