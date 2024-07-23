import React, {useState} from "react";
import TableHead from "./TableHead";
import TableBody from "./TableBody";
import SearchBox from "./SearchBox";
import 'styles/ViewBoxes.scss';

const Table = ({ swapData }) => {

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

export default Table;