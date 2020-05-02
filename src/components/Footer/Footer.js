import React, { Fragment } from 'react';

import './Footer.scss'

const Footer = (props) => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(props.dataLength / props.rowsPerPage); i++) {
        pageNumbers.push(i);
    }
    return (
        <Fragment>
            <ul className="pagination-pages">
                {pageNumbers.map(number => {
                    return <li
                        key={number}
                        id={number}
                        onClick={props.handlePagination}>{number}</li>
                })}
            </ul>
            {/* <div>
                <button>-</button>
                <span></span>
                <button>+</button>
            </div> */}
        </Fragment>
    );
}

export default Footer;