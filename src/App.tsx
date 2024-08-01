import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InlineForm from 'components/InlineForm/InlineForm';
import Calendar from 'components/Calendar';
import Greetings from "components/Greetings";
import Version from "components/Version";
import Loader from "components/Loader";
import useGetSwapData from "hooks/useGetSwapData";
import 'styles/App.scss';


const App = () => {

  const BASEURL = "https://swap-app-server.onrender.com";

  const todayDate = new Date();

  const { loading, swapData, daysWithData, daySwapData, getDaySwapData } = useGetSwapData(BASEURL);

  return (
    <>
      <Greetings
        todayDate={todayDate}
      />
      <InlineForm
        BASEURL={BASEURL}
        todayDate={todayDate}
      />
      {loading ?
        <Loader /> :
        <Calendar
          todayDate={todayDate}
          swapData={swapData}
          daysWithData={daysWithData}
          daySwapData={daySwapData}
          getDaySwapData={getDaySwapData}
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