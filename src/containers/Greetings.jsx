import React from "react";
import { format } from 'date-fns';

export default function Greetings ({ todayDate, toggleNewsBox}) {
    
    return(
        <>
            <div className="greetings">
                Hi there! Today is {format(todayDate, 'MMMM do, y O')} 
                <img src="/favicon/favicon-16x16.png" alt="🤓" />
                <br />
                <button className="newsButton" onClick={toggleNewsBox}> Last update </button>
            </div>
        </>
    )
}