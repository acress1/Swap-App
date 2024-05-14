import Table from "./Table";
import Loader from "./Loader";
import '../styles/ViewBoxes.scss';

export default function ViewBox ({ swapData, selectedDay, daySwapData }) {

    return (
        <>
        { selectedDay !== null ?
            <div className="viewbox daybox">
                { !daySwapData ? <Loader /> : <Table swapData={daySwapData} /> }
            </div> 
            :
            <div className="viewBox">
                { !swapData ? <Loader /> : <Table swapData={swapData} /> }
            </div>
        }
        </>
    );
};