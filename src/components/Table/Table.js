import React, {useState} from "react";
import TableHead from "./TableHead";
import TableBody from "./TableBody";
import SearchBox from "./Searchbox";
import '../../styles/ViewBoxes.scss';

export default function Table ({ swapData }) {

    const [search, setSearch] = useState();
    
    return (
            <>
                <SearchBox
                    search={search}
                    setSearch={setSearch}
                />
                <div className="overflow">
                <table>
                    <TableHead />
                    <TableBody 
                        swapData={swapData}
                        search={search}
                    />
                </table>
                </div>
            </>
    );
};