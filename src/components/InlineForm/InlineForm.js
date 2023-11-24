import React from "react";
import './InlineForm.css';

const InlineForm = ({ todayDate, timeZone }) => {
  const [shifts, setShifts] = React.useState([{isOvernight: false, Date: '', Outbound: '', Inbound: '', FIRST: false, BAR: false, Early: false, Late: false, LTA: false, DO: false}]);

  const addShift = () => {
    const newShifts = [...shifts, {isOvernight: false, Date: '', Outbound: '', Inbound: '', FIRST: false, BAR: false, Early: false, Late: false, LTA: false, DO: false}];
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

    const isValid = shifts.every(shift => shift.Date && shift.Outbound && shift.Inbound);
    if (!isValid) {
      alert('Oops... Something\'s missing 🤓');
      return;
    }

    shifts.forEach((shift, index) => {
      const formData = {
        Name: e.target.elements.Name.value,
        Email: e.target.elements.Email.value,
        Date: shift.Date,
        Outbound: shift.Outbound,
        Inbound: shift.isOvernight ? shift.Inbound + '+1d' : shift.Inbound,
        FIRST: shift.FIRST,
        BAR: shift.BAR,
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
        console.log('Success', formData);
        alert('Form submitted successfully!')
      })
      .catch(error => {
        console.log(error);
      });
    });
  };
  
  return (
    <>
      <div className="greetings">Hi there! Today is {todayDate} - {timeZone} </div>
      <div className="inline-form">
        <form onSubmit={handleSubmit}>
          <div>
            <input type="text" name="Name" placeholder="Name" />
            <input type="email" name="Email" placeholder="Email" />
          </div>
            {shifts.map((shift, index) => (
              <div className="shift" key={index}>
                <input type="date" name="Date" value={shift.Date} onChange={(e) => handleChange(index, 'Date', e.target.value)} />
                <input type="number" min="9000" max="9199" name="Outbound" placeholder="Outbound" value={shift.Outbound} onChange={(e) => handleChange(index, 'Outbound', e.target.value)} />
                <input type="number" min="9000" max="9199" name="Inbound" placeholder="Inbound" value={shift.Inbound} onChange={(e) => handleChange(index, 'Inbound', e.target.value)} />
                <label>OVERNIGHT</label>
                <label className="switch">
                  <input type="checkbox" onChange={() => ovSwitch(index)} checked={shift.isOvernight} />
                  <span className="slider round"></span>
                </label>
                <label>FIRST<input type="checkbox" name="FIRST" checked={shift.FIRST} onChange={(e) => handleChange(index, 'FIRST', e.target.checked)} /></label>
                <label>BAR<input type="checkbox" name="BAR" checked={shift.BAR} onChange={(e) => handleChange(index, 'BAR', e.target.checked)} /></label>
                <span> LOOKING FOR : </span>
                <label>Early<input type="checkbox" name="Early" checked={shift.Early} onChange={(e) => handleChange(index, 'Early', e.target.checked)} /></label>
                <label>Late<input type="checkbox" name="Late" checked={shift.Late} onChange={(e) => handleChange(index, 'Late', e.target.checked)} /></label>
                <label>LTA<input type="checkbox" name="LTA" checked={shift.LTA} onChange={(e) => handleChange(index, 'LTA', e.target.checked)} /></label>
                <label>Day OFF<input type="checkbox" name="DO" checked={shift.DO} onChange={(e) => handleChange(index, 'DO', e.target.checked)} /></label>
                <button className="add-line" type="button" onClick={addShift}></button>
                <button className="delete-line" type="button" onClick={() => deleteShift(index)}></button>
              </div>
            ))}
          <div>
            <textarea name="Note" maxLength={50} placeholder="Note"></textarea>
          </div>
          <button className="submit" type="submit">Submit</button>
        </form>
      </div>
    </>
  )
};

export default InlineForm;