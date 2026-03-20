import { Outlet } from "react-router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "./Header";
import SearchBar from "./SearchBar";
import Filter from "./Filter";

import { setStatus } from "../features/countries/countriesSlice";

function AppLayout() {
  const dispatch = useDispatch();
  const { status } = useSelector((store) => store.countries);

  // Set loading state on app mount
  useEffect(() => {
    dispatch(setStatus("loading"));
  }, [dispatch]);

  return (
    <>
      <Header />

      {status !== "failed" && (
        <section className="mx-auto mb-8 flex max-w-[90rem] flex-col justify-between gap-8 px-4 sm:flex-row sm:px-10">
          <SearchBar />
          <Filter />
        </section>
      )}

      <main className="mx-auto mb-10 max-w-[90rem] px-4 sm:px-10">
        <Outlet />
      </main>
    </>
  );
}

export default AppLayout;
