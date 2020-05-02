import React from 'react';

import './TableHeaderRow.scss';

const TableHeaderRow = (props) => {
    return (
        <tr className="data-table__row">
            <th>
                <button onClick={() => props.sortBy('id')}>Id</button>
            </th>
            <th>
                <button onClick={() => props.sortBy('name')}>Name</button>
            </th>
            <th>
                <button onClick={() => props.sortBy('city')}>City</button>
            </th>
            <th>
                <button onClick={() => props.sortBy('companyTotalIncome')}>Total income</button>
            </th>
            <th>
                <button onClick={() => props.sortBy('averageIncome')}>Average income</button>
            </th>
            <th>
                <button onClick={() => props.sortBy('lastMonthIncome')}>Last month income</button>
            </th>
        </tr>
    );
}

export default TableHeaderRow;