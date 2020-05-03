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
            dataForFilter: null,
            columns: [],
            searchInput: "",
            sortDirection: {
                id: 'asc',
                name: 'asc',
                companyTotalIncome: 'asc',
                averageIncome: 'asc',
                lastMonthIncome: 'asc',
                city: 'asc'
            },
            currentPage: 1,
            rowsPerPage: 20
        }
        this.compareBy = this.compareBy.bind(this);
        this.sortBy = this.sortBy.bind(this);
    }


    componentDidMount() {
        this.getCompaniesData();
    }

    handleSelectRowsPerPage = (e) => {
        this.setState({
            currentPage: 1,
            rowsPerPage: e.target.value
        })
    }

    handlePaginationPageIncrease = (lastPage) => {
        const currentPage = this.state.currentPage;
        if (currentPage < lastPage) {
            this.setState({
                currentPage: currentPage + 1
            });
        }
    }

    handlePaginationPageDecrease = () => {
        const currentPage = this.state.currentPage;
        if (currentPage > 1) {
            this.setState({
                currentPage: currentPage - 1
            });
        }
    }

    handleSearchChange = event => {
        this.setState({ searchInput: event.target.value }, () => {
            this.globalSearch();
        });
    };

    globalSearch = () => {
        let { searchInput, dataForFilter } = this.state;
        let filteredData = dataForFilter.filter(value => {
            return (
                value.name.toLowerCase().includes(searchInput.toLowerCase()) ||
                value.city.toLowerCase().includes(searchInput.toLowerCase()) ||
                value.id.toString().toLowerCase().includes(searchInput.toLowerCase()) ||
                value.averageIncome.toLowerCase().includes(searchInput.toLowerCase()) ||
                value.companyTotalIncome.toLowerCase().includes(searchInput.toLowerCase()) ||
                value.lastMonthIncome.toLowerCase().includes(searchInput.toLowerCase())
            );
        });
        this.setState({
            currentPage: 1,
            data: filteredData,
            sortDirection: {
                id: 'asc',
                name: 'asc',
                companyTotalIncome: 'asc',
                averageIncome: 'asc',
                lastMonthIncome: 'asc',
                city: 'asc'
            }
        });
    };


    compareBy(key) {
        if (this.state.sortDirection[key] === 'asc') {
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
        const setAllToAsc = {
            id: 'asc',
            name: 'asc',
            companyTotalIncome: 'asc',
            averageIncome: 'asc',
            lastMonthIncome: 'asc',
            city: 'asc'
        }
        this.state.filteredData ? dataCopy = [...this.state.filteredData] : dataCopy = [...this.state.data]
        if (key === 'id' || key === 'companyTotalIncome' || key === 'averageIncome' || key === 'lastMonthIncome') {
            dataCopy.sort((a, b) => (
                this.state.sortDirection[key] === 'asc'
                    ? parseFloat(a[key]) - parseFloat(b[key])
                    : parseFloat(b[key]) - parseFloat(a[key])
            ))
            this.setState({
                data: dataCopy,
                sortDirection: {
                    ...setAllToAsc,
                    [key]: this.state.sortDirection[key] === 'asc' ? 'desc' : 'asc'
                }
            })
        } else {
            dataCopy.sort(this.compareBy(key));
            this.setState({
                data: dataCopy,
                sortDirection: {
                    ...setAllToAsc,
                    [key]: this.state.sortDirection[key] === 'asc' ? 'desc' : 'asc'
                }
            })
        }
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
                this.setState({ data: mergedData, dataForFilter: mergedData })
            });
    }

    render() {

        const { data, currentPage, rowsPerPage, sortDirection } = this.state;

        const indexOfLastRow = currentPage * rowsPerPage;
        const indexOfFirstRow = indexOfLastRow - rowsPerPage;
        const currentRows = data ? data.slice(indexOfFirstRow, indexOfLastRow) : null;

        return (
            <div className="table-wrapper">
                <Heading
                    handleChange={this.handleSearchChange}
                    data={currentRows} />
                <Table
                    data={currentRows}
                    sortBy={this.sortBy}
                    sortSymbol={sortDirection} />
                <Footer
                    dataLength={data ? data.length : null}
                    rowsPerPage={rowsPerPage}
                    currentPage={currentPage}
                    handleSelectRowsPerPage={this.handleSelectRowsPerPage}
                    handlePaginationPageIncrease={this.handlePaginationPageIncrease}
                    handlePaginationPageDecrease={this.handlePaginationPageDecrease} />
            </div>
        );
    }
}

export default TableWrapper;