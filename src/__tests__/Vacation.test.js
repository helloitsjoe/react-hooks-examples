import React from 'react';
import { render, cleanup, waitForElement } from 'react-testing-library';
import App from '../03-Vacation';
import { fetchData } from '../utils';

jest.mock('../utils');

afterEach(cleanup);

it('Loads vacation header', async () => {
  fetchData.mockResolvedValue([]);

  const { getByTestId } = render(<App />);
  expect(getByTestId('fallback').textContent).toBe('Loading...');

  await waitForElement(() => getByTestId('vacation-title'));
  expect(getByTestId('vacation-title').textContent).toMatch('vacation');
});

it('displays error', async () => {
  fetchData.mockRejectedValue('Nope');

  const { getByTestId } = render(<App />);

  await waitForElement(() => getByTestId('fallback'));
  expect(getByTestId('fallback').textContent).toMatch('Error');
});
