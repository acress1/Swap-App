import React from "react";
import './InlineForm.css';

const InlineForm = ({ todayDate, timeZone }) => {
  const [isOvernight, setIsOvernight] = React.useState(false);
  const ovSwitch = () => {
    setIsOvernight(!isOvernight);
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
    })
  };
  
  return (
    <>
      <div className="inline-form">
        <div className="greetings">Hi there! Today is {todayDate} - {timeZone} </div>
        <form onSubmit={handleSubmit}>
          <div>
            <input type="text" name="Name" placeholder="Name" />
            <input type="email" name="Email" placeholder="Email" />
          </div>
          <input type="date" name="Date" />
          <div>
            <input type="number" min="9000" max="9199" name="Outbound" placeholder="Outbound" />
            <input type="number" min="9000" max="9199" name="Inbound" placeholder="Inbound" />
            <label>OVERNIGHT</label>
            <label className="switch">
            <input type="checkbox" onChange={ovSwitch} checked={isOvernight} />
            <span className="slider round"></span>
            </label>
            <label>FIRST<input type="checkbox" name="FIRST" /></label>
            <label>BAR<input type="checkbox" name="BAR" /></label>
          </div>
          <div>
            <span> LOOKING FOR : </span>
            <label>Early<input type="checkbox" name="Early" /></label>
            <label>Late<input type="checkbox" name="Late" /></label>
            <label>LTA<input type="checkbox" name="LTA" /></label>
            <label>Day OFF<input type="checkbox" name="DO" /></label>
          </div>
          <div>
            <textarea name="Note" maxLength={50} placeholder="Note"></textarea>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  )
};

export default InlineForm;