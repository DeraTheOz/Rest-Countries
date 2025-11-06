import { HiArrowNarrowLeft, HiArrowNarrowRight } from "react-icons/hi";

function Button({ children, onClick, type }) {
  if (type === "home")
    return (
      <button
        onClick={onClick}
        className="h-8 min-w-[6.5rem] gap-2 rounded-sm bg-white text-sm font-light shadow-lg xs:mr-4 sm:rounded-md sm:text-base dark:bg-blue-900"
      >
        {children}
      </button>
    );

  if (type === "prev")
    return (
      <button
        onClick={onClick}
        className="flex h-8 min-w-[6.5rem] items-center justify-center gap-2 rounded-sm bg-white text-sm font-light shadow-lg sm:rounded-md sm:text-base dark:bg-blue-900"
      >
        <HiArrowNarrowLeft />
        <span>{children}</span>
      </button>
    );

  if (type === "next")
    return (
      <button
        onClick={onClick}
        className="flex h-8 min-w-[6.5rem] items-center justify-center gap-2 rounded-sm bg-white text-sm font-light shadow-lg xs:ml-auto sm:rounded-md sm:text-base dark:bg-blue-900"
      >
        <span>{children}</span>
        <HiArrowNarrowRight />
      </button>
    );

  if (type === "normal")
    return (
      <button
        onClick={onClick}
        className="h-7 min-w-24 rounded-sm text-xs font-light shadow-lg sm:text-sm dark:bg-blue-900"
      >
        {children}
      </button>
    );
}

export default Button;
