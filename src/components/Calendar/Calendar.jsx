import React, { useState, useEffect } from 'react';
import { format, addMonths, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns';
import QuickViewBox from '../ViewBoxes/QuickViewBox';
import DayBox from '../ViewBoxes/DayBox';
import './Calendar.scss';

export default function Calendar ({ BASEURL, Categories, searchField, isOutdated, showQuickView, showDayBox, toggleQuickViewBox, selectedDay, toggleDayBox }) {
  
  // Display Months & Days 
  const [currentDate, setCurrentDate] = useState(new Date());
  const currentMonth = startOfMonth(currentDate);
  const months = [currentMonth];
  for (let i = 1; i < 2; i++) {months.push(startOfMonth(addMonths(currentMonth, i)))};

  // Fetch Days with Data
  const [daysWithData, setDaysWithData] = useState([]);

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
        <button className='overview-button' onClick={toggleQuickViewBox}>Overview</button>
          { showQuickView && <QuickViewBox BASEURL={BASEURL} Categories={Categories} searchField={searchField} selectedDay={selectedDay} /> }
          { months.map( month => (
            <div key={month}>
              <div style={{margin: '5px'}}>{ format( month, 'MMMM yyyy') }</div>
              <div className="calendar-month">
                { eachDayOfInterval({ start: startOfMonth(month), end: endOfMonth(month) })
                  .map(day => {
                    
                    return (
                      <div 
                        key={day}
                        className={`${isOutdated(day) ? 'calendar-day outdated' : (selectedDay && format(day, 'dd/MM/yyyy') === format(selectedDay, 'dd/MM/yyyy') ? 'calendar-day selected' : 'calendar-day')}`} 
                        onClick={() => { isOutdated(day) ? toggleDayBox(null) : toggleDayBox(day) }}
                      >
                        <div className='week-day'>{format(day, 'EEEE')}</div>
                        <div className='day-number'>{format(day, 'd')}</div>
                        <div className={`${isOutdated(day) ? '' : (daysWithData.includes(format(day, 'dd/MM/yyyy')) === true ? 'dot' : '')}`}></div>
                      </div>
                    )
                  }
                  )
                }
              </div>
              { showDayBox && <DayBox BASEURL={BASEURL} Categories={Categories} selectedDay={selectedDay} searchField={searchField} /> }
            </div>
          ))}
      </div>
    </>
  );
}