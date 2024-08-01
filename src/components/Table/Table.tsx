import { useState } from "react";
import { swapDataItem } from "types";
import TableHead from "./TableHead";
import TableBody from "./TableBody";
import SearchBox from "./SearchBox";
import 'styles/ViewBoxes.scss';

const Table = ({ swapData }: { swapData: swapDataItem[] }) => {

    const [search, setSearch] = useState('');

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