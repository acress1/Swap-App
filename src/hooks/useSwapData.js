import { useState, useEffect } from "react";
import { format } from 'date-fns';

const useSwapData = (BASEURL) => {

  const [swapData, setSwapData] = useState([]);
  const [daysWithData, setDaysWithData] = useState([]);
  const [daySwapData, setDaySwapData] = useState([]);

  useEffect(() => {
    fetch(`${BASEURL}/dbData`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch Calendar Data');
      }
      return response.json();
    })
    .then(data => {
      const daysWithData = data.data.map(item => item.Date);
      setDaysWithData(daysWithData);
      setSwapData(data.data);
    })
    .catch(error => {
      console.error('Error fetching calendar data:', error);
    });
  }, [BASEURL]);

  const getDaySwapData = (selectedDay) => {
    const formatedSelectedDay = selectedDay ? format(selectedDay, 'dd/MM/yyyy') : null;
    const daySwapData = swapData.filter(item => item.Date === formatedSelectedDay);
    setDaySwapData(daySwapData);
  };

  return { swapData, daysWithData, daySwapData, getDaySwapData };
};

export default useSwapData;