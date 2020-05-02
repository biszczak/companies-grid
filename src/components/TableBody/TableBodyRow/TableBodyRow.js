import React, { Component, Fragment } from 'react';
import Spinner from '../../UI/Spinner/Spinner';

import { COMPANIES_API, INCOMES_API } from '../../../common/Urls';

import './TableBodyRow.scss';



class TableBodyRow extends Component {
    state = {
        data: null,
        loading: true
    }

    componentDidMount() {
        this.getCompaniesData();
    }


    async getData(name) {
        const response = await fetch(name);
        const data = await response.json();
        return data;
    }


    getLastMonthIncome(incomes) {
        const prevMonth = new Date(new Date().setDate(0)).toISOString();
        const [pyyyy, pmm] = prevMonth.split(/T|:|-/);
        let prevMonthIncome = 0;

        incomes.forEach(income => {
            const [incomeYear, incomeMonth] = income.date.split(/T|:|-/);
            if ((pyyyy + pmm) === (incomeYear + incomeMonth)) {
                prevMonthIncome += parseFloat(income.value);
            }

        });
        return prevMonthIncome.toFixed(2);
    }


    async getCompaniesData() {
        const companies = await this.getData(COMPANIES_API);
        let companiesArr = [...companies];
        let companiesArrCopy = [...companiesArr];
        let incomesArr = [];

        let companyIncome = null;
        let averageIncome = null;
        let lastMonthIncome = null;
        Promise.all(companiesArr.map((company, index) => fetch(`${INCOMES_API}/${company.id}`)))
            .then(resp => Promise.all(resp.map(r => r.json())))
            .then(data => {
                const mergedData = [];
                companiesArrCopy.forEach((company, index) => {
                    data.forEach(income => {
                        if (company.id === income.id) {
                            const companyIncome = income.incomes.reduce((acc, val) => acc + parseFloat(val.value), 0);
                            const averageIncome = (companyIncome / income.incomes.length).toFixed(2);
                            const lastMonthIncome = this.getLastMonthIncome(income.incomes)
                            const data = {
                                id: company.id,
                                name: company.name,
                                city: company.city,
                                companyTotalIncome: companyIncome.toFixed(2),
                                averageIncome: averageIncome,
                                lastMonthIncome: lastMonthIncome
                            }
                            mergedData.push(data);
                        }
                    })
                })
                this.setState({ data: mergedData })
            });
    }

    render() {

        let content;
        if (!this.state.data) {
            content = <Spinner />;
        } else {

            content = this.state.data.map(company => (
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