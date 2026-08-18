// src/components/ui/Pagination.jsx

"use client";

import { cn } from "@/lib/cn";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  totalCount,
  startIndex,
  endIndex,
  itemsPerPage,
  siblingCount = 1,
  showItemsInfo = true,
  className,
}) => {
  // Generate page numbers with ellipsis
  const getPageNumbers = () => {
    const totalPageNumbers = siblingCount * 2 + 3;
    const firstPage = 1;
    const lastPage = totalPages;

    if (totalPages <= totalPageNumbers) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, firstPage);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, lastPage);

    const shouldShowLeftEllipsis = leftSiblingIndex > firstPage + 1;
    const shouldShowRightEllipsis = rightSiblingIndex < lastPage - 1;

    if (!shouldShowLeftEllipsis && shouldShowRightEllipsis) {
      const leftRange = Array.from(
        { length: 3 + 2 * siblingCount },
        (_, i) => i + 1,
      );
      return [...leftRange, "...", lastPage];
    }

    if (shouldShowLeftEllipsis && !shouldShowRightEllipsis) {
      const rightRange = Array.from(
        { length: 3 + 2 * siblingCount },
        (_, i) => lastPage - (2 + 2 * siblingCount) + i,
      );
      return [firstPage, "...", ...rightRange];
    }

    if (shouldShowLeftEllipsis && shouldShowRightEllipsis) {
      const middleRange = Array.from(
        { length: rightSiblingIndex - leftSiblingIndex + 1 },
        (_, i) => leftSiblingIndex + i,
      );
      return [firstPage, "...", ...middleRange, "...", lastPage];
    }

    return [];
  };

  const pageNumbers = getPageNumbers();

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-between gap-4 px-4 py-3 sm:flex-row",
        className,
      )}
    >
      {/* Items info */}
      {showItemsInfo && totalCount > 0 && (
        <div className="text-sm text-gray-700">
          Showing <span className="font-medium">{startIndex}</span> to{" "}
          <span className="font-medium">{endIndex}</span> of{" "}
          <span className="font-medium">{totalCount}</span> results
        </div>
      )}

      {/* Pagination buttons */}
      <div className="flex items-center gap-1">
        {/* Previous */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={cn(
            "flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-sm font-medium transition-colors",
            currentPage === 1
              ? "cursor-not-allowed bg-gray-50 text-gray-400"
              : "hover:bg-gray-50 hover:text-gray-700",
          )}
        >
          <ChevronLeft size={16} />
        </button>

        {/* Page numbers */}
        {pageNumbers.map((page, index) => {
          if (page === "...") {
            return (
              <span
                key={`ellipsis-${index}`}
                className="flex h-9 w-9 items-center justify-center text-sm text-gray-500"
              >
                &#8230;
              </span>
            );
          }

          return (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={cn(
                "flex h-9 min-w-9 items-center justify-center rounded-lg px-2 text-sm font-medium transition-colors border",
                currentPage === page
                  ? "bg-green-600 text-white hover:bg-green-700 border-primary"
                  : "text-gray-700 hover:bg-gray-50 border-gray-200",
              )}
            >
              {page}
            </button>
          );
        })}

        {/* Next */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={cn(
            "flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-sm font-medium transition-colors",
            currentPage === totalPages
              ? "cursor-not-allowed bg-gray-50 text-gray-400"
              : "hover:bg-gray-50 hover:text-gray-700",
          )}
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
