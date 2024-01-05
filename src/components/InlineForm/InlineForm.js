import React from "react";
import "react-toastify/dist/ReactToastify.css";
import './InlineForm.css';

const InlineForm = ({ addShift, deleteShift, ovSwitch, handleChange, handleSubmit, shifts }) => {
  
  return (
    <>
      <div className="inline-form">
        <form onSubmit={handleSubmit}>
          <input id="Email" required autoComplete="on" type="email" name="Email" placeholder="Email" />
          <div className="table">
          <table>
            <thead>
              <tr>
                <th></th>
                <th>Date</th>
                <th>Outbound</th>
                <th>Inbound</th>
                <th>Overnight</th>
                <th>FIRST</th>
                <th>BAR</th>
                <th>PURSER</th>
                <th className="FOR start">FOR:</th>
                <th className="FOR">Early</th>
                <th className="FOR">Late</th>
                <th className="FOR">LTA</th>
                <th className="FOR end">D.O.</th>
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
              </tr>
            </tbody>
            ))}
          </table>
          </div>
          <div className="inception">
            <div className="inlineForm-bottom">
              <textarea name="Note" maxLength={50} placeholder="Note"></textarea>
              <div>
                <button className="submit" type="submit">Submit</button>
                <a className="swap-form-link" href="https://app.smartsheet.com/b/form/20d18963576e477bafcbf102df2aec3d" target="_blank" rel="noreferrer">Swap Form</a>
                <a className="roster-link" href="https://www.momentumserviceslondon.com/activite" target="_blank" rel="noreferrer">Roster</a>
              </div>
            </div>
            <div className="Tuto">
              LTA: "Long turn-around" 
              <br></br>
              D.O.: "Day off"
            </div>
          </div>
          
        </form>
      </div>
    </>
  )
};

export default InlineForm;