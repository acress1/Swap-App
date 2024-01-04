import React, { useEffect, useState } from "react";
import { format } from 'date-fns';
import './DayBox.css';

const DayBox = ({ BASEURL, selectedDay, propertyToFilter }) => {
    
    const date = format(selectedDay, 'dd/MM/yyyy');
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
            .filter(item => item.Date === date)
            .sort((a, b) => new Date(b.Sent) - new Date(a.Sent))
             // eslint-disable-next-line
            .map(item => item.Outbound == item.Inbound ? {...item, Outbound: "See Note", Inbound: " "} : item);

            setFormData({ ...data, data: sortedData });
        })
        .catch(error => console.log(error))
        .finally(() => setLoading(false))
    }, [BASEURL, date]);

    return (
        <div className="dayBox">
            {loading ? (
                <div className="loading-spinner"></div>
            ) : (
                <>
                    <div>
                        <input id="searchBox" placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
                    </div>
                    <div className="table">
                        <table>
                            <thead>
                                <tr>
                                    <th><span className="day-reminder">{format(selectedDay, 'dd/MM/yyyy')}</span></th>
                                    <th>Outbound</th>
                                    <th>Inbound</th>
                                    <th>Position</th>
                                    <th>Email</th>
                                    <th className="FOR start">FOR:</th>
                                    <th className="FOR">Early</th>
                                    <th className="FOR">Late</th>
                                    <th className="FOR">LTA</th>
                                    <th className="FOR end">D.O.</th>
                                    <th className="NOTE start end">Note</th>
                                    <th>Sent</th>
                                </tr>
                            </thead>
                            <tbody>
                                {formData && formData.data && formData.data.length > 0 ? (
                                    formData.data
                                        .filter(dataItem => ( propertyToFilter.some(column => dataItem[column].toString().toLowerCase().includes(search))))
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
                                                <td className="NOTE ">{dataItem.Note}</td>
                                                <td className="Sent ">{dataItem.Sent}</td>
                                            </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="11">No shift yet. Add yours 🤓</td>
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

export default DayBox;