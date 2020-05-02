import React from 'react';
import { RiSearchLine } from 'react-icons/ri'

import './SearchInput.scss';

const SearchInput = (props) => {
    return (
        <div className="search-wrapper">
            <input
                type="text"
                placeholder="Search..."
                onChange={props.handleChange} />
            <RiSearchLine className="search-icon" />
        </div>
    );
}

export default SearchInput;