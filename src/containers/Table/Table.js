import React, { Component } from 'react';
import TableHeader from '../../components/TableHeader/TableHeader';
import TableBody from '../../components/TableBody/TableBody';

import './Table.scss';


class Table extends Component {
    state = {}

    render() {
        return (
            <table className="data-table">
                {/* <input
                    onChange={this.handleChange}
                /> */}
                <TableHeader
                    sortBy={this.props.sortBy}
                    sortSymbol={this.props.sortSymbol} />
                <TableBody data={this.props.data} />
            </table>
        );
    }
}

export default Table;