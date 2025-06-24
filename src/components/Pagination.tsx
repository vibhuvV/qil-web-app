import React from "react";

import {
  Pagination as UIPagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationProps {
  totalPages: number;
  currentPage: number;

  className?: string;
  maxPagesToShow?: number;
}

const Pagination = ({
  totalPages,
  currentPage,
  className,
  maxPagesToShow = 3,
}: PaginationProps) => {
  const getPaginationRange = () => {
    const range: (number | string)[] = [];
    const halfRange = Math.floor(maxPagesToShow / 2);

    let start = Math.max(1, currentPage - halfRange);
    let end = Math.min(totalPages, currentPage + halfRange);

    // Adjust start and end to always show `visibleCount` pages, if possible
    if (currentPage - halfRange < 1) {
      end = Math.min(totalPages, end + (halfRange - currentPage + 1));
    }
    if (currentPage + halfRange > totalPages) {
      start = Math.max(1, start - (currentPage + halfRange - totalPages));
    }

    // Add ellipsis at the start if needed
    if (start > 1) range.push("...");

    // Add visible page numbers
    for (let i = start; i <= end; i++) {
      range.push(i);
    }

    // Add ellipsis at the end if needed
    if (end < totalPages) range.push("...");

    return range;
  };

  const paginationRange = getPaginationRange();

  return (
    <UIPagination className={className}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            disabled={currentPage === 1}
            search={{ pageNo: currentPage - 1 }}
          />
        </PaginationItem>
        {paginationRange.map((page, index) =>
          typeof page === "number" ? (
            <PaginationItem key={index}>
              <PaginationLink
                isActive={page === currentPage}
                search={{ pageNo: page }}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ) : (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          ),
        )}
        <PaginationItem>
          <PaginationNext
            disabled={currentPage === totalPages}
            search={{ pageNo: currentPage + 1 }}
          />
        </PaginationItem>
      </PaginationContent>
    </UIPagination>
  );
};

export default React.memo(Pagination);
