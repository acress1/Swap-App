import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InlineForm from 'components/InlineForm/InlineForm.js';
import Calendar from 'components/Calendar.js';
import Greetings from "components/Greetings.js";
import Version from "components/Version.js";
import Loader from "components/Loader";
import useGetSwapData from "hooks/useGetSwapData.js";
import isOutdated from "utils/isOutdated";
import 'styles/App.scss';


const App = () => {

  const BASEURL = "https://swap-app-server.onrender.com";

  const todayDate = new Date();

  const { loading, swapData, daysWithData, daySwapData, getDaySwapData } = useGetSwapData(BASEURL);

  const [showQuickView, setShowQuickView] = useState(false);
  const [showDayBox, setShowDayBox] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);

  const toggleQuickViewBox = () => {
    setSelectedDay(null);
    setShowQuickView(!showQuickView);
    setShowDayBox(false);
  };
  
  const toggleDayBox = (day) => { 
    setSelectedDay(day);
    setShowDayBox(!showDayBox);
    setShowQuickView(false);
    getDaySwapData(day);
  };

  return (
    <>
      <Greetings 
        todayDate={todayDate} 
      />
      <InlineForm 
        BASEURL={BASEURL}
        todayDate={todayDate}
        isOutdated={isOutdated}
      />
      { loading ?
        <Loader /> :
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
      }
      <Version 
        todayDate={todayDate}
      />
      <ToastContainer />
    </>
  );
};

export default App;