import { HiArrowNarrowLeft, HiArrowNarrowRight } from "react-icons/hi";

function Button({ children, onClick, type }) {
  if (type === "home")
    return (
      <button
        onClick={onClick}
        className="gap-2 rounded-sm bg-white px-5 py-1.5 text-sm font-light shadow-lg xs:mr-4 sm:rounded-md sm:text-base dark:bg-blue-900"
      >
        {children}
      </button>
    );

  if (type === "prev")
    return (
      <button
        onClick={onClick}
        className="flex items-center justify-center gap-2 rounded-sm bg-white px-5 py-1.5 text-sm font-light shadow-lg sm:rounded-md sm:text-base dark:bg-blue-900"
      >
        <HiArrowNarrowLeft />
        <span>{children}</span>
      </button>
    );

  if (type === "next")
    return (
      <button
        onClick={onClick}
        className="flex items-center justify-center gap-2 rounded-sm bg-white px-5 py-1.5 text-sm font-light shadow-lg xs:ml-auto sm:rounded-md sm:text-base dark:bg-blue-900"
      >
        <span>{children}</span>
        <HiArrowNarrowRight />
      </button>
    );

  if (type === "normal")
    return (
      <button
        onClick={onClick}
        className="rounded-sm px-5 py-1.5 text-xs font-light shadow-lg sm:text-sm dark:bg-blue-900"
      >
        {children}
      </button>
    );
}

export default Button;
