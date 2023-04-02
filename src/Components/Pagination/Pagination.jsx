import React from 'react';
import { Pagination } from 'react-bootstrap';

const Paginate =({currentPage, setCurrentPage, totalPages})=> {






  const maxPageButtons = 5; // Show 5 page buttons: current page and 2 pages before and 2 pages after

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  }

  const renderPageButtons = () => {
    const pageButtons = [];

    if (totalPages <= maxPageButtons) {
      // If the total number of pages is less than or equal to the maximum number of page buttons to show, just show all the pages
      for (let i = 1; i <= totalPages; i++) {
        pageButtons.push(
          <Pagination.Item
            key={i}
            onClick={() => handlePageChange(i)}
            active={currentPage === i}
          >
            {i}
          </Pagination.Item>
        );
      }
    } else {
      // Otherwise, show the current page and 2 pages before and after
      let startPage = Math.max(currentPage - 2, 1);
      let endPage = Math.min(startPage + maxPageButtons - 1, totalPages);

      if (endPage - startPage < maxPageButtons - 1) {
        startPage = Math.max(endPage - maxPageButtons + 1, 1);
      }

      for (let i = startPage; i <= endPage; i++) {
        pageButtons.push(
          <Pagination.Item
            key={i}
            onClick={() => handlePageChange(i)}
            active={currentPage === i}
          >
            {i}
          </Pagination.Item>
        );
      }
    }

    return pageButtons;
  }

  return (
    <div>
      <Pagination>
        <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
        {renderPageButtons()}
        <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
      </Pagination>
    </div>
  );
}

export default Paginate;