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
                        <th>Name</th>
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
                        <td>{dataItem.Outbound}</td>
                        <td>{dataItem.Inbound}</td>
                        <td><input type="checkbox" checked={dataItem.FIRST} disabled /></td>
                        <td><input type="checkbox" checked={dataItem.BAR} disabled /></td>
                        <td>{dataItem.Name}</td>
                        <td>{dataItem.Email}</td>
                        <td></td>
                        <td><input type="checkbox" checked={dataItem.Early} disabled /></td>
                        <td><input type="checkbox" checked={dataItem.Late} disabled /></td>
                        <td><input type="checkbox" checked={dataItem.LTA} disabled /></td>
                        <td><input type="checkbox" checked={dataItem.DO} disabled /></td>
                        <td>{dataItem.Note}</td>
                        <td>{dataItem.Sent}</td>
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