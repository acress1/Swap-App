import React, { useState, useEffect } from 'react';
import { format, addMonths, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns';
import DayBox from '../DayBox/DayBox';
import './Calendar.css';

const Calendar = () => {
  // Display Months & Days 
  const [currentDate, setCurrentDate] = useState(new Date());
  const currentMonth = startOfMonth(currentDate);
  const months = [currentMonth];
  for (let i = 1; i < 2; i++) {months.push(startOfMonth(addMonths(currentMonth, i)))};

  // Toggle Daybox.js
  const [selectedDay, setSelectedDay] = useState(null);
  const toggleSelectedDay = (day) => { 
    setSelectedDay(prevSelectedDay => (prevSelectedDay && prevSelectedDay.getTime() === day.getTime() ? null : day))
  };

  //Fetch Days with Data
  const [daysWithData, setDaysWithData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/daysWithData')
      .then(response => response.json())
      .then(data => setDaysWithData(data.daysWithData))
      .catch(error => console.error('Error fetching days with data:', error));
  })

  const isOutdated = (day) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return day < today;
  };
  
  // Update Date every minute
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDate(new Date());
    }, 60000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      { months.map( month => (
        <div key={month} className="calendar-month">
          <h3 className='calendar'>{ format( month, 'MMMM yyyy') }</h3>
          <div className="calendar">
            {eachDayOfInterval({ start: startOfMonth(month), end: endOfMonth(month) }).map(day => (
              <div 
                key={day}
                className={`calendar-day
                  ${selectedDay && format(day, 'MMMM dd yyyy') === format(selectedDay, 'MMMM dd yyyy') ? 'calendar-day-selected' : ''}
                  ${isOutdated(day) ? 'outdated-day' : ''}
                  `} 
                onClick={() => {
                  isOutdated(day) ? toggleSelectedDay(null) : toggleSelectedDay(day)
                }}
              >
                {format(day, 'd')}
                <div className={`${daysWithData.includes(format(day, 'dd/MM/yyyy')) === true ? 'dot' : ''}`}></div>
              </div>
            ))}
          </div>
          {selectedDay && format(month, 'MMMM yyyy') === format(selectedDay, 'MMMM yyyy') && (
            <DayBox selectedDay={selectedDay} />
          )}
        </div>
      ))}
    </div>
  );
}

export default Calendar;