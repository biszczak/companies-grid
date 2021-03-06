import React, { Fragment } from 'react';
import TableHeaderRow from './TableHeaderRow/TableHeaderRow';

import './TableHeader.scss';

const TableHeader = (props) => {
    return (
        <Fragment>
            <thead className="table-header">
                <TableHeaderRow
                    sortBy={props.sortBy}
                    sortSymbol={props.sortSymbol} />
            </thead>
        </Fragment>
    );
}

export default TableHeader;