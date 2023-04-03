import React from 'react';
import { Pagination } from 'react-bootstrap';
import './Pagination.css';

const Paginate = ({ currentPage, setCurrentPage, totalPages }) => {
  const maxPageButtons = 5;

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };

  const renderPageButtons = () => {
    const pageButtons = [];

    if (totalPages <= maxPageButtons) {
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
  };

  return (
    <div className='pagination_container'>
      <Pagination>
        <Pagination.Prev
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        />
        {renderPageButtons()}
        <Pagination.Next
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        />
      </Pagination>
    </div>
  );
};

export default Paginate;
