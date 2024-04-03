import React from "react";
import ReactPaginate from "react-paginate";

const PaginatedItems = ({ handlePageClick, pageCount, currentItems }) => {
  return (
    <div className="paginatedItems">
      <div className="paginatedItems__showing">
        Showing {currentItems.length}{" "}
        {currentItems.length > 1 ? "results" : "result"}
      </div>
      <ReactPaginate
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={pageCount}
        previousLabel="<"
        pageClassName="paginatedItems__page-item"
        pageLinkClassName="paginatedItems__page-link"
        previousClassName="paginatedItems__page-item"
        previousLinkClassName="paginatedItems__page-link"
        nextClassName="paginatedItems__page-item"
        nextLinkClassName="paginatedItems__page-link"
        breakLabel="..."
        breakClassName="paginatedItems__page-item"
        breakLinkClassName="paginatedItems__page-link"
        containerClassName="paginatedItems__pagination"
        activeClassName="paginatedItems__active"
        renderOnZeroPageCount={null}
      />
    </div>
  );
};

export default PaginatedItems;
