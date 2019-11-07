import React from 'react';
import { render, fireEvent, cleanup, wait } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import { act } from 'react-test-renderer';
import Counter from '../01-Counter';
import useFetch from '../useFetch';

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

describe('useFetch', () => {
  it('API', () => {
    const { result } = renderHook(useFetch);
    const { loading, error, query, handleChange, imageData } = result.current;
    expect(loading).toBe(true);
    expect(error).toBe(false);
    expect(query).toBe('Boston');
    expect(imageData).toBe(null);
    expect(typeof handleChange).toBe('function');
  });

  it('handleChange sets loading to true', () => {
    const { result, waitForNextUpdate } = renderHook(useFetch);
    const { loading, error, query, handleChange, imageData } = result.current;
    act(() => {
      handleChange({ target: { value: 'Rome' } });
    });
    expect(loading).toBe(true);
    expect(imageData).toBe(null);
    return waitForNextUpdate().then(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.imageData.hotlink).toBeTruthy();
      expect(result.current.imageData.src).toBeTruthy();
      expect(result.current.imageData.alt).toBeTruthy();
    });
  });
});
