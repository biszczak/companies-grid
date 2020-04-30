import React, { Fragment } from 'react';
import TableHeaderRow from './TableHeaderRow/TableHeaderRow';

const TableHeader = () => {
    return (
        <Fragment>
            <caption>Companies</caption>
            <thead>
                <TableHeaderRow />
            </thead>
        </Fragment>
    );
}

export default TableHeader;