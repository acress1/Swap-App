import InlineForm from './components/InlineForm/InlineForm';
import Calendar from './components/Calendar/Calendar';
import { format } from 'date-fns';
import './App.css';

function App() {
  const todayDate = format(new Date(), 'MMMM do, y O');

  return (
    <>
      <div className="greetings">Hi there! Today is {todayDate} </div>
      <InlineForm />
      <Calendar />
    </>
  );
}

export default App;