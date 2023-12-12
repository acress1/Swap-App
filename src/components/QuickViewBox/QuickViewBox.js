import React, { useEffect, useState } from "react";
import { format } from 'date-fns';
import './QuickViewBox.css';

const QuickViewBox = () => {
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('');
    const [formData, setFormData] = useState(null);

    useEffect(() => {
        setLoading(true);

        fetch('http://localhost:3001/allFormData', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch all form data');
            }
            return response.json();
        })
        .then(data => {
            console.log('All Form Data:', data);
            setFormData(data);
        })
        .catch(error => console.log(error))
        .finally(() => setLoading(false));
    }, []);

    return (
        <div className="quickViewBox">
            {loading ? (
                <div className="loading-spinner"></div>
            ) : (
                <>
                    <div>
                        <input className="searchBox" placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
                    </div>
                    <div className="table">
                        <table>
                            <thead>
                                <tr>
                                    <th>Date</th>
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
                                        .filter(dataItem => (
                                            dataItem.Inbound.toString().includes(search) ||
                                            dataItem.Outbound.toString().includes(search) ||
                                            dataItem.Position.toString().includes(search) ||
                                            dataItem.Email.toString().includes(search) ||
                                            dataItem.Sent.toString().includes(search)
                                        ))
                                        .map((dataItem, index) => (
                                            <tr key={index}>
                                                <td className="Date">{dataItem.Date}</td>
                                                <td className="Outbound">{dataItem.Outbound}</td>
                                                <td className="Inbound">{dataItem.Inbound}</td>
                                                <td className="Position">{dataItem.Position}</td>
                                                <td><a href={`mailto:${dataItem.Email}`} target="_blank" rel="noreferrer">{dataItem.Email}</a></td>
                                                <td className="FOR"></td>
                                                <td className="FOR"><input className="nohover" type="checkbox" defaultChecked={dataItem.Early} /></td>
                                                <td className="FOR"><input className="nohover" type="checkbox" defaultChecked={dataItem.Late} /></td>
                                                <td className="FOR"><input className="nohover" type="checkbox" defaultChecked={dataItem.LTA} /></td>
                                                <td className="FOR"><input className="nohover" type="checkbox" defaultChecked={dataItem.DO} /></td>
                                                <td className="NOTE">{dataItem.Note}</td>
                                                <td className="Sent">{format(new Date(dataItem.Sent), 'MM/dd HH:mm:ss')}</td>
                                            </tr>
                                        ))
                                ) : (
                                    <tr>
                                        <td colSpan="11">No shift on offer yet. Add yours 🤓</td>
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

export default QuickViewBox;