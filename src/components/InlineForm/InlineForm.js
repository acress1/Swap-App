import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './InlineForm.css';

const InlineForm = ({ todayDate, timeZone }) => {
  
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

    const isValid = shifts.every(shift => shift.Date && shift.Outbound && shift.Inbound && shift.Position);
    if (!isValid) {
      toast.error('Oops... Something\'s missing 🤓');
      return;
    }

    shifts.forEach((shift) => {
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
      <div className="greetings">Hi there! Today is {todayDate} - {timeZone} </div>
      <div className="inline-form">
        <form onSubmit={handleSubmit}>
          <div>
            <input type="email" name="Email" placeholder="Email" />
          </div>
            {shifts.map((shift, index) => (
              <div className="shift" key={index}>
                <input type="date" name="Date" value={shift.Date} onChange={(e) => handleChange(index, 'Date', e.target.value)} />
                <input type="number" min="9000" max="9199" name="Outbound" placeholder="Outbound" value={shift.Outbound} onChange={(e) => handleChange(index, 'Outbound', e.target.value)} />
                <input type="number" min="9000" max="9199" name="Inbound" placeholder="Inbound" value={shift.Inbound} onChange={(e) => handleChange(index, 'Inbound', e.target.value)} />
                <span>
                  <span>
                    <label>OVERNIGHT</label>
                    <label className="switch">
                      <input type="checkbox" onChange={() => ovSwitch(index)} checked={shift.isOvernight} />
                      <span className="slider round"></span>
                    </label>
                  </span>
                  <label>FIRST<input className="checkbox-type" type="radio" name={`Position-${index}`} value= "FIRST" required onChange={(e) => handleChange(index, 'Position', 'FIRST')} /></label>
                  <label>BAR<input className="checkbox-type" type="radio" name={`Position-${index}`} value="BAR" onChange={(e) => handleChange(index, 'Position', 'BAR')} /></label>
                  <label>PURSER<input className="checkbox-type" type="radio" name={`Position-${index}`} value="PURSER" onChange={(e) => handleChange(index, 'Position', 'PURSER')} /></label>
                </span>
                <div>
                  <label>LOOKING FOR :</label>
                  <label>Early<input className="checkbox-type" type="checkbox" name="Early" checked={shift.Early} onChange={(e) => handleChange(index, 'Early', e.target.checked)} /></label>
                  <label>Late<input className="checkbox-type" type="checkbox" name="Late" checked={shift.Late} onChange={(e) => handleChange(index, 'Late', e.target.checked)} /></label>
                  <label>LTA<input className="checkbox-type" type="checkbox" name="LTA" checked={shift.LTA} onChange={(e) => handleChange(index, 'LTA', e.target.checked)} /></label>
                  <label>Day OFF<input className="checkbox-type" type="checkbox" name="DO" checked={shift.DO} onChange={(e) => handleChange(index, 'DO', e.target.checked)} /></label>
                </div>
                <button className="add-line" type="button" onClick={addShift}></button>
                <button className="delete-line" type="button" onClick={() => deleteShift(index)}></button>
              </div>
            ))}
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