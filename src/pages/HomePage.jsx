import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLoaderData, useSearchParams } from "react-router";

import { getCountries } from "../services/countriesApi";
import { setCountries, setError } from "../features/countries/countriesSlice";

import CountryCard from "../ui/CountryCard";
import Pagination from "../ui/Pagination";

function HomePage() {
  const dispatch = useDispatch();
  const countriesData = useLoaderData();
  const { countries, status, error } = useSelector((store) => store.countries);

  // Search params
  const [searchParams, setSearchParams] = useSearchParams();
  const pageParam = Number(searchParams.get("page")) || 1;
  const [currentPage, setCurrentPage] = useState(pageParam);

  // Sync URL state only when currentPage changes
  useEffect(() => {
    setSearchParams({ page: currentPage });
  }, [currentPage, setSearchParams]);

  // Handle loader errors (only once)
  useEffect(() => {
    if (!countriesData) dispatch(setError("Failed to load countries."));
  }, [countriesData, dispatch]);

  // Store data in Redux
  useEffect(() => {
    if (countriesData.length > 0 && status === "succeeded") {
      dispatch(setCountries(countriesData));
    }
  }, [countriesData, dispatch, status]);

  // Pagination Logic
  const ITEMS_PER_PAGE = 16;
  const indexOfLastCountry = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstCountry = indexOfLastCountry - ITEMS_PER_PAGE;
  const currentCountries = useMemo(
    () => countries.slice(indexOfFirstCountry, indexOfLastCountry),
    [countries, indexOfFirstCountry, indexOfLastCountry],
  );

  const totalPages = useMemo(
    () => Math.ceil(countries.length / ITEMS_PER_PAGE),
    [countries.length],
  );

  const handleFirstPage = useCallback(() => setCurrentPage(1), []);

  const handleNextPage = useCallback(() => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  }, [totalPages]);

  const handlePrevPage = useCallback(() => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  }, []);

  return (
    <>
      {!countriesData && status !== "loading" ? (
        <div className="absolute inset-0 flex items-center justify-center px-4 text-center">
          {error} Please try again
        </div>
      ) : (
        <>
          <section className="mx-auto grid max-w-[90rem] grid-cols-custom justify-center justify-items-center gap-8 sm:justify-items-start">
            {currentCountries.map((country) => (
              <CountryCard country={country} key={country.name.common} />
            ))}
          </section>

          {/* Pagination Controls */}
          {status === "succeeded" && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onFirst={handleFirstPage}
              onPrev={handlePrevPage}
              onNext={handleNextPage}
            />
          )}
        </>
      )}
    </>
  );
}

// eslint-disable-next-line
export async function loader() {
  const countries = await getCountries();
  return countries;
}

export default HomePage;
