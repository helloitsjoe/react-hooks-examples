import React from "react";
import ReactDOM from "react-dom";
import App from "./useEffectReducer";
import { fetchData } from './services';
import { render, cleanup, waitForElement } from "react-testing-library";

jest.mock('./services');

afterEach(cleanup);

it("Loads vacation header", async () => {
  fetchData.mockResolvedValue([]);
  
  const { getByText, getByTestId, container, debug } = render(<App />);
  expect(getByTestId("fallback").textContent).toBe('Loading...');

  await waitForElement(() => getByTestId('vacation-title'))
  expect(getByTestId('vacation-title').textContent).toMatch('vacation');
});

it('displays error', async () => {
  fetchData.mockRejectedValue('Nope');

  const { getByText, getByTestId } = render(<App />);

  await waitForElement(() => getByTestId('fallback'))
  expect(getByTestId('fallback').textContent).toMatch('Error');
});
