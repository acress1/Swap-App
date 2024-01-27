import { render, screen } from '@testing-library/react';
import App from './App';

test('First test', () => {
  render(<App />);

  const firstTest = screen.getByText(/Hi there! Today is/);
  expect(firstTest).toBeInTheDocument();
});

test('Should render current & next month', () => {
  const todayDate = new Date();
  const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const currentMonth = months[todayDate.getMonth()];
  const nextMonth = months[todayDate.getMonth()+1];
  
  expect(currentMonth && nextMonth).toBe(`${currentMonth}` && `${nextMonth}`);
});