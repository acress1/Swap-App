import React from "react";
import './InlineForm.css';

export default function InlineForm ({ categories, addShift, deleteShift, ovSwitch, handleChange, handleSubmit, shifts }) {
  
  return (
    <>
        <form onSubmit={handleSubmit}>
            
            <input id="Email" required autoComplete="on" type="email" name="Email" placeholder="Email" />
            <div className="overflow">
              <table>
                <thead>
                  <tr>
                  {categories.map(({id, name}) => (
                    <th key={id} className= {
                        id === 0 ? 'start'
                      : id === 7 ? 'end'
                      : id === 8 ? 'FOR start' 
                      : id === 13 ? 'FOR end' 
                      : id >= 8 ? 'FOR'
                      : ''
                    }
                    >
                      {name}
                    </th>
                  ))}
                  </tr>
                </thead>
                {shifts.map((shift, index) => (
                  <tbody className="shift" key={index}>
                    <tr>
                      <td>
                        <span>
                          <button className="add-line" type="button" onClick={addShift}></button>
                          <button className="delete-line" type="button" onClick={() => deleteShift(index)}></button>
                        </span>
                      </td>
                      <td><input id="Date" required type="date" name="Date" value={shift.Date} onChange={(e) => handleChange(index, 'Date', e.target.value)} /></td>
                      <td><input id="Outbound" required type="number" min="9000" max="9199" name="Outbound" placeholder="Outbound" value={shift.Outbound} onChange={(e) => handleChange(index, 'Outbound', e.target.value)} /></td>
                      <td><input id="Inbound" required type="number" min="9000" max="9199" name="Inbound" placeholder="Inbound" value={shift.Inbound} onChange={(e) => handleChange(index, 'Inbound', e.target.value)} /></td>
                      <td>
                        <label className="switch">
                          <input id="Overnight-switch" type="checkbox" onChange={() => ovSwitch(index)} checked={shift.isOvernight} />
                          <span className="slider round"></span>
                        </label>
                      </td>
                      <td><input id="FIRST" required type="radio" name={`Position-${index}`} value= "FIRST" onChange={(e) => handleChange(index, 'Position', 'FIRST')} /></td>
                      <td><input id="BAR" type="radio" name={`Position-${index}`} value="BAR" onChange={(e) => handleChange(index, 'Position', 'BAR')} /></td>
                      <td><input id="PURSER" type="radio" name={`Position-${index}`} value="PURSER" onChange={(e) => handleChange(index, 'Position', 'PURSER')} /></td>
                      <td className="FOR"></td>
                      <td className="FOR"><input id="Early" type="checkbox" name="Early" checked={shift.Early} onChange={(e) => handleChange(index, 'Early', e.target.checked)} /></td>
                      <td className="FOR"><input id="Late" type="checkbox" name="Late" checked={shift.Late} onChange={(e) => handleChange(index, 'Late', e.target.checked)} /></td>
                      <td className="FOR"><input id="LTA" type="checkbox" name="LTA" checked={shift.LTA} onChange={(e) => handleChange(index, 'LTA', e.target.checked)} /></td>
                      <td className="FOR"><input id="DO" type="checkbox" name="DO" checked={shift.DO} onChange={(e) => handleChange(index, 'DO', e.target.checked)} /></td>
                      <td className="FOR"><input id="Note" type="text" name="Note" maxLength={50} placeholder="Note"></input></td>
                    </tr>
                  </tbody>
                ))}
              </table>
            </div>
            
          
          <div> LTA: "Long turn-around" | D.O.: "Day off" | 9000 + 9000 = "See Note" 🤓 </div>
            
          <div className="buttons">
            <button className="submit" type="submit">Submit</button>
            <a className="swap-form-link" href="https://app.smartsheet.com/b/form/20d18963576e477bafcbf102df2aec3d" target="_blank" rel="noreferrer">Swap Form</a>
            <a className="roster-link" href="https://www.momentumserviceslondon.com/activite" target="_blank" rel="noreferrer">Roster</a>
            <a className="Tuto" href="" target="_blank" rel="noreffere">Tutorial</a>
          </div>
          
          
        </form>
      
    </>
  )
};