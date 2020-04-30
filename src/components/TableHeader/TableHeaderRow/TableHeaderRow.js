import React from 'react';

import './TableHeaderRow.scss';

const TableHeaderRow = () => {
    return (
        <tr className="data-table__row">
            <th>Id</th>
            <th>Name</th>
            <th>City</th>
            <th>Total income</th>
            <th>Average income</th>
            <th>Last month income</th>
        </tr>
    );
}

export default TableHeaderRow;