import InlineForm from './components/InlineForm/InlineForm';
import Calendar from './components/Calendar/Calendar';
import { format } from 'date-fns';
import './App.css';

function App() {
  const todayDate = format(new Date(), 'MMMM do, y O');
  const BASEURL = "http://localhost:3001";

  return (
    <>
      <div className="greetings">Hi there! Today is {todayDate} </div>
      <InlineForm BASEURL= {BASEURL} />
      <Calendar BASEURL= {BASEURL} />
    </>
  );
}

export default App;