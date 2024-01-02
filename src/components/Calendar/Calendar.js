import React, { useState, useEffect } from 'react';
import { format, addMonths, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns';
import QuickViewBox from '../QuickViewBox/QuickViewBox';
import DayBox from '../DayBox/DayBox';
import './Calendar.css';

const Calendar = ({ BASEURL, isOutdated, handleSubmit }) => {

  const propertyToFilter = ['Inbound','Outbound','Position','Email','Sent','Date','Note'];
  
  // Display Months & Days 
  const [currentDate, setCurrentDate] = useState(new Date());
  const currentMonth = startOfMonth(currentDate);
  const months = [currentMonth];
  for (let i = 1; i < 2; i++) {months.push(startOfMonth(addMonths(currentMonth, i)))};

  // Toggle QuickViewBox.js
  const [showQuickView, setShowQuickView] = useState(false);
  const handleQuickViewClick = () => {
    setShowQuickView(!showQuickView);
  };

  // Toggle Daybox.js
  const [selectedDay, setSelectedDay] = useState(null);
  const toggleSelectedDay = (day) => { 
    setSelectedDay(prevSelectedDay => (prevSelectedDay && prevSelectedDay.getTime() === day.getTime() ? null : day));
  };

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
  }, [BASEURL, handleSubmit])
  
  // Update Date every minute
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDate(new Date());
    }, 60000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <button className='quick-view' onClick={handleQuickViewClick}>Quick view</button>
      {showQuickView && <QuickViewBox BASEURL={BASEURL} propertyToFilter={propertyToFilter} />}
      <div>
        { months.map( month => (
          <div key={month} className="calendar">
            <h3 className='calendar-month'>{ format( month, 'MMMM yyyy') }</h3>
            <div className="calendar-month">
              {eachDayOfInterval({ start: startOfMonth(month), end: endOfMonth(month) }).map(day => (
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
                  {format(day, 'd')}
                  <div className={`${daysWithData.includes(format(day, 'dd/MM/yyyy')) === true ? 'dot' : ''}`}></div>
                </div>
              ))}
            </div>
            {selectedDay && format(month, 'MMMM yyyy') === format(selectedDay, 'MMMM yyyy') && (
              <DayBox selectedDay={selectedDay} BASEURL={BASEURL} propertyToFilter={propertyToFilter} />
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default Calendar;