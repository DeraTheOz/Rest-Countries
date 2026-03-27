import { Outlet } from "react-router";
import Header from "./Header";

function AppLayout() {
  return (
    <>
      <Header />

      <main className="mx-auto mb-10 max-w-[90rem] px-4 sm:px-10">
        <Outlet />
      </main>
    </>
  );
}

export default AppLayout;
