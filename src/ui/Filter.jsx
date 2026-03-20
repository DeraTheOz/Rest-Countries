import { useEffect, useRef, useState } from "react";
import { HiChevronDown } from "react-icons/hi";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router";

function Filter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { countries, region } = useSelector((store) => store.countries);
  const [isOpen, setIsOpen] = useState(false);
  const filterRef = useRef(null);

  const regions = [
    "All",
    ...new Set(countries.map((country) => country.region).filter(Boolean)),
  ];

  useEffect(() => {
    if (!isOpen) return;

    function handleOutsideClick(event) {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("pointerdown", handleOutsideClick);

    return () => {
      document.removeEventListener("pointerdown", handleOutsideClick);
    };
  }, [isOpen]);

  function handleSelect(selectedRegion) {
    const nextParams = new URLSearchParams(searchParams);

    if (selectedRegion === "All") {
      nextParams.delete("region");
    } else {
      nextParams.set("region", selectedRegion);
    }

    nextParams.delete("page");
    setSearchParams(nextParams, { replace: true });

    setIsOpen(false);
  }

  return (
    <div ref={filterRef} className="relative w-[12.5rem] text-xs sm:text-sm">
      <div className="relative rounded-[0.3125rem] bg-white outline-0 dark:bg-blue-900">
        <div
          className="flex h-12 cursor-pointer items-center justify-between px-6 shadow-sm"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <span>{region === "All" ? "Filter by Region" : region}</span>
          <button
            type="button"
            className="flex items-center justify-center focus:rounded-sm focus:outline-none focus:ring-2 focus:ring-grey-50"
          >
            <HiChevronDown />
          </button>
        </div>
      </div>

      {isOpen && (
        <ul className="absolute z-50 mt-1 flex h-48 min-w-full flex-col justify-center gap-2 rounded-[0.3125rem] bg-white px-6 shadow-sm transition-opacity sm:h-56 dark:bg-blue-900">
          {regions.map((region) => (
            <li
              className="cursor-pointer rounded-sm transition-all duration-200 hover:bg-blue-950/25 dark:hover:bg-blue-950/50"
              key={region}
              onClick={() => handleSelect(region)}
            >
              {region}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Filter;
