import Table from "./Table/Table";
import '..//styles/ViewBoxes.scss';

export default function ViewBox ({ swapData, selectedDay, daySwapData }) {

    return (
        <>
        { selectedDay !== null ?
            <div className="viewbox daybox">
                <Table swapData={daySwapData} />
            </div> 
            :
            <div className="viewBox">
                <Table swapData={swapData} />
            </div>
        }
        </>
    );
};