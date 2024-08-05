import { swapDataItem } from "types";
import Table from "./Table/Table";
import 'styles/ViewBoxes.scss';

const ViewBox = ({ swapData, selectedDay, daySwapData }: {
    swapData: swapDataItem[],
    selectedDay: Date | null,
    daySwapData: swapDataItem[]
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