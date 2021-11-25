import React from "react";

const Filter = ({ onInputChange, filter }) => {
    return (
        <div>
            filter shown with:
            <input onChange={onInputChange} value={filter} />
        </div>
    );
};

export default Filter;