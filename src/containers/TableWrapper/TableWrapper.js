import React, { Component } from 'react';
import Heading from '../../components/Heading/Heading';
import Table from '../Table/Table';
import Footer from '../../components/Footer/Footer';

import { COMPANIES_API, INCOMES_API } from '../../common/Urls';

import './TableWrapper.scss';

class TableWrapper extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: null,
            filteredData: null,
            columns: [],
            searchInput: "",
            direction: {
                id: 'asc',
                name: 'asc',
                companyTotalIncome: 'asc',
                averageIncome: 'asc',
                lastMonthIncome: 'asc'
            },
            currentPage: 1,
            rowsPerPage: 6
        }
        this.compareBy = this.compareBy.bind(this);
        this.sortBy = this.sortBy.bind(this);
        this.handlePagination = this.handlePagination.bind(this);
    }


    componentDidMount() {
        this.getCompaniesData();
    }

    handlePagination(event) {
        this.setState({
            currentPage: Number(event.target.id)
        });
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
        this.setState({ data: filteredData });
    };


    compareBy(key) {
        if (this.state.direction[key] === 'asc') {
            return function (a, b) {
                if (a[key] < b[key]) return -1;
                if (a[key] > b[key]) return 1;
                return 0;
            };
        } else {
            return function (a, b) {
                if (b[key] < a[key]) return -1;
                if (b[key] > a[key]) return 1;
                return 0;
            };
        }

    }

    sortBy(key) {
        let dataCopy;
        // let isFiltered = false;
        this.state.filteredData ? dataCopy = [...this.state.filteredData] : dataCopy = [...this.state.data]
        if (key === 'id' || key === 'companyTotalIncome' || key === 'averageIncome' || key === 'lastMonthIncome') {
            dataCopy.sort((a, b) => (
                this.state.direction[key] === 'asc'
                    ? parseFloat(a[key]) - parseFloat(b[key])
                    : parseFloat(b[key]) - parseFloat(a[key])
            ))
            this.setState({
                data: dataCopy,
                direction: {
                    [key]: this.state.direction[key] === 'asc' ? 'desc' : 'asc'
                }
            })
        } else {
            dataCopy.sort(this.compareBy(key));
            this.setState({
                data: dataCopy,
                direction: {
                    [key]: this.state.direction[key] === 'asc' ? 'desc' : 'asc'
                }
            })
        }
        // dataCopy.sort(this.compareBy(key));
        // this.setState({ data: dataCopy });
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
                <Table
                    data={this.state.data}
                    sortBy={this.sortBy} />
                <Footer />
            </div>
        );
    }
}

export default TableWrapper;