import { useState } from "react";
import { format } from 'date-fns';
import { ToastContainer, toast } from "react-toastify";
import InlineForm from '../components/InlineForm/InlineForm';
import Calendar from '../components/Calendar/Calendar';
import "react-toastify/dist/ReactToastify.css";
import './App.scss';

export default function App() {

  const todayDate = new Date();
  const BASEURL = "http://localhost:3001";

  const categories = [
    {
      id: 0,
      name: 'Date'
    },
    {
      id: 1,
      name: 'Outbound'
    },
    {
      id: 2,
      name: 'Inbound'
    },
    {
      id: 3,
      name: 'Overnight'
    },
    {
      id: 4,
      name: 'FIRST'
    },
    {
      id: 5,
      name: 'BAR'
    },
    {
      id: 6,
      name: 'PURSER'
    },
    {
      id: 7,
      name: 'Early'
    },
    {
      id: 8,
      name: 'Late'
    },
    {
      id: 9,
      name: 'LTA'
    },
    {
      id: 10,
      name: 'DO'
    },
    {
      id: 11,
      name: 'Note'
    }
  ];

  const searchField = ['Date','Outbound','Inbound','Position','Email','Note','Sent'];

  const [showQuickView, setShowQuickView] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);
  
  const [shifts, setShifts] = useState([{isOvernight: false, Date: '', Outbound: '', Inbound: '', Position:'', Early: false, Late: false, LTA: false, DO: false}]);

  const isOutdated = (day) => {
    todayDate.setHours(0, 0, 0, 0);
    return day < todayDate;
  };

  const toggleQuickViewBox = () => {
    setShowQuickView(!showQuickView);
    setSelectedDay(false)
  };
  
  const toggleDayBox = (day) => { 
    setSelectedDay(prevSelectedDay => (prevSelectedDay && prevSelectedDay.getTime() === day.getTime() ? null : day));
    setShowQuickView(false)
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

  const handleChange = (index, fieldName, value) => {
    const updatedShifts = [...shifts];
    updatedShifts[index][fieldName] = value;
    setShifts(updatedShifts);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

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
        Note: shift.Note
      };

      fetch(`${BASEURL}/formData`, {
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
        toast.success(`${shift.Outbound} - ${shift.Inbound} on ${shift.Date} submitted successfully!`);
        setShowQuickView(true)
      })
      .catch(error => {
        console.log(error);
        toast.error(`${shift.Outbound} - ${shift.Inbound} on ${shift.Date} submission failed`)
      });
    });
  };

  return (
    <>
      <div className="greetings">Hi there! Today is {format(todayDate, 'MMMM do, y O')} </div>
      <InlineForm BASEURL= {BASEURL} categories={categories} searchField={searchField} todayDate={todayDate} isOutdated={isOutdated} addShift={addShift} deleteShift={deleteShift} ovSwitch={ovSwitch} handleChange={handleChange} shifts={shifts} handleSubmit={handleSubmit} />
      <Calendar BASEURL= {BASEURL} categories={categories} searchField={searchField} isOutdated={isOutdated} showQuickView={showQuickView} toggleQuickViewBox={toggleQuickViewBox} selectedDay={selectedDay} toggleDayBox={toggleDayBox} />
      <ToastContainer />
    </>
  );
}