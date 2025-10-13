import { Outlet } from "react-router";
import Header from "./Header";

function AppLayout() {
  return (
    <div className="mx-auto max-w-[90rem]">
      <Header />

      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
