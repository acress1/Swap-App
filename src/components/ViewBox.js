import Table from "./Table/Table";
import 'styles/ViewBoxes.scss';

const ViewBox = ({ swapData, selectedDay, daySwapData }) => {

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

export default ViewBox;