import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import Counter from '../01-Counter';

afterEach(cleanup);

describe('Counter', () => {
  it('increments/decrements', () => {
    const { getByText, getByTestId } = render(<Counter />);
    expect(getByTestId('count').textContent).toBe('0');
    fireEvent.click(getByText('+'));
    expect(getByTestId('count').textContent).toBe('1');
    fireEvent.click(getByText('-'));
    expect(getByTestId('count').textContent).toBe('0');
  });
});
