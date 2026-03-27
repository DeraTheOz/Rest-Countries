import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";

import HomePage, { loader } from "./pages/HomePage";
import CountryDetailsPage, {
  loader as countryDetailsLoader,
} from "./pages/CountryDetailsPage";

import AppLayout from "./ui/AppLayout";
import PageNotFound from "./ui/PageNotFound";

function shouldRevalidateHomePage({
  currentUrl,
  nextUrl,
  defaultShouldRevalidate,
}) {
  const isHomeSearchParamNavigation =
    currentUrl.pathname === "/" &&
    nextUrl.pathname === "/" &&
    currentUrl.search !== nextUrl.search;

  if (isHomeSearchParamNavigation) {
    return false;
  }

  return defaultShouldRevalidate;
}

const router = createBrowserRouter([
  {
    Component: AppLayout,
    errorElement: <PageNotFound />,

    children: [
      {
        index: true,
        loader: loader,
        shouldRevalidate: shouldRevalidateHomePage,
        Component: HomePage,
      },

      {
        path: "/country/:countryName",
        loader: countryDetailsLoader,
        Component: CountryDetailsPage,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
