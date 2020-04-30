import React from 'react';
import SearchInput from '../UI/SearchInput/SearchInput';

import './Heading.scss'


const Heading = () => {
    return (
        <div className="heading">
            <h1 className="title">Companies</h1>
            <SearchInput />
        </div>
    );
}

export default Heading;