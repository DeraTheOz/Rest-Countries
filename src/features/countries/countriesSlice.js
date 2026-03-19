import { createSlice } from "@reduxjs/toolkit";
import {
  applyFilters,
  clampPage,
  normalizePage,
  normalizeRegion,
  syncPagination,
} from "./countriesUtils";

const initialState = {
  countries: [],
  filteredCountries: [],
  status: "idle",
  error: null,
  region: "All",
  searchedCountry: "",

  // Pagination
  currentPage: 1,
  requestedPage: 1,
  itemsPerPage: 12,
  totalPages: 1,
};

const countriesSlice = createSlice({
  name: "countries",
  initialState,
  reducers: {
    setStatus(state, action) {
      state.status = action.payload;
    },

    setCountries(state, action) {
      state.countries = action.payload;
      applyFilters(state);
    },

    setSearch(state, action) {
      state.searchedCountry = action.payload;
      state.requestedPage = 1;
      applyFilters(state);
    },

    setRegion(state, action) {
      state.region = action.payload;
      state.requestedPage = 1;
      applyFilters(state);
    },

    setCurrentPage(state, action) {
      const page = normalizePage(action.payload);
      state.requestedPage = page;
      state.currentPage = clampPage(page, state.totalPages);
    },

    setItemsPerPage(state, action) {
      state.itemsPerPage = action.payload;
      state.requestedPage = 1;
      syncPagination(state);
    },

    setFromURL(state, action) {
      const { search, page, region } = action.payload;
      state.searchedCountry = search;
      state.region = normalizeRegion(region);
      state.requestedPage = normalizePage(page);
      applyFilters(state);
    },

    setError(state, action) {
      state.error = action.payload;
      if (action.payload) {
        state.status = "failed";
      }
    },
  },
});

export const {
  setCountries,
  setStatus,
  setSearch,
  setRegion,
  setCurrentPage,
  setItemsPerPage,
  setFromURL,
  setError,
} = countriesSlice.actions;

export default countriesSlice.reducer;
