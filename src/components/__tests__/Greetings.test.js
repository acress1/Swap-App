import Greetings from "components/Greetings";
import { render, screen } from '@testing-library/react';
import { todayDate } from "utils/functions.js";

describe('Greetings.js', () => {

  render(<Greetings todayDate={todayDate} />);

    it('Should greet the user', () => {
      const greetings = screen.getByText(/Hi/);
      expect(greetings).toBeInTheDocument();
    });

    it('Should display today\'s date', () => {
      expect(todayDate).toBeDefined();
    });

    it('Should display the App logo', () => {
    
    });

    it('Should contain Last Update button', () => {

    });
});