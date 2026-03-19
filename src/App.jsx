import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";

import HomePage, { loader } from "./pages/HomePage";
import CountryDetailsPage from "./pages/CountryDetailsPage";

import AppLayout from "./ui/AppLayout";
import PageNotFound from "./ui/PageNotFound";

const router = createBrowserRouter([
  {
    Component: AppLayout,
    errorElement: <PageNotFound />,

    children: [
      {
        index: true,
        loader: loader,
        Component: HomePage,
      },

      {
        path: "/country/:countryName",
        Component: CountryDetailsPage,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
