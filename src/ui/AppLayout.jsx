import { Outlet } from "react-router";
import Header from "./Header";
import Loader from "./Loader";
import SearchBar from "./SearchBar";
import Filter from "./Filter";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setStatus } from "../features/countries/countriesSlice";

function AppLayout() {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.countries);

  useEffect(() => {
    dispatch(setStatus("loading"));

    // Simulate loading only on mount
    const timer = setTimeout(() => {
      dispatch(setStatus("succeeded"));
    }, 3000);
    return () => clearTimeout(timer);
  }, [dispatch]);

  const isLoading = status === "loading";

  return (
    <>
      <Header />

      <section className="mx-auto mb-8 flex max-w-[90rem] flex-col justify-between gap-8 px-4 sm:flex-row sm:px-10">
        <SearchBar />
        <Filter />
      </section>

      {isLoading && <Loader />}

      <main className="mx-auto max-w-[90rem] px-4 sm:px-10">
        <Outlet />
      </main>
    </>
  );
}

export default AppLayout;
