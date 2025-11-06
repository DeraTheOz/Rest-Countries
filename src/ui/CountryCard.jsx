import { memo } from "react";
import { formatNumber } from "../utils/formatNumber";

function CountryCard({ country }) {
  const population =
    country.population === 0
      ? "No inhabitants"
      : formatNumber(country.population);

  const capital =
    country.capital.length === 0 || country.capital === ""
      ? "No capital"
      : country.capital;

  return (
    <div className="flex w-[16.5rem] flex-col justify-between overflow-clip rounded-[0.3125rem] bg-white shadow-md sm:w-full dark:bg-blue-900">
      <img
        src={country.flags.svg}
        alt={country.flags.alt || `${country.name.common} flag`}
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
    </div>
  );
}

export default memo(CountryCard);
