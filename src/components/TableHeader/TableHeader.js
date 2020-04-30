import React, { Fragment } from 'react';
import TableHeaderRow from './TableHeaderRow/TableHeaderRow';

import './TableHeader.scss';

const TableHeader = () => {
    return (
        <Fragment>
            <thead className="table-header">
                <TableHeaderRow />
            </thead>
        </Fragment>
    );
}

export default TableHeader;