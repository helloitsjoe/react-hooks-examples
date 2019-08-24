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

  it('increments/decrements step', () => {
    const { getByText, getByTestId } = render(<Counter />);
    const currentStep = getByText('Current step:', { exact: false });
    expect(currentStep.textContent).toMatch('1');
    fireEvent.click(getByText('Step +'));
    expect(currentStep.textContent).toMatch('2');
    fireEvent.click(getByText('+'));
    expect(getByTestId('count').textContent).toBe('2');
    fireEvent.click(getByText('Step -'));
    expect(currentStep.textContent).toMatch('1');
    fireEvent.click(getByText('+'));
    expect(getByTestId('count').textContent).toBe('3');
  });
});
