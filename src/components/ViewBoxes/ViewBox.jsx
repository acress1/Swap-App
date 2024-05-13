import Table from "./Table";
import Loader from "../Loader";
import './ViewBoxes.scss';

export default function ViewBox ({ swapData, selectedDay, daySwapData, showNewsBox }) {

    return (
        <>
        { selectedDay !== null ?
            <div className="viewbox daybox">
                { !daySwapData ? <Loader /> : <Table swapData={daySwapData} /> }
            </div> 
            : showNewsBox ?
            <div className="viewBox newsBox"> 
                <div className="newsDate">1.03.2024:</div>
                    <ul>
                        <li>Note field for each unique shift.</li>
                        <li>Video Tutorial link available below.</li>
                        <li>Minor Interface changes.</li>
                    </ul>
                <div>Happy Swapping! 🎉</div> 
            </div> :
            <div className="viewBox">
                { !swapData ? <Loader /> : <Table swapData={swapData} /> }
            </div>
        }
        </>
    );
};