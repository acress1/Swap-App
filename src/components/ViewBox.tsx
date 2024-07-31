import { swapDataItems } from "types";
import Table from "./Table/Table";
import 'styles/ViewBoxes.scss';

const ViewBox = ({ swapData, selectedDay, daySwapData }: {
    swapData: swapDataItems[],
    selectedDay: Date,
    daySwapData: swapDataItems[]
}) => {

    return (
        <>
            {selectedDay !== null ?
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

export default ViewBox;