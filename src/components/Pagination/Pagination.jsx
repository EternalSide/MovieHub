import { useState } from 'react';

import { Button, Typography } from '@mui/material';

import './Pagination.css';

function Pagination({ currentPage, totalPages, setPage }) {
    if (totalPages === 0) return null;

    const handlePrev = () => {
        if (currentPage !== 1) {
            setPage((prevPage) => prevPage - 1);
        }
    };
    const handleNext = () => {
        if (currentPage !== totalPages) {
            setPage((prevPage) => prevPage + 1);
        }
    };
    return (
        <div className="pagination">
            <Button
                onClick={handlePrev}
                className="pagination__button"
                variant="contained"
                color="primary"
                type="button"
            >
                Prev
            </Button>
            <Typography variant="h4" className="pagination__page-number">
                Страница: {currentPage}
            </Typography>
            <Button
                onClick={handleNext}
                className="pagination__button"
                variant="contained"
                color="primary"
                type="button"
            >
                Next
            </Button>
        </div>
    );
}

export default Pagination;
