// components/Pagination.js
'use client';

export default function Pagination({ 
  currentPage, 
  totalPages, 
  onPageChange,
  itemsPerPage,
  onItemsPerPageChange 
}) {
  const pageNumbers = [];
  const maxVisiblePages = 3;
  
  let startPage = Math.max(1, currentPage - 1);
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
  
  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }
  
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between mt-8 pt-6 border-t">
      <div className="flex items-center mb-4 sm:mb-0">
        <span className="text-gray-600 mr-3">Show</span>
        <select
          value={itemsPerPage}
          onChange={(e) => onItemsPerPageChange(parseInt(e.target.value))}
          className="border border-gray-300 rounded px-3 py-2 text-gray-700"
        >
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </select>
        <span className="ml-3 text-gray-600">per page</span>
      </div>
      
      <div className="flex items-center space-x-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-3 py-2 rounded border ${
            currentPage === 1
              ? 'text-gray-400 border-gray-300 cursor-not-allowed'
              : 'text-gray-700 border-gray-300 hover:bg-gray-50'
          }`}
        >
          ◀ Previous
        </button>
        
        {startPage > 1 && (
          <>
            <button
              onClick={() => onPageChange(1)}
              className={`px-3 py-2 rounded border ${
                currentPage === 1
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
            >
              1
            </button>
            {startPage > 2 && <span className="px-2 text-gray-500">...</span>}
          </>
        )}
        
        {pageNumbers.map(page => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-3 py-2 rounded border ${
              currentPage === page
                ? 'bg-blue-600 text-white border-blue-600'
                : 'text-gray-700 border-gray-300 hover:bg-gray-50'
            }`}
          >
            {page}
          </button>
        ))}
        
        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && <span className="px-2 text-gray-500">...</span>}
            <button
              onClick={() => onPageChange(totalPages)}
              className={`px-3 py-2 rounded border ${
                currentPage === totalPages
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
            >
              {totalPages}
            </button>
          </>
        )}
        
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-3 py-2 rounded border ${
            currentPage === totalPages
              ? 'text-gray-400 border-gray-300 cursor-not-allowed'
              : 'text-gray-700 border-gray-300 hover:bg-gray-50'
          }`}
        >
          Next ▶
        </button>
      </div>
    </div>
  );
}