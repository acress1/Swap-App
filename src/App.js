import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InlineForm from './components/InlineForm.jsx';
import Calendar from './components/Calendar.jsx';
import Greetings from "./components/Greetings.jsx";
import Version from "./components/Version.jsx";
import useSwapData from "./hooks/useSwapData.js";
import './/styles/App.scss';

export default function App() {

  const todayDate = new Date();

  const BASEURL = "http://localhost:3001";

  const { swapData, daysWithData, daySwapData, getDaySwapData } = useSwapData(BASEURL);

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
    getDaySwapData(day);
  };

  return (
    <>
      <Greetings todayDate={todayDate} />
      <InlineForm 
        BASEURL={BASEURL} 
        isOutdated={isOutdated} 
        setShowQuickView={setShowQuickView}
      />
      <Calendar 
        todayDate={todayDate} 
        swapData={swapData} 
        daysWithData={daysWithData} 
        daySwapData={daySwapData} 
        isOutdated={isOutdated} 
        showQuickView={showQuickView} 
        showDayBox={showDayBox} 
        toggleQuickViewBox={toggleQuickViewBox} 
        selectedDay={selectedDay} 
        toggleDayBox={toggleDayBox} 
      />
      <Version todayDate={todayDate}/>
      <ToastContainer />
    </>
  );
}