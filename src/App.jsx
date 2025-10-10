import { createBrowserRouter, RouterProvider } from "react-router";

import HomePage from "./pages/HomePage";
import CountryDetailPage from "./pages/CountryDetailPage";

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
        Component: CountryDetailPage,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
