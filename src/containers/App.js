import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { format } from 'date-fns';
import "react-toastify/dist/ReactToastify.css";
import InlineForm from '../components/InlineForm/InlineForm';
import Calendar from '../components/Calendar/Calendar';
import Greetings from "../components/Greetings";
import Version from "../components/Version.jsx";
import Loader from "../components/Loader.jsx";
import './App.scss';

export default function App() {

  const todayDate = new Date();

  const BASEURL = "http://localhost:3001";

  const [swapData, setSwapData] = useState([]);
  const [daysWithData, setDaysWithData] = useState([]);
  const [daySwapData, setDaySwapData] = useState([]);

  const [showQuickView, setShowQuickView] = useState(false);
  const [showDayBox, setShowDayBox] = useState(false);
  
  const [selectedDay, setSelectedDay] = useState(null);

  const isOutdated = (day) => {
    todayDate.setHours(0, 0, 0, 0);
    return day < todayDate;
  };

  const toggleQuickViewBox = () => {
    setSelectedDay(null);
    setShowQuickView(!showQuickView);
    setShowDayBox(false);
  };
  
  const toggleDayBox = (day) => { 
    setSelectedDay(day);
    setShowDayBox(true);
    setShowQuickView(false);
  };

  useEffect(() => {
    fetch(`${BASEURL}/dbData`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch Calendar Data');
      }
      return response.json()
    })
    .then(data => {
      let daysWithData = data.data.map(item => item.Date);
      let formatedSelectedDay = selectedDay ? format(selectedDay, 'dd/MM/yyyy') : null;
      let daySwapData = data.data.filter(item => item.Date === formatedSelectedDay);

      setDaysWithData(daysWithData);
      setSwapData(data.data);
      setDaySwapData(daySwapData);
    })
    .catch(error => console.error('Error fetching days with data:', error))
  }, [BASEURL, selectedDay]);

  // console.log(daySwapData);
  // console.log(swapData);
  // console.log(daysWithData);

  return (
    <>
      <Greetings todayDate={todayDate} />
      <InlineForm BASEURL={BASEURL} isOutdated={isOutdated} setShowQuickView={setShowQuickView} />
      { !daysWithData ? <Loader /> : <Calendar todayDate={todayDate} swapData={swapData} daysWithData={daysWithData} daySwapData={daySwapData} isOutdated={isOutdated} showQuickView={showQuickView} showDayBox={showDayBox} toggleQuickViewBox={toggleQuickViewBox} selectedDay={selectedDay} toggleDayBox={toggleDayBox} /> }
      <ToastContainer />
      <Version todayDate={todayDate}/>
    </>
  );
}