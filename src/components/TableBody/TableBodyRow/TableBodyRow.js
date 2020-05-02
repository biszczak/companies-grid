import React, { Component, Fragment } from 'react';
import Spinner from '../../UI/Spinner/Spinner';



import './TableBodyRow.scss';



class TableBodyRow extends Component {
    state = {
        data: this.props.data,
        loading: true
    }



    render() {

        let content;
        if (!this.props.data) {
            content = <Spinner />;
        } else {

            content = this.props.data.map(company => (
                <tr key={company.id} className="table-row">
                    <td data-title="id">{company.id}</td>
                    <td data-title="name">{company.name}</td>
                    <td data-title="city">{company.city}</td>
                    <td data-title="companyTotalIncome">{company.companyTotalIncome}</td>
                    <td data-title="averageIncome">{company.averageIncome}</td>
                    <td data-title="lastMonthIncome">{company.lastMonthIncome}</td>
                </tr>
            )
            );
        }

        return (
            <Fragment>
                {content}
            </Fragment>

        )
    }


};

export default TableBodyRow;