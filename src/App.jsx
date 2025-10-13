import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";

import HomePage from "./pages/HomePage";
import CountryDetailsPage from "./pages/CountryDetailsPage";

import Error from "./ui/Error";
import AppLayout from "./ui/AppLayout";

const router = createBrowserRouter([
  {
    Component: AppLayout,
    errorElement: <Error />,

    children: [
      {
        index: true,
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
