import React, { Component } from 'react';
import TableHeader from '../../components/TableHeader/TableHeader';
import TableBody from '../../components/TableBody/TableBody';


import './Table.scss';


class Table extends Component {
    state = {}

    render() {
        return (
            <table className="data-table">
                <TableHeader />
                <TableBody data={this.state.data} />
            </table>
        );
    }
}

export default Table;