import React, { useState, useEffect } from 'react';
import { format, addMonths, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns';
import DayBox from '../DayBox/DayBox';
import './Calendar.css';

const Calendar = () => {
  
  // Update Date every minute
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDate(new Date());
    }, 60000);

    return () => clearInterval(intervalId);
  }, []);

  // Display Months & Days 
  const [currentDate, setCurrentDate] = useState(new Date());
  const currentMonth = startOfMonth(currentDate);
  const months = [currentMonth];
  for (let i = 1; i < 2; i++) {months.push(startOfMonth(addMonths(currentMonth, i)))};

  // DayBox Toggle
  const [selectedDay, setSelectedDay] = useState(null);
  const handleDayToggle = (day) => { 
    setSelectedDay(
      prevSelectedDay => (prevSelectedDay && prevSelectedDay.getTime() === day.getTime() ? null : day)
      )
  };

  return (
    <>
    <div className="calendar">
      {months.map((month) => (
        <div key={month} className="calendar-month">
          <h3>{format(month, 'MMMM yyyy')}</h3>
          <div className="calendar">
            {eachDayOfInterval({ start: startOfMonth(month), end: endOfMonth(month) }).map((day) => (
              <div key={day} className={`calendar-day ${selectedDay === day ? 'selected' : ''}`} onClick={() => handleDayToggle(day)}>
                {format(day, 'd')}
              </div>
            ))}
          </div>
          {selectedDay && format(month, 'MMMM yyyy') === format(selectedDay, 'MMMM yyyy') && (
            <DayBox selectedDay={selectedDay} />
          )}
        </div>
      ))}
    </div>
    </>
  );
}

export default Calendar;