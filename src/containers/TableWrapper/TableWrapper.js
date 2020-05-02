import React, { Component } from 'react';
import Heading from '../../components/Heading/Heading';
import Table from '../Table/Table';

import { COMPANIES_API, INCOMES_API } from '../../common/Urls';

import './TableWrapper.scss';

class TableWrapper extends Component {
    state = {
        data: null,
        filteredData: null,
        columns: [],
        searchInput: ""
    }

    componentDidMount() {
        this.getCompaniesData();
    }

    handleChange = event => {
        this.setState({ searchInput: event.target.value }, () => {
            this.globalSearch();
        });
    };

    globalSearch = () => {
        let { searchInput, data } = this.state;
        let filteredData = data.filter(value => {
            return (
                value.name.toLowerCase().includes(searchInput.toLowerCase()) ||
                value.city.toLowerCase().includes(searchInput.toLowerCase()) ||
                value.id.toString().toLowerCase().includes(searchInput.toLowerCase()) ||
                value.averageIncome.toLowerCase().includes(searchInput.toLowerCase()) ||
                value.companyTotalIncome.toLowerCase().includes(searchInput.toLowerCase()) ||
                value.lastMonthIncome.toLowerCase().includes(searchInput.toLowerCase())
            );
        });
        this.setState({ filteredData });
    };


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
        // let incomesArr = [];

        // let companyIncome = null;
        // let averageIncome = null;
        // let lastMonthIncome = null;
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
        return (
            <div className="table-wrapper">
                <Heading handleChange={this.handleChange} />
                <Table data={this.state.filteredData ? this.state.filteredData : this.state.data} />
                {/* <Fotter /> */}
            </div>
        );
    }
}

export default TableWrapper;