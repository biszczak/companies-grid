import React from 'react';
import SearchInput from '../UI/SearchInput/SearchInput';

import './Heading.scss'


const Heading = (props) => {
    return (
        <div className="heading">
            <h1 className="title">Companies</h1>
            <SearchInput handleChange={props.handleChange} data={props.data} />
        </div>
    );
}

export default Heading;