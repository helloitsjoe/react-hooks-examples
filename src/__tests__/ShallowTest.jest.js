import React from 'react';
import { render } from '@testing-library/react';
import ComponentOne, { ComponentTwo, ComponentThree } from '../ShallowTest';
import { getProps } from './test-utils';

// Default export
jest.mock('../ShallowTest', () => global.componentSpy('../ShallowTest'));

// // Single named
// jest.mock('../ShallowTest', () => global.componentSpy('../ShallowTest', 'ComponentTwo'));

// // Multiple named
// jest.mock('../ShallowTest', () =>
//   global.componentSpy('../ShallowTest', ['ComponentTwo', 'ComponentThree'])
// );

describe('Testing componentSpy', () => {
  const TestDefault = () => (
    <div>
      <ComponentOne greeting="Hey" />
    </div>
  );
  const TestNamedSingle = () => (
    <div>
      <ComponentTwo greeting="Hello" />
    </div>
  );
  const TestNamedMultiple = () => (
    <div>
      <ComponentTwo greeting="Hello" />
      <ComponentThree greeting="Hi" />
    </div>
  );

  const TestDefaultAndNamed = () => (
    <div>
      <ComponentOne greeting="Hey" />
      <ComponentTwo greeting="Hello" />
    </div>
  );

  fit('default export', () => {
    const { queryByText } = render(<TestDefault />);
    expect(queryByText('Hey')).toBeTruthy();
    expect(getProps(ComponentOne).greeting).toBe('Hey');
  });

  it('single named export', () => {
    const { queryByText } = render(<TestNamedSingle />);
    expect(queryByText('Hello')).toBeTruthy();
    expect(getProps(ComponentOne).greeting).toBe('Hello');
  });

  it('multiple named exports', () => {
    const { queryByText } = render(<TestNamedMultiple />);
    expect(queryByText('Hello')).toBeTruthy();
    expect(queryByText('Hi')).toBeTruthy();
    expect(getProps(ComponentOne).greeting).toBe('Hello');
    expect(getProps(ComponentTwo).greeting).toBe('Hi');
  });

  it('default and named exports', () => {
    const { queryByText } = render(<TestDefaultAndNamed />);
    expect(queryByText('Hey')).toBeTruthy();
    expect(queryByText('Hello')).toBeTruthy();
    expect(getProps(ComponentThree).greeting).toBe('Hey');
    expect(getProps(ComponentOne).greeting).toBe('Hello');
  });
});
