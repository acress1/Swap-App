import { format, addMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth } from 'date-fns';
import ViewBox from './ViewBox';
import 'styles/Calendar.scss';

const Calendar = ({ 
  todayDate, 
  swapData, 
  daysWithData, 
  daySwapData, 
  isOutdated, 
  showQuickView, 
  showDayBox, 
  toggleQuickViewBox, 
  selectedDay, 
  toggleDayBox 
}) => {
  
  const currentMonth = startOfMonth(todayDate);
  const nextMonth = startOfMonth(addMonths(currentMonth, 1));
  const monthsInCalendar = [currentMonth, nextMonth];

  return (
    <>
      <div className='calendar'>
        <button 
          className='overview-button' 
          onClick={toggleQuickViewBox}
          >Overview</button>
        { showQuickView && 
          <ViewBox 
            swapData={swapData} 
            selectedDay={selectedDay} 
            daySwapData={daySwapData} 
          /> }
        { monthsInCalendar.map(month => {
          
          const formatedMonth = format( month, 'MMMM yyyy');
          
          return(
            <div key={month}>
              <div style={{margin: '5px', fontWeight: 'bold'}}>{formatedMonth}</div>
              <div className="calendar-month">
                { eachDayOfInterval({ start: startOfMonth(month), end: endOfMonth(month)})
                  .map(day => {

                    const formatedDay = format(day, 'dd/MM/yyyy');
                    const formatedSelectedDay = selectedDay ? format(selectedDay, 'dd/MM/yyyy') : null;
                    const weekDay = format(day, 'EEEE');
                    const dayNumber = format(day, 'd');
                    const hasDate = daysWithData.includes(formatedDay);

                    return (
                      <div 
                        key={day}
                        className={
                          isOutdated(todayDate, day) ? 'calendar-day outdated' : 
                            selectedDay && formatedDay === formatedSelectedDay ? 
                              'calendar-day selected' :
                              'calendar-day'
                        } 
                        onClick={() => { isOutdated(todayDate, day) ? toggleDayBox(null) : toggleDayBox(day) }}
                      >
                        <div className='week-day'>{weekDay}</div>
                        <div className='day-number'>{dayNumber}</div>
                        <div className={
                          isOutdated(todayDate, day) ? '' :
                            hasDate ? 'dot' : 
                              null
                          }
                        ></div>
                      </div>
                    )}
                  )}
              </div>
              { showDayBox && isSameMonth(selectedDay, month) && 
                <ViewBox 
                  swapData={swapData} 
                  selectedDay={selectedDay} 
                  daySwapData={daySwapData} 
                /> }
            </div>
          )})}
      </div>
    </>
  );
};

export default Calendar;