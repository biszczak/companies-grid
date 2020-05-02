import React from 'react';
import TableBodyRow from '../TableBody/TableBodyRow/TableBodyRow';

import './TableBody.scss';

const TableBody = (props) => {
    return (
        <tbody className="table-body">
            <TableBodyRow data={props.data} />
        </tbody>
    );
}

export default TableBody;