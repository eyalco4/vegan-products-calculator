import React from 'react';
import { render, screen } from '@testing-library/react';
import Landing from './Landing';

test('renders learn react link', () => {
  render(<Landing user={undefined} setPage={jest.fn} />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
