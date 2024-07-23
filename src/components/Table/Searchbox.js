import React from "react";

const SearchBox = ({ search, setSearch }) => {

    return(
        <div style={{marginBottom: '2px'}}>
            <input 
                name="searchBox" 
                placeholder="Search" 
                value={search || undefined} 
                onChange={ e => setSearch(e.target.value)} 
            />
        </div>
    );
};

export default SearchBox;