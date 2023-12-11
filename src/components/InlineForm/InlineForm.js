import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './InlineForm.css';

const InlineForm = () => {
  
  const [shifts, setShifts] = React.useState([{isOvernight: false, Date: '', Outbound: '', Inbound: '', Position:'', Early: false, Late: false, LTA: false, DO: false}]);

  const addShift = () => {
    const newShifts = [...shifts, {isOvernight: false, Date: '', Outbound: '', Inbound: '', Position:'', Early: false, Late: false, LTA: false, DO: false}];
    setShifts(newShifts)
  };

  const deleteShift = (index) => {
    const updatedShifts = [...shifts];
    updatedShifts.splice(index, 1);
    setShifts(updatedShifts);
  };

  const ovSwitch = (index) => { 
    const updatedShifts = [...shifts];
    updatedShifts[index].isOvernight = !updatedShifts[index].isOvernight;
    setShifts(updatedShifts)
  };

  const handleChange = (index, fieldName, value) => {
    const updatedShifts = [...shifts];
    updatedShifts[index][fieldName] = value;
    setShifts(updatedShifts);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isOutdated = (day) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return day < today;
    };

    const isAnyOutdated = shifts.some(shift => shift.Date && isOutdated(new Date(shift.Date)));

    if (isAnyOutdated) {
      toast.error('Oops... You can\'t submit an outdated swap 🤓');
      return;
    }

    shifts.forEach(shift => {
      const formData = {
        Email: e.target.elements.Email.value,
        Date: shift.Date,
        Outbound: shift.Outbound,
        Inbound: shift.isOvernight ? shift.Inbound + '+1d' : shift.Inbound,
        Position: shift.Position,
        Early: shift.Early,
        Late: shift.Late,
        LTA: shift.LTA,
        DO: shift.DO,
        Note: e.target.elements.Note.value
      };

      fetch('http://localhost:3001/formData', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(formData)
        })
      .then(response => {
        if (!response.ok) {
          throw new Error('Form submission failed');
        }
        return response.json()
      })
      .then(data => {
        console.log('Success', data);
        toast.success(`${shift.Outbound} - ${shift.Inbound} on ${shift.Date} submitted successfully!`)
      })
      .catch(error => {
        console.log(error);
        toast.error(`${shift.Outbound} - ${shift.Inbound} on ${shift.Date} submission failed`)
      });
    });
  };
  
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
      <ToastContainer />
    </>
  )
};

export default InlineForm;