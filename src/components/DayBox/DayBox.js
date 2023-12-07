import React, { useEffect, useState } from "react";
import { format } from 'date-fns';
import './DayBox.css';

const DayBox = ({ selectedDay }) => {
    
    const date = format(selectedDay, 'yyyy-MM-dd');
    const [formData, setFormData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('');

    useEffect(() => {
        setLoading(true);

        fetch(`http://localhost:3001/formData/${date}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
        })
        .then(response => {
            if (!response.ok) {
            throw new Error('Failed to fetch form data');
            }
            return response.json();
        })
        .then(data => {
            const sortedData = data.data.sort((a, b) => new Date(b.Sent) - new Date(a.Sent));
            setFormData({ ...data, data: sortedData });
        })
        .catch(error => console.log(error))
        .finally(() => setLoading(false));
    }, [date]);

    return (
        <div className="dayBox">
        {loading ? (
            <div className="loading-spinner"></div>
        ) : formData && formData.data && formData.data.length > 0 ? (
            <>
            <div className="day-reminder">{format(selectedDay, 'dd/MM/yyyy')}</div>
            <table>
                <thead>
                    <tr>
                        <th><input className="searchBox" type="number" placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} /></th>
                        <th></th>
                        <th>Position</th>
                        <th>Email</th>
                        <th className="LOOKING-FOR">LOOKING FOR:</th>
                        <th>Early</th>
                        <th>Late</th>
                        <th>LTA</th>
                        <th>D.O.</th>
                        <th>Note</th>
                        <th>Sent</th>
                    </tr>
                </thead>
                <tbody>
                    {formData.data
                    .filter(dataItem => (
                        dataItem.Inbound.toString().includes(search) ||
                        dataItem.Outbound.toString().includes(search)  
                    ))
                    .map((dataItem, index) => (
                    <tr key={index}>
                        <td className="Outbound">{dataItem.Outbound}</td>
                        <td className="Inbound">{dataItem.Inbound}</td>
                        <td className="Position">{dataItem.Position}</td>
                        <td><a href= {`mailto:${dataItem.Email}`} target="_blank" rel="noreferrer" title="Click here to message this person directly 🤓">{dataItem.Email}</a></td>
                        <td></td>
                        <td><input className="nohover" type="checkbox" defaultChecked={dataItem.Early} /></td>
                        <td><input className="nohover" type="checkbox" defaultChecked={dataItem.Late} /></td>
                        <td><input className="nohover" type="checkbox" defaultChecked={dataItem.LTA} /></td>
                        <td><input className="nohover" type="checkbox" defaultChecked={dataItem.DO} /></td>
                        <td>{dataItem.Note}</td>
                        <td className="Sent">{dataItem.Sent}</td>
                    </tr>
                    ))}
                </tbody>
            </table>
            </>
        ) : (
            <p>No shift on offer yet. Add yours 🤓</p>
        )}
        </div>
    );
};

export default DayBox;