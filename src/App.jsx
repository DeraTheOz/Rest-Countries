import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";

import HomePage, { loader } from "./pages/HomePage";
import CountryDetailsPage from "./pages/CountryDetailsPage";

import Error from "./ui/Error";
import AppLayout from "./ui/AppLayout";
import Loader from "./ui/Loader";

const router = createBrowserRouter([
  {
    Component: AppLayout,
    errorElement: <Error />,

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
  return <RouterProvider router={router} hydrateFallback={<Loader />} />;
}

export default App;
