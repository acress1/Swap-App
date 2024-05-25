import React from "react";
import TableHead from "./TableHead";
import TableBody from "./TableBody";
import SearchBox from "./Searchbox";
import '../../styles/ViewBoxes.scss';

export default function Table ({ swapData }) {
    
    return (
            <>
                <SearchBox />
                <div className="overflow">
                <table>
                    <TableHead />
                    <TableBody 
                        swapData={swapData}
                    />
                </table>
                </div>
            </>
    );
};