import React from 'react';
import { FiChevronDown } from 'react-icons/fi';

import './TableHeaderRow.scss';

const TableHeaderRow = (props) => {
    const headerElements = [
        { id: 'elem1', name: 'Id', sortBy: 'id', icon: props.sortSymbol.id },
        { id: 'elem2', name: 'Name', sortBy: 'name', icon: props.sortSymbol.name },
        { id: 'elem3', name: 'City', sortBy: 'city', icon: props.sortSymbol.city },
        { id: 'elem4', name: 'Total income', sortBy: 'companyTotalIncome', icon: props.sortSymbol.companyTotalIncome },
        { id: 'elem5', name: 'Average income', sortBy: 'averageIncome', icon: props.sortSymbol.averageIncome },
        { id: 'elem6', name: 'Last month income', sortBy: 'lastMonthIncome', icon: props.sortSymbol.lastMonthIncome },
    ]

    return (
        <tr className="data-table__row">
            {headerElements.map(element => {
                return (
                    <th key={element.id}>
                        <button
                            className='sort-button'
                            onClick={() => props.sortBy(element.sortBy)}>{element.name}</button>
                        {element.icon === 'desc' ? <FiChevronDown /> : null}
                    </th>
                )
            })}
        </tr>
    );
}

export default TableHeaderRow;