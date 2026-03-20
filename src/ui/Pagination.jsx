import { memo } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router";

import Button from "./Button";

function Pagination() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { currentPage, totalPages } = useSelector((state) => state.countries);

  if (totalPages <= 1) return null;

  function updatePage(page) {
    const nextParams = new URLSearchParams(searchParams);

    if (page <= 1) {
      nextParams.delete("page");
    } else {
      nextParams.set("page", String(page));
    }

    setSearchParams(nextParams);
  }

  return (
    <div className="my-8 space-y-4">
      <span>
        Page {currentPage} of {totalPages}
      </span>

      <div className="flex flex-col items-center justify-between gap-4 xs:mr-4 xs:flex-row">
        {currentPage >= 3 && (
          <Button onClick={() => updatePage(1)} type="home">
            Home
          </Button>
        )}

        {currentPage >= 2 && (
          <Button onClick={() => updatePage(currentPage - 1)} type="prev">
            Prev
          </Button>
        )}

        {currentPage < totalPages && (
          <Button onClick={() => updatePage(currentPage + 1)} type="next">
            Next
          </Button>
        )}
      </div>
    </div>
  );
}

export default memo(Pagination);
