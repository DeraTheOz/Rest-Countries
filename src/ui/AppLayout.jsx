import { Outlet } from "react-router";
import Header from "./Header";

function AppLayout() {
  return (
    <div className="mx-auto max-w-[90rem] border border-red-500">
      <Header />

      <main className="">
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
