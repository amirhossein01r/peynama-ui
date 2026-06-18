import {
  Pagination as ShadcnPagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationEllipsis,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import type { PaginationProps } from "@/types/pagination";

function Pagination({ currentPage, totalPages }: PaginationProps) {
  const getPages = () => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (currentPage <= 4) {
      return [1, 2, 3, 4, 5, 0, totalPages];
    }

    if (currentPage >= totalPages - 3) {
      return [
        1,
        0,
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }

    // middle
    return [1, 0, currentPage - 1, currentPage, currentPage + 1, 0, totalPages];
  };

  return (
    <ShadcnPagination>
      <PaginationContent>
        {/* Previous */}
        <PaginationItem>
          <Link
            disabled={currentPage == 1}
            to="."
            search={{
              page: currentPage - 1,
            }}
          >
            <PaginationPrevious
              className={cn(
                "bg-primary text-primary-foreground",
                "hover:bg-primary/90! hover:text-primary-foreground/90!",
              )}
            />
          </Link>
        </PaginationItem>

        {getPages().map((page) => {
          if (page === 0) {
            return (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            );
          }
          return (
            <PaginationItem key={page}>
              <Link disabled={currentPage == page} to="." search={{ page }}>
                <PaginationLink
                  isActive={page === currentPage}
                  className={
                    page === currentPage ? "border-primary! border-2" : ""
                  }
                >
                  {page}
                </PaginationLink>
              </Link>
            </PaginationItem>
          );
        })}

        {/* Next */}
        <PaginationItem>
          <Link
            disabled={currentPage == totalPages}
            to="."
            search={{
              page: currentPage + 1,
            }}
          >
            <PaginationNext
              className={cn(
                "bg-primary text-primary-foreground",
                "hover:bg-primary/90! hover:text-primary-foreground/90!",
              )}
            />
          </Link>
        </PaginationItem>
      </PaginationContent>
    </ShadcnPagination>
  );
}

export { Pagination };
