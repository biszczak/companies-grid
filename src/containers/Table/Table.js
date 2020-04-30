import React, { Component } from 'react';
import TableHeader from '../../components/TableHeader/TableHeader';


class Table extends Component {
    state = {}
    render() {
        return (
            <table>
                <TableHeader />
                <tbody>
                    <tr>
                        <td>82</td>
                        <td>Rockefeller</td>
                        <td>Nebrasca</td>
                        <td>3242332$</td>
                        <td>0$</td>
                        <td>1233$</td>
                    </tr>
                </tbody>
            </table>
        );
    }
}

export default Table;