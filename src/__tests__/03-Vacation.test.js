import React from 'react';
import { render, cleanup } from '@testing-library/react';
import App from '../03-Vacation';
import { fetchData } from '../utils';

jest.mock('../utils');

const ERROR_TEXT = 'Error!';

afterEach(cleanup);

it('Loads vacation header', async () => {
  fetchData.mockResolvedValue([]);

  const { queryByText, findByTestId } = render(<App />);
  expect(queryByText('Loading...')).toBeTruthy();

  const title = await findByTestId('vacation-title');
  expect(title.textContent).toMatch('vacation');
});

it('displays error', async () => {
  fetchData.mockRejectedValue('Nope');

  const { queryByText, findByText } = render(<App />);
  expect(queryByText(ERROR_TEXT)).toBeFalsy();

  const error = await findByText(ERROR_TEXT);
  expect(error).toBeTruthy();
});