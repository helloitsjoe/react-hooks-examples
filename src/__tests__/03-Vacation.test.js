import React from 'react';
import { render, cleanup } from '@testing-library/react';
import App from '../03-Vacation';
import { fetchImage } from '../utils';

jest.mock('../utils');

const ERROR_TEXT = 'Error!';

afterEach(cleanup);

it('Loads vacation header defaulted to Rome', async () => {
  fetchImage.mockResolvedValue([]);

  const { queryByText, findByText } = render(<App />);
  expect(queryByText('Loading...')).toBeTruthy();

  expect(findByText('Rome')).toBeTruthy();
});

it('displays error', async () => {
  fetchImage.mockRejectedValue('Nope');

  const { queryByText, findByText } = render(<App />);
  expect(queryByText(ERROR_TEXT)).toBeFalsy();

  const error = await findByText(ERROR_TEXT);
  expect(error).toBeTruthy();
});
