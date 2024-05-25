import { render, screen } from '@testing-library/react';
import { React } from 'react';
import App from './App';

it('Should greet the user', () => {
  render(<App />);

  const firstTest = screen.getByText(/Hi there! Today is/);
  expect(firstTest).toBeInTheDocument();
});

describe('Calendar.js', () => {

  const todayDate = new Date();
  const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const currentMonth = months[todayDate.getMonth()];
  const nextMonth = months[(todayDate.getMonth()+1) % 12];
  const renderedMonths = [currentMonth, nextMonth];

  it('Should render current & next month', () => {
    expect(renderedMonths).toHaveLength(2);
    expect(renderedMonths[0]).toBe(currentMonth);
    expect(renderedMonths[1]).toBe(nextMonth);
  });
});