import { configureStore } from "@reduxjs/toolkit";
import countriesReducer from "./features/countries/countriesSlice";
import themeReducer from "./features/theme/themeSlice";

const store = configureStore({
  reducer: {
    countries: countriesReducer,
    theme: themeReducer,
  },
});

export default store;
