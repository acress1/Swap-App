import InlineForm from './components/InlineForm/InlineForm';
import Calendar from './components/Calendar/Calendar';
import { format } from 'date-fns';
import './App.css';

function App() {
  const todayDate = new Date();
  const BASEURL = "http://localhost:3001";

  const isOutdated = (day) => {
    todayDate.setHours(0, 0, 0, 0);
    return day < todayDate;
  };

  return (
    <>
      <div className="greetings">Hi there! Today is {format(todayDate, 'MMMM do, y O')} </div>
      <InlineForm BASEURL= {BASEURL} todayDate={todayDate} isOutdated={isOutdated} />
      <Calendar BASEURL= {BASEURL} todayDate={todayDate}isOutdated={isOutdated}/>
    </>
  );
}

export default App;