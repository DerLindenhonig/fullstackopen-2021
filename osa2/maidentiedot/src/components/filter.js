import React from 'react'

const Filter = ({filter, handleFilterChange}) => {
    return (
        <div>
            find countries<input value={filter} onChange={handleFilterChange}></input>
        </div>
    )
}

export default Filter