import { HiOutlineSearch } from "react-icons/hi";

function SearchBar() {
  return (
    <form className="flex h-12 max-w-[21.4rem] items-center gap-5 rounded-[0.3125rem] bg-white px-6 shadow-sm dark:bg-blue-900">
      <label htmlFor="search" className="cursor-pointer">
        <span>
          <HiOutlineSearch />
        </span>
      </label>
      <input
        type="text"
        id="search"
        placeholder="Search for a country…"
        className="w-full cursor-pointer bg-transparent text-xs outline-0 placeholder:text-[#C4C4C4] sm:text-sm dark:placeholder:text-white"
        required
      />
    </form>
  );
}

export default SearchBar;
