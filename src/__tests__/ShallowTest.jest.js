import React from 'react';
import { render } from '@testing-library/react';
import ComponentThree, { ComponentOne, ComponentTwo } from '../ShallowTest';
import { getProps } from './test-utils';

jest.mock('../ShallowTest', () =>
  global.componentSpy('../ShallowTest', ['ComponentOne', 'ComponentTwo'])
);

describe('Testing componentSpy', () => {
  const Test2 = () => (
    <div>
      <ComponentOne greeting="Hello" />
      <ComponentTwo greeting="Hi" />
      {/* <ComponentThree greeting="Hey" /> */}
    </div>
  );

  it('multiple named exports', () => {
    const { queryByText } = render(<Test2 />);
    expect(queryByText('Hello')).toBeTruthy();
    expect(queryByText('Hi')).toBeTruthy();
    // expect(queryByText('Hey')).toBeTruthy();
    expect(getProps(ComponentOne).greeting).toBe('Hello');
    expect(getProps(ComponentTwo).greeting).toBe('Hi');
    // expect(getProps(ComponentThree).greeting).toBe('Hey');
  });
});
