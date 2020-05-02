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
                    <td>{company.id}</td>
                    <td>{company.name}</td>
                    <td>{company.city}</td>
                    <td>{company.companyTotalIncome}</td>
                    <td>{company.averageIncome}</td>
                    <td>{company.lastMonthIncome}</td>
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