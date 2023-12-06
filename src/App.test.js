import { render, screen } from '@testing-library/react';
import App from './App';

test('renders birthday message', () => {
  render(<App />);
  const linkElement = screen.getByText(/Birthday message goes here/i);
  expect(linkElement).toBeInTheDocument();
});
