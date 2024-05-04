import React, { useState } from "react";
import './ViewBoxes.scss';
import { categories } from "../../containers/categories";

export default function Table ({ searchField, formData }) {

    const [search, setSearch] = useState('');
    const selectedCategories1 = categories.filter(category => ['Date', 'Outbound', 'Inbound'].includes(category.name));
    const selectedCategories2 = categories.filter(category => ['Early', 'Late', 'LTA', 'DO'].includes(category.name));

    return (
            <>
                <div style={{marginBottom: '2px'}}>
                    <input name="searchBox" placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
                </div>
                <div className="overflow">
                    <table>
                        <thead>
                            <tr>
                                {selectedCategories1.map(({name}) => (<th key={name}> {name} </th>))}
                                <th>Position</th>
                                <th>Email</th>
                                <th className= 'FOR'>FOR:</th>
                                {selectedCategories2.map(({name}) => (<th key={name} className= 'FOR'> {name} </th>))}
                                <th className= 'FOR'>Note</th>
                                <th>Sent</th>
                            </tr>
                        </thead>
                        <tbody>
                            {formData && formData.data && formData.data.length > 0 ? (
                                formData.data
                                    .filter(dataItem => ( 
                                        searchField.some(column => 
                                            dataItem[column].toString().toLowerCase().includes(search.toLowerCase())
                                            )))
                                    .map((dataItem, index) => (
                                        <tr key={index}>
                                            {selectedCategories1.map(({name}) => (
                                                <td className= {
                                                        name === 'Date' ? 'Date' :
                                                        name === 'Outbound' ? 'Outbound' :
                                                        name === 'Inbound' ? 'Inbound' : null
                                                }>
                                                    { 
                                                        name === 'Date' ? dataItem.Date :
                                                        name === 'Outbound' ? dataItem.Outbound :
                                                        name === 'Inbound' ? dataItem.Inbound : null
                                                    }
                                                </td>
                                            ))}
                                            <td>{dataItem.Position}</td>
                                            <td><a className="Email" href={`mailto:${dataItem.Email}`} target="_blank" rel="noreferrer">{dataItem.Email}</a></td>
                                            <td className="FOR"></td>
                                            {selectedCategories2.map(({name}) => (
                                                <td className="FOR">
                                                    <input className="nohover" type="checkbox" defaultChecked= {
                                                        name === 'Early' ? dataItem.Early :
                                                        name === 'Late' ? dataItem.Late :
                                                        name === 'LTA' ? dataItem.LTA :
                                                        name === 'DO' ? dataItem.DO : null
                                                    }>
                                                    </input>
                                                </td>
                                            ))}
                                            <td className="FOR">{dataItem.Note}</td>
                                            <td className="Sent">{dataItem.Sent}</td>
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
    );
}