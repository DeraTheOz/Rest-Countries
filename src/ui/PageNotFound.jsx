import {
  Link,
  isRouteErrorResponse,
  useLocation,
  useNavigate,
  useRouteError,
} from "react-router";

import Header from "./Header";

function PageNotFound() {
  const error = useRouteError();
  const location = useLocation();
  const navigate = useNavigate();

  const statusCode = isRouteErrorResponse(error) ? error.status : 404;
  const isNotFound = statusCode === 404;

  const title = isNotFound
    ? "We can't find that destination"
    : "Something went off course";
  const description = isNotFound
    ? "The route you visited does not exist or may have been moved. Try heading back to the homepage and exploring from there."
    : "The app hit an unexpected routing problem. You can head back safely and keep browsing.";

  function handleGoBack() {
    if (window.history.length > 1) {
      navigate(-1);
      return;
    }

    navigate("/");
  }

  return (
    <>
      <Header />

      <main className="mx-auto mb-10 max-w-fit px-4 sm:px-10">
        <section className="relative overflow-hidden rounded-[0.3125rem] bg-white px-6 py-10 shadow-md sm:px-10 sm:py-14 dark:bg-blue-900">
          <div className="absolute -left-12 top-8 h-28 w-28 rounded-full border border-blue-950/10 dark:border-white/10" />

          <div className="flex flex-col gap-10">
            <div className="space-y-6">
              <div className="space-y-3">
                <span className="inline-flex rounded-full bg-grey-50 px-4 py-2 text-[0.7rem] font-extrabold uppercase tracking-[0.3em] text-grey-400 shadow-sm dark:bg-blue-950 dark:text-white/70">
                  Error {statusCode}
                </span>

                <h1 className="max-w2xl text-3xl font-extrabold leading-tight sm:text-5xl">
                  {title}
                </h1>

                <p className="max-w-2xl text-sm leading-7 text-grey-400 sm:text-base dark:text-white/70">
                  {description}
                </p>
              </div>

              <div className="max-w-fit rounded-[0.3125rem] border border-blue-950/10 bg-grey-50/80 px-4 py-3 shadow-sm dark:border-white/10 dark:bg-blue-950/60">
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-grey-400 dark:text-white/60">
                  Attempted Route
                </p>
                <p className="mt-2 break-all font-mono text-sm text-grey-950 dark:text-white">
                  {location.pathname}
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/"
                  className="inline-flex min-h-12 items-center justify-center rounded-[0.3125rem] bg-blue-900 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-950 dark:bg-white dark:text-blue-950 dark:hover:bg-slate-100"
                >
                  Back to Homepage
                </Link>

                <button
                  type="button"
                  onClick={handleGoBack}
                  className="inline-flex min-h-12 items-center justify-center rounded-[0.3125rem] border border-blue-950/10 bg-transparent px-6 py-3 text-sm font-semibold shadow-sm transition-colors hover:bg-grey-50 dark:border-white/10 dark:hover:bg-blue-950"
                >
                  Go Back
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default PageNotFound;
