import { useCallback, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLoaderData, useNavigate, useParams } from "react-router";

import {
  clearCountryDetails,
  setCountries,
  setCountryDetails,
  setError,
  setStatus,
} from "../features/countries/countriesSlice";

import {
  getCountryPath,
  getCapital,
  getCurrencies,
  getLanguages,
  getNativeName,
  getTopLevelDomain,
  getBorderCountries,
  findCountryByName,
  loadCountryPageData,
} from "../features/countries/countryDetailsUtils";

import { formatNumber } from "../utils/formatNumber";

import Button from "../ui/Button";
import Error from "../ui/Error";
import Loader from "../ui/Loader";
import StateMessage from "../ui/StateMessage";

function CountryDetailsPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const detailsData = useLoaderData();
  const { countryName: routeCountryName = "" } = useParams();

  const { countries, currentCountry, status } = useSelector(
    (store) => store.countries,
  );

  useEffect(() => {
    if (!detailsData.success) {
      dispatch(clearCountryDetails());

      if (detailsData.type === "not-found") {
        dispatch(setError(null));
        dispatch(setStatus("succeeded"));
      } else {
        dispatch(setError(detailsData.error));
        dispatch(setStatus("failed"));
      }

      return;
    }

    dispatch(setError(null));
    dispatch(setCountryDetails(detailsData.country));

    if (
      Array.isArray(detailsData.countries) &&
      detailsData.countries.length > 0
    ) {
      dispatch(setCountries(detailsData.countries));
    }

    dispatch(setStatus("succeeded"));
  }, [detailsData, dispatch]);

  const routeMatchedCountry = currentCountry
    ? findCountryByName([currentCountry], routeCountryName)
    : null;

  const displayedCountry = detailsData.success
    ? (routeMatchedCountry ?? detailsData.country)
    : routeMatchedCountry;

  const availableCountries = useMemo(() => {
    if (countries.length > 0) {
      return countries;
    }

    return detailsData.success && Array.isArray(detailsData.countries)
      ? detailsData.countries
      : [];
  }, [countries, detailsData]);

  const borderCountries = useMemo(
    () => getBorderCountries(availableCountries, displayedCountry?.borders),
    [availableCountries, displayedCountry?.borders],
  );

  const handleRetry = useCallback(async () => {
    dispatch(setStatus("loading"));
    dispatch(setError(null));

    try {
      const nextDetails = await loadCountryPageData(routeCountryName);
      dispatch(setCountryDetails(nextDetails.country));

      if (
        Array.isArray(nextDetails.countries) &&
        nextDetails.countries.length > 0
      ) {
        dispatch(setCountries(nextDetails.countries));
      }

      dispatch(setStatus("succeeded"));
    } catch (error) {
      dispatch(clearCountryDetails());
      dispatch(setStatus("failed"));
      dispatch(
        setError(
          error.message ||
            "Unable to load country details. Please check your internet connection and try again.",
        ),
      );
    }
  }, [dispatch, routeCountryName]);

  const handleGoBack = useCallback(() => {
    if (window.history.state?.idx > 0) {
      navigate(-1);
      return;
    }

    navigate("/", { replace: true });
  }, [navigate]);

  const handleBorderCountryClick = useCallback(
    (nextCountryName) => {
      dispatch(clearCountryDetails());
      dispatch(setStatus("loading"));
      navigate(getCountryPath(nextCountryName));
    },
    [dispatch, navigate],
  );

  if (status === "loading" && !displayedCountry) {
    return <Loader />;
  }

  if (
    !detailsData.success &&
    detailsData.type === "request-error" &&
    !displayedCountry
  ) {
    return <Error handleRetry={handleRetry} />;
  }

  if (!displayedCountry) {
    return (
      <StateMessage
        title="Country not found"
        message={`We couldn't find a country that matches "${routeCountryName}". Try returning to the homepage and choosing a country from the list.`}
        actionLabel="Back to Homepage"
        onAction={() => navigate("/", { replace: true })}
      />
    );
  }

  const countryName = displayedCountry.name.common;
  const nativeName = getNativeName(displayedCountry);
  const population =
    typeof displayedCountry.population === "number"
      ? formatNumber(displayedCountry.population)
      : "Not available";
  const region = displayedCountry.region || "Not available";
  const subRegion = displayedCountry.subregion || "Not available";
  const capital = getCapital(displayedCountry);
  const topLevelDomain = getTopLevelDomain(displayedCountry);
  const currencies = getCurrencies(displayedCountry);
  const languages = getLanguages(displayedCountry);
  const hasBorders =
    Array.isArray(displayedCountry.borders) &&
    displayedCountry.borders.length > 0;
  const bordersUnavailable = hasBorders && borderCountries.length === 0;

  return (
    <section className="mx-auto mb-4 mt-10 max-w-[90rem] md:mt-16">
      <Button onClick={handleGoBack} type="prev">
        Back
      </Button>

      <div className="mt-16 grid grid-cols-1 xl:grid-cols-2 xl:items-center xl:gap-16">
        <div className="overflow-clip rounded-lg">
          <img
            src={displayedCountry.flags.svg}
            alt={displayedCountry.flags.alt || `${countryName} flag`}
            className="rounded-lg"
          />
        </div>

        <div className="mb-4 mt-12 flex flex-col xl:m-0">
          <h2 className="mb-8 text-[1.375rem] font-extrabold lg:text-[2rem]">
            {countryName}
          </h2>

          <div className="flex flex-wrap justify-between gap-10 text-sm lg:text-base [&_li]:font-light [&_span]:font-semibold [&_ul]:space-y-2">
            <ul>
              <li>
                <span>Native Name:</span> {nativeName}
              </li>
              <li>
                <span>Population:</span> {population}
              </li>
              <li>
                <span>Region:</span> {region}
              </li>
              <li>
                <span>Sub Region:</span> {subRegion}
              </li>
              <li>
                <span>Capital:</span> {capital}
              </li>
            </ul>

            <ul>
              <li>
                <span>Top Level Domain:</span> {topLevelDomain}
              </li>
              <li>
                <span>Currencies:</span> {currencies}
              </li>
              <li>
                <span>Languages:</span> {languages}
              </li>
            </ul>
          </div>

          <div className="mt-8 flex flex-col gap-4 xs:flex-row xs:items-start xl:mt-16">
            <p className="font-semibold">Border Countries:</p>

            {borderCountries.length > 0 ? (
              <ul className="flex flex-wrap gap-2">
                {borderCountries.map((borderCountry) => (
                  <li key={borderCountry.cca3}>
                    <Button
                      onClick={() =>
                        handleBorderCountryClick(borderCountry.name.common)
                      }
                      type="normal"
                    >
                      {borderCountry.name.common}
                    </Button>
                  </li>
                ))}
              </ul>
            ) : bordersUnavailable ? (
              <p className="text-sm font-light lg:text-base">
                Border countries are unavailable right now
              </p>
            ) : (
              <p className="text-sm font-light lg:text-base">
                No bordering countries
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// eslint-disable-next-line
export async function loader({ params }) {
  const routeCountryName = params.countryName ?? "";

  try {
    const details = await loadCountryPageData(routeCountryName);

    return {
      success: true,
      ...details,
    };
  } catch (error) {
    return {
      success: false,
      type:
        error.message === "Country not found" ? "not-found" : "request-error",
      error: error.message || "Failed to load country details",
    };
  }
}

export default CountryDetailsPage;
