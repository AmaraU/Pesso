import React from 'react';
import styles from './Pagination.module.css';
import { getImageUrl } from '../../../utils';

const Pagination = ({ filteredData, currentPage, itemsPerPage, onPageChange }) => {

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handlePageClick = (pageNumber) => {
        onPageChange(pageNumber);
    };
    
    
    const getPagination = () => {
        const delta = 1;
        const range = [];
        const left = currentPage - delta;
        const right = currentPage + delta;

        let l;

        for (let i = 1; i <= totalPages; i++) {
            if (i === 1 || i === totalPages || (i >= left && i <= right)) {
                range.push(i);
            }
        }

        const pagination = [];
        for (let i of range) {
            if (l) {
                if (i - l === 2) {
                    pagination.push(l + 1);
                }
                else if (i - l !== 1) {
                    pagination.push('...');
                }
            }
            pagination.push(i);
            l = i;
        }

        return pagination;
    };

    const pages = getPagination();

    
    return (
        <div className={styles.pagination}>
            <button onClick={handlePreviousPage} disabled={currentPage === 1} className={styles.move}>
                <img src={getImageUrl("icons/greyLeftAngle.png")} alt="Previous" />
                Previous
            </button>
            <div className={styles.numbers}>
                {pages.map((page, index) =>
                    page === '...' ? (
                        <span key={`ellipsis-${index}`} className={styles.ellipsis}>...</span>
                    ) : (
                    <button
                        key={`page-${page}`}
                        onClick={() => handlePageClick(page)}
                        className={currentPage === page ? styles.activePage : styles.gotToPage}
                    >
                        {page < 10 ? `0${page}` : page}
                    </button>
                    )
                )}
            </div>
            <button onClick={handleNextPage} disabled={currentPage === totalPages} className={styles.move}>
                Next
                <img src={getImageUrl("icons/greyRightAngle.png")} alt="Next" />
            </button>
        </div>
    );
};

export default Pagination;