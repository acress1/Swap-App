import { useState } from 'react';
import { format, addMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth } from 'date-fns';
import ViewBox from './ViewBox';
import isOutdated from 'utils/isOutdated';
import 'styles/Calendar.scss';

const Calendar = ({ 
  todayDate, 
  swapData, 
  daysWithData, 
  daySwapData,
  getDaySwapData
}) => {
  
  const currentMonth = startOfMonth(todayDate);
  const nextMonth = startOfMonth(addMonths(currentMonth, 1));
  const monthsInCalendar = [currentMonth, nextMonth];

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
        { monthsInCalendar.map((month, monthIndex) => {
          
          const formatedMonth = format( month, 'MMMM yyyy');
          
          return(
            <div key={monthIndex}>
              <div style={{margin: '5px', fontWeight: 'bold'}}>{formatedMonth}</div>
              <div className="calendar-month">
                { eachDayOfInterval({ start: startOfMonth(month), end: endOfMonth(month)})
                  .map((day, dayIndex) => {

                    const formatedDay = format(day, 'dd/MM/yyyy');
                    const formatedSelectedDay = selectedDay ? format(selectedDay, 'dd/MM/yyyy') : null;
                    const weekDay = format(day, 'EEEE');
                    const dayNumber = format(day, 'd');
                    const hasDate = daysWithData.includes(formatedDay);

                    return (
                      <div 
                        key={dayIndex}
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
                              ''
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