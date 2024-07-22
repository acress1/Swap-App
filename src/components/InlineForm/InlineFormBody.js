import React from "react";

export default function InlineFormBody({changeHandlers}) {

    const {shifts, handleChange, addShift, deleteShift, ovSwitch} = changeHandlers;

    return(
        <>
            {shifts.map((shift, index) => {

                const hideInputs = shift.Position === "AV" || shift.Position === "Platform";

                return(
                    <tbody key={index}>
                        <tr>
                            <td>
                                <button 
                                    className="add-line" 
                                    type="button" 
                                    onClick= {addShift} />
                                <button 
                                    className="delete-line" 
                                    type="button" 
                                    onClick= {() => deleteShift(index)} 
                                />
                            </td>
                            <td> 
                                <input
                                    name={`Position-${index}`} 
                                    type="radio" 
                                    value="AV" 
                                    onChange={e => handleChange(index, 'Position', 'AV')}
                                >
                                </input>
                            </td>
                            <td> 
                                <input
                                    name={`Position-${index}`} 
                                    type="radio" 
                                    value="Platform" 
                                    onChange={e => handleChange(index, 'Position', 'Platform')}
                                >
                                </input>
                            </td>
                            <td>
                                <input
                                    type="date"
                                    value={shift.Date}
                                    onChange={e => handleChange(index, 'Date', e.target.value)}
                                    required
                                >
                                </input>
                            </td>
                            <td>
                                <input
                                    className={hideInputs ? "hidden": null}
                                    type="number"
                                    placeholder="9###"
                                    min="9000"
                                    max="9199"
                                    value={shift.Outbound}
                                    onChange={e => handleChange(index, 'Outbound', e.target.value)}
                                >
                                </input>
                            </td>
                            <td>
                                <input
                                    className={hideInputs ? "hidden": null}
                                    type="number"
                                    placeholder="9###"
                                    min="9000"
                                    max="9199"
                                    value={shift.Inbound}
                                    onChange={e => handleChange(index, 'Inbound', e.target.value)}
                                >
                                </input>
                            </td>
                            <td>
                                <input
                                    className={hideInputs ? "hidden": "switch"}
                                    type="checkbox"
                                    onChange={() => ovSwitch(index)}
                                >
                                </input>
                            </td>
                            <td>
                                <input
                                    name={`Position-${index}`}
                                    type="radio"
                                    value="FIRST"
                                    onChange={e => handleChange(index, 'Position', 'FIRST')}
                                >
                                </input>
                            </td>
                            <td>
                                <input
                                    name={`Position-${index}`}
                                    type="radio"
                                    value="BAR"
                                    onChange={e => handleChange(index, 'Position', 'BAR')}
                                >
                                </input>
                            </td>
                            <td>
                                <input
                                    name={`Position-${index}`}
                                    type="radio"
                                    value="PURSER"
                                    onChange={e => handleChange(index, 'Position', 'PURSER')}
                                >
                                </input>
                            </td>
                            <td className="FOR" ></td>
                            <td className="FOR" >
                                <input
                                    type="checkbox"
                                    checked={shift.Early}
                                    onChange={e => handleChange(index, "Early",e.target.checked)}
                                >
                                </input>
                            </td>
                            <td className="FOR" >
                                <input
                                    type="checkbox"
                                    checked={shift.Late}
                                    onChange={e => handleChange(index, "Late",e.target.checked)}
                                >
                                </input>
                            </td>
                            <td className="FOR" >
                                <input
                                    type="checkbox"
                                    checked={shift.LTA}
                                    onChange={e => handleChange(index, "LTA",e.target.checked)}
                                >
                                </input>
                            </td>
                            <td className="FOR" >
                                <input
                                    type="checkbox"
                                    checked={shift.DO}
                                    onChange={e => handleChange(index, "DO",e.target.checked)}
                                >
                                </input>
                            </td>
                            <td className="FOR" >
                                <input
                                    type="text"
                                    placeholder="Note"
                                    onChange={e => handleChange(index, "Note",e.target.value)}
                                >
                                </input>
                            </td>
                        </tr>
                    </tbody>
                )
            })}
        </>
    );
};