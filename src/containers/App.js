import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InlineForm from '../components/InlineForm/InlineForm';
import Calendar from '../components/Calendar/Calendar';
import { Categories } from "../components/Categories";
import Greetings from "../components/Greetings";
import Version from "../components/Version.jsx";
import './App.scss';

export default function App() {

  const todayDate = new Date();

  const BASEURL = "http://localhost:3001";
  
  const searchField = ['Date','Outbound','Inbound','Position','Email','Note','Sent'];

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
    setShowDayBox(!showDayBox);
    setShowQuickView(false);
  };

  return (
    <>
      <Greetings todayDate={todayDate} />
      <InlineForm BASEURL={BASEURL} Categories={Categories} isOutdated={isOutdated} setShowQuickView={setShowQuickView} />
      <Calendar BASEURL={BASEURL} Categories={Categories} searchField={searchField} isOutdated={isOutdated} showQuickView={showQuickView} showDayBox={showDayBox} toggleQuickViewBox={toggleQuickViewBox} selectedDay={selectedDay} toggleDayBox={toggleDayBox} />
      <ToastContainer />
      <Version todayDate={todayDate}/>
    </>
  );
}