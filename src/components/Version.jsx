import React from "react";
import { format } from 'date-fns';

export default function Version({ todayDate }){
    return(
        <>
            <div> © 2023 - {format(todayDate, 'yyyy')} </div>
            <div style={{fontSize: '8px'}}> V1.03.2024 </div>
        </>
    )
}