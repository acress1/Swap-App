import InlineForm from './components/InlineForm/InlineForm';
import Calendar from './components/Calendar/Calendar';
import './App.css';

function App() {
  const todayDate = new Date().toDateString();
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  return (
    <>
      <InlineForm todayDate= {todayDate} timeZone= {timeZone} />
      <Calendar />
    </>
  );
}

export default App;