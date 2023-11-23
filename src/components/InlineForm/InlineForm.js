import React from "react";
import './InlineForm.css';

const InlineForm = ({ todayDate, timeZone }) => {
  const [shifts, setShifts] = React.useState([{setIsOvernight: false}]);
  const isOvernight = React.useState(false);

  const ovSwitch = (index) => { 
    const updatedShifts = [...shifts];
    updatedShifts[index].isOvernight = !updatedShifts[index].isOvernight;
    setShifts(updatedShifts)
  };

  const addShift = () => {
    const newShifts = [...shifts, {isOvernight: false}];
    setShifts(newShifts)
  };

  const deleteShift = (index) => {
    const updatedShifts = [...shifts];
    updatedShifts.splice(index, 1);
    setShifts(updatedShifts);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      Name: e.target.elements.Name.value,
      Email: e.target.elements.Email.value,
      Date: e.target.elements.Date.value,
      Outbound: e.target.elements.Outbound.value,
      Inbound: isOvernight ? e.target.elements.Inbound.value + '+1d' : e.target.elements.Inbound.value,
      FIRST: e.target.elements.FIRST.checked,
      BAR: e.target.elements.BAR.checked,
      Early: e.target.elements.Early.checked,
      Late: e.target.elements.Late.checked,
      LTA: e.target.elements.LTA.checked,
      DO: e.target.elements.DO.checked,
      Note: e.target.elements.Note.value
    };

    const requiredFields = ['Name','Email','Date','Outbound','Inbound'];
    
    const missingFields = requiredFields.filter(field => !formData[field]);

    if (missingFields.length > 0) {
      alert('Oops... Something\'s missing 🤓');
    }

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
      alert('Form submitted successfully!')
    })
    .catch(error => {
      console.log(error);
    });
    setShifts([{key: 0}])
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
                <input type="date" name="Date" />
                <input type="number" min="9000" max="9199" name="Outbound" placeholder="Outbound" />
                <input type="number" min="9000" max="9199" name="Inbound" placeholder="Inbound" />
                <label>OVERNIGHT</label>
                <label className="switch">
                  <input type="checkbox" onChange={() => ovSwitch(index)} checked={shift.isOvernight} />
                  <span className="slider round"></span>
                </label>
                <label>FIRST<input type="checkbox" name="FIRST" /></label>
                <label>BAR<input type="checkbox" name="BAR" /></label>
                <span> LOOKING FOR : </span>
                <label>Early<input type="checkbox" name="Early" /></label>
                <label>Late<input type="checkbox" name="Late" /></label>
                <label>LTA<input type="checkbox" name="LTA" /></label>
                <label>Day OFF<input type="checkbox" name="DO" /></label>
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