import React from 'react';

const Search = () => {
  return (
    <div className="d-flex w-100 justify-content-center">
      <div className="d-flex rounded-pill border shadow-sm p-4 w-100" style={{ maxWidth: '850px' }} >
        <div className="flex-grow-1 border-end pe-3">
          <div className="small fw-medium">Where</div>
          <input
            type="text"
            className="border-0 text-muted small"
            placeholder="Search destinations"
            style={{ outline: 'none', width: '100%' }}
          />
        </div>
        <div className="px-3 border-end">
          <div className="small fw-medium">Check in</div>
          <div className="text-muted small">Add dates</div>
        </div>
        <div className="px-3 border-end">
          <div className="small fw-medium">Check out</div>
          <div className="text-muted small">Add dates</div>
        </div>
        <div className="flex-grow-1 ps-3">
          <div className="small fw-medium">Who</div>
          <div className="text-muted small">Add guests</div>
        </div>
        <button
          className="btn btn-danger rounded-circle ms-2"
          style={{ width: '36px', height: '36px', padding: '0' }}
        >
          <i className="bi bi-search"></i>
        </button>
      </div>
    </div>
  );
};

export default Search;
