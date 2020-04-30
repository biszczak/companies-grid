import React, { Component } from 'react';
import Heading from '../../components/Heading/Heading';
import Table from '../Table/Table';

import './TableWrapper.scss';

class TableWrapper extends Component {
    state = {}
    render() {
        return (
            <div className="table-wrapper">
                <Heading />
                <Table />
                {/* <Fotter /> */}
            </div>
        );
    }
}

export default TableWrapper;