import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";

interface ArticlePaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function ArticlePagination({
  currentPage,
  totalPages,
  onPageChange,
}: ArticlePaginationProps) {
  return (
    <Pagination className="mt-12">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            className={`${
              currentPage === 1 ? "pointer-events-none opacity-50" : ""
            } bg-white text-gray-700 hover:bg-gray-100 transition-colors duration-300`}
          />
        </PaginationItem>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
          <PaginationItem key={pageNum}>
            <PaginationLink
              onClick={() => onPageChange(pageNum)}
              className={`${
                pageNum === currentPage
                  ? "bg-primary text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              } px-4 py-2 rounded-md transition-colors duration-300`}
            >
              {pageNum}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            className={`${
              currentPage === totalPages ? "pointer-events-none opacity-50" : ""
            } bg-white text-gray-700 hover:bg-gray-100 transition-colors duration-300`}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
