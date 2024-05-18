import React, { useState } from "react";
import { Categories } from "../constant";
import '../styles/ViewBoxes.scss';

export default function Table ({ swapData }) {

    const selectedCategories1 = Categories.slice(0, 3);
    const selectedCategories2 = Categories.slice(7, 12);

    const searchField = ['Date','Outbound','Inbound','Position','Email','Note','Sent'];
    const [search, setSearch] = useState('');
    
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
                            { swapData && swapData.length > 0 ? (
                                swapData
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