import ReactPaginate from 'react-paginate';

function Pagination({ pageCount, onPageChange, pageRangeDisplayed, justify }) {
  return (
    <nav className="text-center" aria-label="Page navigation example">
      <ReactPaginate
        previousLabel=""
        nextLabel=""
        breakLabel=""
        pageCount={pageCount}
        onPageChange={onPageChange}
        pageRangeDisplayed={pageRangeDisplayed}
        activeClassName="active "
        activeLinkClassName="page-link "
        previousClassName="page-item d-inline-block"
        previousLinkClassName="page-link fa fa-arrow-left "
        nextClassName="page-item d-inline-block"
        nextLinkClassName="page-link fa fa-arrow-right "
        containerClassName={`pagination  justify-content-${justify}`}
        pageClassName="page-item d-inline-block"
        pageLinkClassName="page-link "
        breakClassName="page-link "
        disabledClassName="disabled  text-muted"
        disabledLinkClassName="disabled text-muted "
      />
    </nav>
  );
}

export default Pagination;
