import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems?: number;
  itemsPerPage?: number;
  label?: string;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  itemsPerPage,
  label = 'itens',
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const getVisiblePages = () => {
    const delta = 2;
    const range: (number | string)[] = [];
    const rangeWithDots: (number | string)[] = [];

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= currentPage - delta && i <= currentPage + delta)) {
        range.push(i);
      } else if (range[range.length - 1] !== '...') {
        range.push('...');
      }
    }

    range.forEach((p) => {
      rangeWithDots.push(p);
    });

    return rangeWithDots;
  };

  const startItem = totalItems ? (currentPage - 1) * (itemsPerPage || 10) + 1 : undefined;
  const endItem = totalItems ? Math.min(currentPage * (itemsPerPage || 10), totalItems) : undefined;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-border/40">
      {/* Info */}
      {totalItems && itemsPerPage && (
        <p className="text-xs text-text-muted/60">
          Mostrando {startItem}-{endItem} de {totalItems} {label}
        </p>
      )}
      <div className="flex items-center gap-1">
        {/* First */}
        <button
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className="w-8 h-8 rounded-lg flex items-center justify-center text-text-muted/50 hover:text-text-primary hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          <ChevronsLeft className="w-4 h-4" />
        </button>

        {/* Prev */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="w-8 h-8 rounded-lg flex items-center justify-center text-text-muted/50 hover:text-text-primary hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Pages */}
        {getVisiblePages().map((page, i) =>
          page === '...' ? (
            <span key={`dots-${i}`} className="w-8 h-8 flex items-center justify-center text-text-muted/40 text-xs">
              ...
            </span>
          ) : (
            <button
              key={page}
              onClick={() => onPageChange(page as number)}
              className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-semibold transition-all ${
                page === currentPage
                  ? 'bg-accent text-white shadow-md shadow-accent/20'
                  : 'text-text-muted/60 hover:text-text-primary hover:bg-white/5'
              }`}
            >
              {page}
            </button>
          )
        )}

        {/* Next */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="w-8 h-8 rounded-lg flex items-center justify-center text-text-muted/50 hover:text-text-primary hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        {/* Last */}
        <button
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          className="w-8 h-8 rounded-lg flex items-center justify-center text-text-muted/50 hover:text-text-primary hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          <ChevronsRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
