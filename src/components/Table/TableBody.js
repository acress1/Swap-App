import React from "react";

export default function TableBody ({ swapData, search }) {

    const matchesSearch = (dataItem) => {

        const searchField = ["Date", "Outbound", "Inbound", "Position", "Email", "Sent"];
    
        if(!search){ 
            return true
        };
    
        return searchField.some(field => 
            dataItem[field] && dataItem[field].toString().toLowerCase().includes(search.toLowerCase())
        );
    };

    const filteredSwapData = swapData.filter(dataItem => matchesSearch(dataItem));

    return(
        <>
            <tbody>
                { filteredSwapData && filteredSwapData.length > 0 ? (
                    filteredSwapData
                    .map(dataItem => (

                        <tr key={dataItem.Swap_id}>
                            <td className="Date">{dataItem.Date}</td>
                            <td className="Outbound">{dataItem.Outbound}</td>
                            <td className="Inbound">{dataItem.Inbound}</td>
                            <td className="Position">{dataItem.Position}</td>
                            <td>
                                <a 
                                    className="Email" 
                                    href={`mailto:${dataItem.Email}`} 
                                    target="_blank" 
                                    rel="noreferrer">
                                    {dataItem.Email}
                                </a>
                            </td>
                            <td className="FOR"></td>
                            <td className="FOR">
                                <input 
                                    className="nohover" 
                                    type="checkbox" 
                                    defaultChecked= {dataItem.Early} 
                                    >
                                </input>
                            </td>
                            <td className="FOR">
                                <input 
                                    className="nohover" 
                                    type="checkbox" 
                                    defaultChecked= {dataItem.Late} 
                                    >
                                </input>
                            </td>
                            <td className="FOR">
                                <input 
                                    className="nohover" 
                                    type="checkbox" 
                                    defaultChecked= {dataItem.LTA} 
                                    >
                                </input>
                            </td>
                            <td className="FOR">
                                <input 
                                    className="nohover" 
                                    type="checkbox" 
                                    defaultChecked= {dataItem.DO} 
                                    >
                                </input>
                            </td>
                            <td className="FOR">{dataItem.Note}</td>
                            <td className="Sent">{dataItem.Sent}</td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="12">
                            No shift yet. Add yours 🤓
                        </td>
                    </tr>
                )}
            </tbody>
        </>
    );
};