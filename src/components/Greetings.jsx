import { useState } from "react";
import { format } from 'date-fns';
import NewsBox from "../components/ViewBoxes/NewsBox";

export default function Greetings ({ todayDate }) {

    const [showNewsBox, setShowNewsBox] = useState (false);

    const toggleNewsBox = () => {
        setShowNewsBox(!showNewsBox);
    }
    
    return(
        <>
            <div className="greetings">
                <text>Hi there! Today is {format(todayDate, 'MMMM do, y O')}</text> 
                <img src="/favicon/favicon-16x16.png" alt="🤓" />
                <br />
                <button className="newsButton" onClick={toggleNewsBox}> Last update </button>
            </div>
            { showNewsBox && <NewsBox toggleNewsBox={toggleNewsBox} /> }
        </>
    )
}