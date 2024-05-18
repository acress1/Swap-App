import { useState } from "react";
import { toast } from "react-toastify";
import { Categories } from "../constant";
import postSwapData from "../utils/postSwapData";
import '../styles/InlineForm.scss';

export default function InlineForm ({ BASEURL, isOutdated }) {
  
  const selectedCategories1 = Categories.slice(12);
  const selectedCategories2 = Categories.slice(0, 7);
  const selectedCategories3 = Categories.slice(7, 12);

  const [shifts, setShifts] = useState([{isOvernight: false, Date: '', Outbound: '', Inbound: '', Position:'', Early: false, Late: false, LTA: false, DO: false}]);

  const handleChange = (index, fieldName, fieldValue) => {
    const updatedShifts = [...shifts];
    updatedShifts[index][fieldName] = fieldValue;
    // const isNotNeeded = updatedShifts[index][fieldName] === 'AV' || updatedShifts[index][fieldName] === 'Platform';
    // console.log(updatedShifts[index].Outbound);
    setShifts(updatedShifts);
  };

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const isAnyOutdated = shifts.some(shift => shift.Date && isOutdated(new Date(shift.Date)));

    isAnyOutdated ? 
      toast.error('Oops... You can\'t submit an outdated swap 🤓') 
      : postSwapData(BASEURL, shifts, e);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
          
        <input required name="Email" style={{marginBottom: '4px'}} type="email" placeholder="Email" />

        <div className="overflow">
          <table>
            <thead>
              <tr>
                <th>SHIFT</th>
                {selectedCategories1.map(({name}) => (<th> {name} </th>))}
                {selectedCategories2.map(({name}) => (<th> {name} </th>))}
                <th className='FOR'>FOR:</th>
                {selectedCategories3.map(({name}) => (<th className= 'FOR'> {name} </th>))}
              </tr>
            </thead>
            {shifts.map((shift, index) => (
              <tbody key={index}>
                <tr>
                  <td>
                    <button className="add-line" type="button" onClick= {addShift} />
                    <button className="delete-line" type="button" onClick= {() => deleteShift(index)} />
                  </td>
                  {selectedCategories1.map(({name}) => (
                    <td>
                      <input
                        name = {`Position-${index}`}
                        type = {'AV' || 'Platform' ? 'radio' : null}
                        value = {
                          name === 'AV' ? 'AV' :
                          name === 'Platform' ? 'Platform' : null
                        }
                        onChange = {
                          name === 'AV' ? (e) => handleChange(index, 'Position', 'AV') :
                          name === 'Platform' ? (e) => handleChange(index, 'Position', 'Platform') : null
                        }
                      />
                    </td>
                  ))}
                  {selectedCategories2.map(({id, name}) => (
                    <td>
                      <input
                        id = {id}
                        required = { 
                          name === 'Date' ? true : false 
                        }
                        min = { 
                          name === 'Outbound' || 'Inbound' ? '9000' : null 
                        }
                        max = { 
                          name === 'Outbound' || 'Inbound' ? '9199' : null 
                        }
                        checked = { 
                          name === 'Overnight' ? shift.isOvernight : null 
                        }
                        name = { 
                          id >= 4 ? `Position-${index}` : name 
                        }
                        className= { 
                          name === 'Overnight' ? 'switch': null
                        }
                        placeholder= { 
                          name === 'Outbound' || 'Inbound' ? '9xxx' : null 
                        }
                        type = {
                          name === 'Date' ? 'date' :
                          name === 'Outbound' ? 'number' :
                          name === 'Inbound' ? 'number' :
                          name === 'Overnight' ? 'checkbox' : 
                          name === 'FIRST' || 'BAR' || 'PURSER' ? 'radio' : null
                        }
                        value = {
                          name === 'Date' ? shift.Date :
                          name === 'Outbound' ? shift.Outbound :
                          name === 'Inbound' ? shift.Inbound :
                          name === 'Overnight' ? null :
                          name === 'FIRST' ? 'FIRST' :
                          name === 'BAR' ? 'BAR' :
                          name === 'PURSER' ? 'PURSER' : null
                        }
                        onChange = {
                          name === 'Date' ? (e) => handleChange(index, 'Date', e.target.value) :
                          name === 'Outbound' ? (e) => handleChange(index, 'Outbound', e.target.value) :
                          name === 'Inbound' ? (e) => handleChange(index, 'Inbound', e.target.value)  :
                          name === 'Overnight' ? ( ) => ovSwitch(index) :
                          name === 'FIRST' ? (e) => handleChange(index, 'Position', 'FIRST') :
                          name === 'BAR' ? (e) => handleChange(index, 'Position', 'BAR') :
                          name === 'PURSER' ? (e) => handleChange(index, 'Position', 'PURSER') : null
                        }
                      />
                    </td>
                  ))}
                  <td className="FOR"></td>
                  {selectedCategories3.map(({id, name}) => (
                    <td className="FOR">
                      <input
                        id = {id}
                        name = {name}
                        placeholder = { 
                          name === 'Note' ? 'Note' : null 
                        }
                        maxLength= { 
                          name === 'Note' ? 50 : null 
                        }
                        type = { 
                          id < 11 ? 'checkbox' : 'text' 
                        }
                        checked = {
                          name === 'Early' ? shift.Early :
                          name === 'Late' ? shift.Late :
                          name === 'LTA' ? shift.LTA :
                          name === 'DO' ? shift.DO : null
                        }
                        onChange= {
                          name === 'Early' ? (e) => handleChange(index, 'Early', e.target.checked) :
                          name === 'Late' ? (e) => handleChange(index, 'Late', e.target.checked) :
                          name === 'LTA' ? (e) => handleChange(index, 'LTA', e.target.checked) :
                          name === 'DO' ? (e) => handleChange(index, 'DO', e.target.checked) :
                          name === 'Note' ? (e) => handleChange(index, 'Note', e.target.value) : null
                        }
                      />
                    </td>
                  ))}
                </tr>
              </tbody>
            ))}
          </table>
        </div>
        
        <div style={{width: '100%', whiteSpace: 'nowrap', overflow: 'auto'}}> LTA: "Long turn-around" | D.O.: "Day off" | 9000 + 9000 = "See Note" 🤓 </div>

        <button className="submit" type="submit">Submit</button>  
      </form>
          
      <div className="buttons">
        <a className="swap-form-link" href="https://app.smartsheet.com/b/form/20d18963576e477bafcbf102df2aec3d" target="_blank" rel="noreferrer">Swap Form</a>
        <a className="roster-link" href="https://www.momentumserviceslondon.com/activite" target="_blank" rel="noreferrer">Roster</a>
        <a className="Tutorial" href="https://youtu.be/lGQ-xiyTrCk" target="_blank" rel="noreferrer">Tutorial</a>
      </div>
      
    </>
  )
};