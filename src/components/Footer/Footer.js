import React, { Fragment } from 'react';

import { MdNavigateNext, MdNavigateBefore } from 'react-icons/md';

import './Footer.scss'

const Footer = (props) => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(props.dataLength / props.rowsPerPage); i++) {
        pageNumbers.push(i);
    }
    const lastPage = pageNumbers.length;
    const content = (
        <div className="footer-container">
            <div className="records-number">
                <p>Elements on page: </p>
                <select
                    onChange={props.handleSelectRowsPerPage}
                    value={props.rowsPerPage}>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                </select>
            </div>
            <div className="pages-counter">
                <button onClick={props.handlePaginationPageDecrease}>
                    <MdNavigateBefore />
                </button>
                <p>{props.currentPage} of {pageNumbers.length}</p>
                <button onClick={() => props.handlePaginationPageIncrease(lastPage)}>
                    <MdNavigateNext />
                </button>
            </div>
        </div>
    )
    return (
        <Fragment>
            {props.dataLength ? content : null}
        </Fragment>

    );
}

export default Footer;