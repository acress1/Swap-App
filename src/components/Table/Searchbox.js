import React, {useState} from "react";

export default function SearchBox() {

    const [search, setSearch] = useState();

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