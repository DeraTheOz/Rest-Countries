import { HiChevronDown } from "react-icons/hi";

function Filter() {
  return (
    <div className="max-w-[12.5rem]">
      <div className="relative rounded-[0.3125rem] bg-white outline-0 dark:bg-blue-900">
        <div className="flex h-12 cursor-pointer items-center justify-between px-6 shadow-sm">
          Filter by Region
          <button className="focus:rounded-sm focus:outline-none focus:ring-2 focus:ring-grey-50">
            <HiChevronDown />
          </button>
        </div>
      </div>

      <ul className="mt-1 flex h-44 flex-col justify-center gap-2 rounded-[0.3125rem] bg-white px-6 shadow-sm sm:h-48 dark:bg-blue-900">
        <li>Africa</li>
        <li>America</li>
        <li>Asia</li>
        <li>Europe</li>
        <li>Oceania</li>
      </ul>
    </div>
  );
}

export default Filter;
