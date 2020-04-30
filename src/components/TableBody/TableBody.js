import React from 'react';
import TableBodyRow from '../TableBody/TableBodyRow/TableBodyRow';

import './TableBody.scss';

const TableBody = () => {
    return (
        <tbody className="table-body">
            <TableBodyRow />
        </tbody>
    );
}

export default TableBody;