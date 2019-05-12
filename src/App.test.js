import React from "react";
import ReactDOM from "react-dom";
import App from "./useEffectReducer";
import { render, cleanup, waitForElement } from "react-testing-library";

it("testing hooks", () => {
  // Mount app, expect loading screen
  const { getByText, getByTestId } = render(<App />);
  expect(getByText("Loading...")).toMatchInlineSnapshot(`
    <h1>
      Loading...
    </h1>
  `);
  // After loading, expect title, newthing, buttons
  console.log('one');
  return waitForElement(() => {
    getByTestId('vacation-title');
  }).then(() => {
    console.log('two');
    expect(getByTextId('vacation-title')).toHaveTextContent('Paris');
  });
});
