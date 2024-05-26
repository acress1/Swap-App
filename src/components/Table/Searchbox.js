import React from "react";

export default function SearchBox({ search, setSearch }) {

    return(
        <div style={{marginBottom: '2px'}}>
            <input 
                name="searchBox" 
                placeholder="Search" 
                value={search} 
                onChange={ e => setSearch(e.target.value)} 
            />
        </div>
    );
};