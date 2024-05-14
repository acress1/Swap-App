import { useState } from 'react';
import { format } from 'date-fns';
import NewsBox from './NewsBox';

export default function Greetings ({ todayDate }) {

    const [showNewsBox, setShowNewsBox] = useState (false);
    const formatedTodayDate = format(todayDate, 'MMMM do, y O');

    const toggleNewsBox = () => {
        setShowNewsBox(!showNewsBox);
    };
    
    return(
        <div className="greetings">
            <span>Hi there! Today is {formatedTodayDate}</span> 
            <img src="/favicon/favicon-16x16.png" alt="🤓" />
            <br />
            <button className="newsButton" onClick={toggleNewsBox}> Last update </button>
            { showNewsBox && <NewsBox /> }
        </div>
    )
}