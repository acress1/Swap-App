import { render, screen } from '@testing-library/react';
import App from './App';

test('First test', () => {
  render(<App />);
  const firstTest = screen.getByText(/Hi there! Today is/);
  expect(firstTest).toBeInTheDocument();
});
