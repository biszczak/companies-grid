import React from 'react';

import './TableBodyRow.scss';

const staticData = [
    {
        "id": 82,
        "name": "Boehm - Crist",
        "city": "Weimannhaven"
    },
    {
        "id": 39,
        "name": "Robel, Nicolas and McKenzie",
        "city": "Port Heidifurt"
    },
    {
        "id": 206,
        "name": "Cormier and Sons",
        "city": "Port Earlene"
    },
    {
        "id": 175,
        "name": "Anderson, Champlin and Bartell",
        "city": "Jaydefurt"
    },
    {
        "id": 273,
        "name": "Schmeler, Zulauf and Ruecker",
        "city": "East Melisa"
    },
    {
        "id": 2,
        "name": "Franecki, Torphy and Lesch",
        "city": "Port Halle"
    },
    {
        "id": 93,
        "name": "Grady - Carter",
        "city": "Wolfview"
    },
    {
        "id": 21,
        "name": "Price Inc",
        "city": "Port Khalilbury"
    },
    {
        "id": 138,
        "name": "Wilderman Group",
        "city": "West Einoview"
    },
    {
        "id": 110,
        "name": "Bahringer - Dickinson",
        "city": "New Eduardotown"
    },
    {
        "id": 38,
        "name": "Bechtelar - Nikolaus",
        "city": "Dorachester"
    },
    {
        "id": 74,
        "name": "Lynch - Hamill",
        "city": "East Hesterville"
    },
]

const TableBodyRow = () => {
    // const companies = staticData.map(company => {

    // })
    return (
        staticData.map(company => (
            <tr className="table-row">
                <td>{company.id}</td>
                <td>{company.name}</td>
                <td>{company.city}</td>
                <td>3242332$</td>
                <td>0$</td>
                <td>1233$</td>
            </tr>
        )

        )
    )

};

export default TableBodyRow;