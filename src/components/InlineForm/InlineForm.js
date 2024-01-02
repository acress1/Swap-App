import React from "react";
import "react-toastify/dist/ReactToastify.css";
import './InlineForm.css';

const InlineForm = ({ addShift, deleteShift, ovSwitch, handleChange, handleSubmit, shifts }) => {
  
  return (
    <>
      <div className="inline-form">
        <form onSubmit={handleSubmit}>
          <input required type="email" name="Email" placeholder="Email" />
          <div className="table">
          <table>
            <thead>
              <tr>
                <th>SHIFT</th>
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
                <th className="FOR end">Day Off</th>
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
                <td><input required type="date" name="Date" value={shift.Date} onChange={(e) => handleChange(index, 'Date', e.target.value)} /></td>
                <td><input required type="number" min="9000" max="9199" name="Outbound" placeholder="Outbound" value={shift.Outbound} onChange={(e) => handleChange(index, 'Outbound', e.target.value)} /></td>
                <td><input required type="number" min="9000" max="9199" name="Inbound" placeholder="Inbound" value={shift.Inbound} onChange={(e) => handleChange(index, 'Inbound', e.target.value)} /></td>
                <td>
                  <label className="switch">
                    <input type="checkbox" onChange={() => ovSwitch(index)} checked={shift.isOvernight} />
                    <span className="slider round"></span>
                  </label>
                </td>
                <td><input required type="radio" name={`Position-${index}`} value= "FIRST" onChange={(e) => handleChange(index, 'Position', 'FIRST')} /></td>
                <td><input type="radio" name={`Position-${index}`} value="BAR" onChange={(e) => handleChange(index, 'Position', 'BAR')} /></td>
                <td><input type="radio" name={`Position-${index}`} value="PURSER" onChange={(e) => handleChange(index, 'Position', 'PURSER')} /></td>
                <td className="FOR"></td>
                <td className="FOR"><input type="checkbox" name="Early" checked={shift.Early} onChange={(e) => handleChange(index, 'Early', e.target.checked)} /></td>
                <td className="FOR"><input type="checkbox" name="Late" checked={shift.Late} onChange={(e) => handleChange(index, 'Late', e.target.checked)} /></td>
                <td className="FOR"><input type="checkbox" name="LTA" checked={shift.LTA} onChange={(e) => handleChange(index, 'LTA', e.target.checked)} /></td>
                <td className="FOR"><input type="checkbox" name="DO" checked={shift.DO} onChange={(e) => handleChange(index, 'DO', e.target.checked)} /></td>
              </tr>
            </tbody>
            ))}
          </table>
          </div>
          <div>
            <textarea name="Note" maxLength={50} placeholder="Note"></textarea>
          </div>
          <button className="submit" type="submit">Submit</button>
          <a className="swap-form-link" href="https://app.smartsheet.com/b/form/20d18963576e477bafcbf102df2aec3d" target="_blank" rel="noreferrer">Swap Form</a>
          <a className="roster-link" href="https://www.momentumserviceslondon.com/activite" target="_blank" rel="noreferrer">Roster</a>
        </form>
      </div>
    </>
  )
};

export default InlineForm;