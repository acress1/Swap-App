import React, { useEffect, useState } from "react";
import { format } from 'date-fns';
import './DayBox.css';

export default function DayBox ({ BASEURL, tableInputs, selectedDay }) {
    
    const formatedSelectedDay = format(selectedDay, 'dd/MM/yyyy');
    
    const [formData, setFormData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('');

    useEffect(() => {
        setLoading(true);
    
        fetch(`${BASEURL}/dbData`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch DayBox Data');
            }
            return response.json();
        })
        .then(data => {
            const sortedData = data.data
            .filter(item => item.Date === formatedSelectedDay)
            .sort((a, b) => new Date(b.Sent) - new Date(a.Sent))
             // eslint-disable-next-line
            .map(item => item.Outbound == item.Inbound ? {...item, Outbound: "See Note", Inbound: " "} : item);

            setFormData({ ...data, data: sortedData });
        })
        .catch(error => console.log(error))
        .finally(() => setLoading(false))
    }, [BASEURL, formatedSelectedDay]);

    return (
        <div className="viewBox">
            {loading ? (
                <div className="loading-spinner"></div>
            ) : (
                <>
                    <div>
                        <input id="searchBox" placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
                    </div>
                    <div className="overflow">
                        <table>
                            <thead>
                                <tr>
                                    <th><span className="day-reminder">{formatedSelectedDay}</span></th>
                                    <th>{tableInputs[1]}</th>
                                    <th>{tableInputs[2]}</th>
                                    <th>{tableInputs[3]}</th>
                                    <th>{tableInputs[4]}</th>
                                    <th className="FOR start">FOR:</th>
                                    <th className="FOR">{tableInputs[5]}</th>
                                    <th className="FOR">{tableInputs[6]}</th>
                                    <th className="FOR">{tableInputs[7]}</th>
                                    <th className="FOR">{tableInputs[8]}</th>
                                    <th className="FOR end">{tableInputs[9]}</th>
                                    <th>{tableInputs[10]}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {formData && formData.data && formData.data.length > 0 ? (
                                    formData.data
                                        .filter(dataItem => ( 
                                            tableInputs.some(column => 
                                                dataItem[column].toString().toLowerCase().includes(search.toLowerCase())
                                                )))
                                        .map((dataItem, index) => (
                                            <tr key={index}>
                                                <td></td>
                                                <td className="Outbound">{dataItem.Outbound}</td>
                                                <td className="Inbound">{dataItem.Inbound}</td>
                                                <td className="Position">{dataItem.Position}</td>
                                                <td><a className="Email" href={`mailto:${dataItem.Email}`} target="_blank" rel="noreferrer">{dataItem.Email}</a></td>
                                                <td className="FOR"></td>
                                                <td className="FOR"><input id="EarlyDisplayed" className="nohover" type="checkbox" defaultChecked={dataItem.Early} /></td>
                                                <td className="FOR"><input id="LateDisplayed" className="nohover" type="checkbox" defaultChecked={dataItem.Late} /></td>
                                                <td className="FOR"><input id="LTADisplayed" className="nohover" type="checkbox" defaultChecked={dataItem.LTA} /></td>
                                                <td className="FOR"><input id="DODisplayed" className="nohover" type="checkbox" defaultChecked={dataItem.DO} /></td>
                                                <td className="FOR ">{dataItem.Note}</td>
                                                <td className="Sent ">{dataItem.Sent}</td>
                                            </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="12">No shift yet. Add yours 🤓</td>
                                            </tr>
                                        )}
                            </tbody>
                        </table>
                    </div>
                </>
            )}
        </div>
    );
};