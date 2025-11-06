import { memo } from "react";
import Button from "./Button";

function Pagination({ currentPage, totalPages, onFirst, onPrev, onNext }) {
  return (
    <div className="my-8 space-y-4">
      <span>
        Page {currentPage} of {totalPages}
      </span>

      <div className="flex flex-col items-center justify-between gap-4 xs:mr-4 xs:flex-row">
        {currentPage >= 3 && (
          <Button onClick={onFirst} type="home">
            Home
          </Button>
        )}

        {currentPage >= 2 && (
          <Button onClick={onPrev} type="prev">
            Prev
          </Button>
        )}

        {currentPage < totalPages && (
          <Button onClick={onNext} type="next">
            Next
          </Button>
        )}
      </div>
    </div>
  );
}

export default memo(Pagination);
