import React from 'react'

const Filter = (props) => 
    <div>
        find countries
        <input 
            value={props.filterInputValue} 
            onChange={props.filterOnChange}
        />
    </div>

export default Filter