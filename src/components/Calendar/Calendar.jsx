import { format, addMonths, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns';
import ViewBox from '../ViewBoxes/ViewBox';
import './Calendar.scss';

export default function Calendar ({ todayDate, swapData, daysWithData, daySwapData, isOutdated, showQuickView, showDayBox, toggleQuickViewBox, selectedDay, toggleDayBox }) {
  
  const currentMonth = startOfMonth(todayDate);
  const nextMonth = startOfMonth(addMonths(currentMonth, 1));

  return (
    <>
      <div className='calendar'>
        <button className='overview-button' onClick={toggleQuickViewBox}>Overview</button>
        { showQuickView && <ViewBox swapData={swapData} selectedDay={selectedDay} daySwapData={daySwapData} /> }
        { [currentMonth, nextMonth].map(month => {

          let formatedMonth = format( month, 'MMMM yyyy');
          
          return(
            <div key={month}>
              <div style={{margin: '5px', fontWeight: 'bold'}}>{formatedMonth}</div>
              <div className="calendar-month">
                { eachDayOfInterval({ start: startOfMonth(month), end: endOfMonth(month)})
                  .map(day => {

                    let formatedDay = format(day, 'dd/MM/yyyy');
                    let weekDay = format(day, 'EEEE');
                    let dayNumber = format(day, 'd');
                    let hasDate = daysWithData.includes(formatedDay);

                    return (
                      <div 
                        key={day}
                        className={
                          isOutdated(day) ? 'calendar-day outdated' : 
                          selectedDay && formatedDay === format(selectedDay, 'dd/MM/yyyy') ? 'calendar-day selected' :
                          'calendar-day'
                        } 
                        onClick={() => { isOutdated(day) ? toggleDayBox(null) : toggleDayBox(day) }}
                      >
                        <div className='week-day'>{weekDay}</div>
                        <div className='day-number'>{dayNumber}</div>
                        <div className={
                          isOutdated(day) ? '' :
                          hasDate ? 'dot' : 
                          null
                        }
                        ></div>
                      </div>
                    )
                  })
                }
              </div>
              { showDayBox && <ViewBox swapData={swapData} selectedDay={selectedDay} daySwapData={daySwapData}  /> }
            </div>
          )})}
      </div>
    </>
  );
}