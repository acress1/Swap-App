import React, { useEffect, useState } from "react";
import { format } from 'date-fns';
import './DayBox.css';

const DayBox = ({ selectedDay }) => {
    const date = format(selectedDay, 'yyyy-MM-dd');
    const [formData, setFormData] = useState(null);

    useEffect(() => {
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
            setFormData(data);
        })
        .catch(error => console.log(error));
    }, [date]);

    return (
        <div className="dayBox">
        {formData && formData.data && formData.data.length > 0 ? (
            <table>
                <thead>
                    <tr>
                        <th>Outbound</th>
                        <th>Inbound</th>
                        <th>FIRST</th>
                        <th>BAR</th>
                        <th>PURSER</th>
                        {/* <th>Name</th> */}
                        <th>Email</th>
                        <th>LOOKING FOR:</th>
                        <th>Early</th>
                        <th>Late</th>
                        <th>LTA</th>
                        <th>D.O.</th>
                        <th>Note</th>
                        <th>Sent</th>
                    </tr>
                </thead>
                <tbody>
                    {formData.data.map((dataItem, index) => (
                    <tr key={index}>
                        <td className="Outbound">{dataItem.Outbound}</td>
                        <td className="Inbound">{dataItem.Inbound}</td>
                        <td><input className="nohover" type="checkbox" defaultChecked={dataItem.FIRST} /></td>
                        <td><input className="nohover" type="checkbox" defaultChecked={dataItem.BAR} /></td>
                        <td><input className="nohover" type="checkbox" defaultChecked={dataItem.PURSER} /></td>
                        {/* <td>{dataItem.Name}</td> */}
                        <td><a href= {`mailto:${dataItem.Email}`} target="_blank" rel="noreferrer">{dataItem.Email}</a></td>
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
        ) : (
            <p>No shift on offer yet. Add yours 🤓</p>
        )}
        </div>
    );
};

export default DayBox;