import { useSelector } from "react-redux";

function Error({ handleRetry }) {
  const { error } = useSelector((store) => store.countries);

  return (
    <div className="absolute inset-0 flex items-center justify-center px-4 m-auto text-center min-h-min max-w-80">
      <div className="space-y-2">
        <p>{error}</p>
        <button
          onClick={handleRetry}
          className="px-6 py-2 text-white bg-white rounded shadow-sm disabled:opacity-50 dark:bg-blue-900"
        >
          Retry
        </button>
      </div>
    </div>
  );
}

export default Error;
