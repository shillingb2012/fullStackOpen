import React from 'react'

const FilterInput = (props) => 
  <div>
    filter shown with 
    <input 
      value = {props.filterInputValue}
      onChange = {props.filterOnChange}
    />
  </div>

export default FilterInput