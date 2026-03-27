import { useCallback, useEffect, useLayoutEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLoaderData, useSearchParams } from "react-router";

import { getCountries } from "../services/countriesApi";

import {
  setCountries,
  setError,
  setFromURL,
  setStatus,
} from "../features/countries/countriesSlice";
import {
  getAvailableRegions,
  isValidPageParam,
  resolveRegionParam,
} from "../features/countries/countriesUtils";

import { useMinLoadingTime } from "../hooks/useMinLoadingTime";

import CountryCard from "../ui/CountryCard";
import Pagination from "../ui/Pagination";
import Loader from "../ui/Loader";
import Error from "../ui/Error";
import StateMessage from "../ui/StateMessage";
import SearchBar from "../ui/SearchBar";
import Filter from "../ui/Filter";

function HomePage() {
  const dispatch = useDispatch();
  const countriesData = useLoaderData();
  const [searchParams, setSearchParams] = useSearchParams();

  const {
    countries,
    filteredCountries,
    status,
    searchedCountry,
    region,
    currentPage,
    requestedPage,
    itemsPerPage,
    totalPages,
  } = useSelector((store) => store.countries);

  const searchParamValue = searchParams.get("search") ?? "";
  const normalizedSearch = searchParamValue.trim();
  const rawPageParam = searchParams.get("page");
  const hasPageParam = rawPageParam !== null;
  const hasValidPageFormat =
    rawPageParam === null || isValidPageParam(rawPageParam);
  const normalizedPage =
    hasValidPageFormat && rawPageParam ? Number(rawPageParam) : 1;
  const rawRegionParam = searchParams.get("region") ?? "";
  const normalizedRegionParam = rawRegionParam.trim();

  const availableRegions = useMemo(() => {
    const countriesSource =
      countries.length > 0
        ? countries
        : countriesData.success && Array.isArray(countriesData.data)
          ? countriesData.data
          : [];

    return getAvailableRegions(countriesSource);
  }, [countries, countriesData]);

  const { hasRegionParam, isInvalidRegion, resolvedRegion } = useMemo(
    () => resolveRegionParam(normalizedRegionParam, availableRegions),
    [availableRegions, normalizedRegionParam],
  );

  const enforceMinLoadingTime = useMinLoadingTime(dispatch);

  // Sync URL state into redux
  useEffect(() => {
    dispatch(
      setFromURL({
        search: normalizedSearch,
        page: normalizedPage,
        region: resolvedRegion,
      }),
    );
  }, [dispatch, normalizedPage, normalizedSearch, resolvedRegion]);

  // Handle loader results and manage data/error states
  useLayoutEffect(
    function () {
      if (!countriesData.success) {
        dispatch(setError(countriesData.error));
        dispatch(setStatus("failed"));
        return;
      }

      if (Array.isArray(countriesData.data)) {
        const loadStartedAt = Date.now();

        dispatch(setError(null));
        dispatch(setStatus("loading"));
        dispatch(setCountries(countriesData.data));
        const cleanup = enforceMinLoadingTime(
          loadStartedAt,
          setStatus("succeeded"),
        );
        return cleanup;
      }
    },
    [countriesData, dispatch, enforceMinLoadingTime],
  );

  // Handle data refetching
  const handleRetry = useCallback(async () => {
    const loadStartedAt = Date.now();

    dispatch(setStatus("loading"));
    dispatch(setError(null));

    try {
      const countries = await getCountries();
      if (Array.isArray(countries) && countries.length > 0) {
        dispatch(setCountries(countries));
        enforceMinLoadingTime(loadStartedAt, setStatus("succeeded"));
        return;
      }
    } catch {
      dispatch(setStatus("failed"));
      dispatch(
        setError(
          "Unable to load countries. Please check your internet connection and try again.",
        ),
      );
    }
  }, [dispatch, enforceMinLoadingTime]);

  const handleClearSearch = useCallback(() => {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.delete("search");
    nextParams.delete("page");
    setSearchParams(nextParams, { replace: true });
  }, [searchParams, setSearchParams]);

  const handleClearRegion = useCallback(() => {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.delete("region");
    setSearchParams(nextParams, { replace: true });
  }, [searchParams, setSearchParams]);

  const handleResolvePageError = useCallback(() => {
    const nextParams = new URLSearchParams(searchParams);

    if (currentPage <= 1) {
      nextParams.delete("page");
    } else {
      nextParams.set("page", String(currentPage));
    }

    setSearchParams(nextParams, { replace: true });
  }, [currentPage, searchParams, setSearchParams]);

  // Edge Cases
  const hasNoResults =
    status === "succeeded" &&
    !isInvalidRegion &&
    searchedCountry !== "" &&
    filteredCountries.length === 0;

  const hasInvalidRegionParam =
    status === "succeeded" && hasRegionParam && isInvalidRegion;

  const hasInvalidPage =
    status === "succeeded" &&
    !hasInvalidRegionParam &&
    !hasNoResults &&
    hasPageParam &&
    (!hasValidPageFormat || requestedPage !== currentPage);

  const pageHelpText =
    totalPages === 1
      ? "Only page 1 is available for this result set."
      : `Choose a page between 1 and ${totalPages}.`;

  const resultsMessage = useMemo(() => {
    if (hasInvalidRegionParam) {
      const supportedRegions =
        availableRegions.length > 0 ? availableRegions.join(", ") : "All";

      return {
        title: "Region not found",
        message: `The region "${normalizedRegionParam}" is not available. Use one of the supported regions: ${supportedRegions}.`,
        actionLabel: "Clear region filter",
        onAction: handleClearRegion,
      };
    }

    if (hasNoResults) {
      return {
        title: "No results found",
        message:
          region === "All"
            ? `No countries matched "${searchedCountry}". Try another search term.`
            : `No countries matched "${searchedCountry}" in the ${region} region. Try another search term or change the region filter.`,
        actionLabel: "Clear search",
        onAction: handleClearSearch,
      };
    }

    if (hasInvalidPage) {
      const requestedLabel = rawPageParam ?? String(requestedPage);
      const scope =
        searchedCountry === ""
          ? "for the current country list"
          : `for countries matching "${searchedCountry}"`;

      return {
        title: "Page not found",
        message: `Page ${requestedLabel} does not exist ${scope}. ${pageHelpText}`,
        actionLabel:
          currentPage <= 1 ? "Go to page 1" : `Go to page ${currentPage}`,
        onAction: handleResolvePageError,
      };
    }

    return null;
  }, [
    currentPage,
    availableRegions,
    handleClearSearch,
    handleClearRegion,
    handleResolvePageError,
    hasInvalidPage,
    hasInvalidRegionParam,
    hasNoResults,
    normalizedRegionParam,
    pageHelpText,
    rawPageParam,
    region,
    requestedPage,
    searchedCountry,
  ]);

  // Calculate number of countries to be rendered at a time
  const start = (currentPage - 1) * itemsPerPage;
  const paginatedCountries = useMemo(
    () => filteredCountries.slice(start, start + itemsPerPage),
    [filteredCountries, itemsPerPage, start],
  );

  const shouldShowLoader =
    status === "loading" ||
    (countriesData.success && countries.length === 0 && status !== "succeeded");
  const shouldShowError =
    !shouldShowLoader &&
    countries.length === 0 &&
    (!countriesData.success || status === "failed");

  return (
    <>
      {shouldShowLoader ? (
        <Loader />
      ) : shouldShowError ? (
        <Error handleRetry={handleRetry} />
      ) : resultsMessage ? (
        <StateMessage
          title={resultsMessage.title}
          message={resultsMessage.message}
          actionLabel={resultsMessage.actionLabel}
          onAction={resultsMessage.onAction}
        />
      ) : (
        <>
          <section className="mx-auto mb-8 flex max-w-[90rem] flex-col justify-between gap-8 sm:flex-row">
            <SearchBar />
            <Filter />
          </section>

          <section className="mx-auto grid max-w-[90rem] grid-cols-custom justify-center justify-items-center gap-8 sm:justify-items-start">
            {paginatedCountries.map((country) => (
              <CountryCard country={country} key={country.name.common} />
            ))}
          </section>

          <Pagination />
        </>
      )}
    </>
  );
}

// eslint-disable-next-line
export async function loader() {
  try {
    const countries = await getCountries();
    return {
      success: true,
      data: countries || [],
    };
  } catch (error) {
    console.error("Loader error:", error);
    return {
      success: false,
      error: error.message || "Failed to load countries",
    };
  }
}

export default HomePage;
