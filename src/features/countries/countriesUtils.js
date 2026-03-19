// Redux Slice
export function clampPage(page, totalPages) {
  return Math.min(Math.max(page, 1), totalPages);
}

export function normalizePage(page) {
  return Number.isInteger(page) && page >= 1 ? page : 1;
}

export function normalizeRegion(region) {
  return region?.trim() ? region.trim() : "All";
}

export function syncPagination(state) {
  state.totalPages =
    Math.ceil(state.filteredCountries.length / state.itemsPerPage) || 1;
  state.currentPage = clampPage(state.requestedPage, state.totalPages);
}

export function applyFilters(state) {
  const { countries, searchedCountry, region } = state;

  state.filteredCountries = countries.filter((country) => {
    const matchesSearch =
      searchedCountry === "" ||
      country.name.common.toLowerCase().includes(searchedCountry.toLowerCase());

    const matchesRegion = region === "All" || country.region === region;

    return matchesSearch && matchesRegion;
  });

  syncPagination(state);
}

// HomePage
export function isValidPageParam(pageParam) {
  return /^\d+$/.test(pageParam) && Number(pageParam) >= 1;
}

export function getAvailableRegions(countries) {
  return [
    ...new Set(countries.map((country) => country.region).filter(Boolean)),
  ];
}

export function resolveRegionParam(regionParam, availableRegions) {
  const normalizedRegion = regionParam.trim();

  if (!normalizedRegion || normalizedRegion.toLowerCase() === "all") {
    return {
      hasRegionParam: Boolean(normalizedRegion),
      isInvalidRegion: false,
      resolvedRegion: "All",
    };
  }

  const matchedRegion = availableRegions.find(
    (region) => region.toLowerCase() === normalizedRegion.toLowerCase(),
  );

  return {
    hasRegionParam: true,
    isInvalidRegion: !matchedRegion,
    resolvedRegion: matchedRegion ?? "All",
  };
}
