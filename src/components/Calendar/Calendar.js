import React, { useState, useEffect } from 'react';
import { format, addMonths, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns';
import QuickViewBox from '../QuickViewBox/QuickViewBox';
import DayBox from '../DayBox/DayBox';
import './Calendar.css';

const Calendar = ({ BASEURL, isOutdated, showQuickView, handleQuickViewClick, selectedDay, toggleSelectedDay }) => {
  
  // Display Months & Days 
  const [currentDate, setCurrentDate] = useState(new Date());
  const currentMonth = startOfMonth(currentDate);
  const months = [currentMonth];
  for (let i = 1; i < 2; i++) {months.push(startOfMonth(addMonths(currentMonth, i)))};

  // Fetch Days with Data
  const [daysWithData, setDaysWithData] = useState([]);

  const propertyToFilter = ['Inbound','Outbound','Position','Email','Sent','Date','Note', 'Early', 'Late', 'LTA', 'DO'];

  useEffect(() => {

    fetch(`${BASEURL}/dbData`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch Calendar Data');
      }
      return response.json()
    })
    .then(data => {
      const sortedData= data.data
      .map(item => item.Date);

      setDaysWithData(sortedData)
    })
    .catch(error => console.error('Error fetching days with data:', error))
  }, [BASEURL])
  
  // Update Date every minute
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDate(new Date());
    }, 60000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <div className='calendar'>
        <button className='quick-view' onClick={handleQuickViewClick}>Quick view</button>
          { showQuickView && <QuickViewBox BASEURL={BASEURL} propertyToFilter={propertyToFilter} /> }
          { months.map( month => (
            <div key={month}>
              <div>{ format( month, 'MMMM yyyy') }</div>
              <div className="calendar-month">
                { eachDayOfInterval({ start: startOfMonth(month), end: endOfMonth(month) })
                  .map(day => (
                    <div 
                      key={day}
                      className={`calendar-day
                        ${selectedDay && format(day, 'dd/MM/yyyy') === format(selectedDay, 'dd/MM/yyyy') ? 'calendar-day-selected' : ''}
                        ${isOutdated(day) ? 'outdated-day' : ''}
                        `} 
                      onClick={() => {
                        isOutdated(day) ? toggleSelectedDay(null) : toggleSelectedDay(day)
                      }}
                    >
                      <div className='day-full'>{format(day, 'EEEE')}</div>
                      <div className='day-number'>{format(day, 'd')}</div>
                      <div className={`${daysWithData.includes(format(day, 'dd/MM/yyyy')) === true ? 'dot' : ''}`}></div>
                    </div>
                    )
                  )
                }
              </div>
          { selectedDay && format(month, 'MMMM yyyy') === format(selectedDay, 'MMMM yyyy') && (
            <DayBox selectedDay={selectedDay} BASEURL={BASEURL} propertyToFilter={propertyToFilter} />
            )
          }
            </div>
          ))}
      </div>
    </>
  );
}

export default Calendar;