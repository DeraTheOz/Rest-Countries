import { useEffect, useState, useTransition } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { useSearchParams } from "react-router";

function SearchBar() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentSearch = (searchParams.get("search") ?? "").trim();
  const [inputValue, setInputValue] = useState(currentSearch);
  const [, startTransition] = useTransition();

  // Sync input value
  useEffect(() => {
    setInputValue(currentSearch);
  }, [currentSearch]);

  // Debounce search & update search params
  useEffect(() => {
    const timer = setTimeout(() => {
      const normalizedInput = inputValue.trim();

      if (normalizedInput === currentSearch) return;

      const nextParams = new URLSearchParams(searchParams);

      if (normalizedInput) {
        nextParams.set("search", normalizedInput);
      } else {
        nextParams.delete("search");
      }

      nextParams.delete("page");

      startTransition(() => {
        setSearchParams(nextParams, { replace: true });
      });
    }, 300);

    return () => clearTimeout(timer);
  }, [currentSearch, inputValue, searchParams, setSearchParams]);

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="flex h-12 max-w-[21.4rem] items-center gap-5 rounded-[0.3125rem] bg-white px-6 shadow-sm dark:bg-blue-900"
    >
      <label htmlFor="search" className="cursor-pointer">
        <span>
          <HiOutlineSearch />
        </span>
      </label>
      <input
        type="text"
        id="search"
        aria-label="Search countries"
        role="searchbox"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Search for a country..."
        className="w-full cursor-pointer bg-transparent text-xs outline-none placeholder:text-[#C4C4C4] sm:text-sm dark:placeholder:text-white"
      />
    </form>
  );
}

export default SearchBar;
