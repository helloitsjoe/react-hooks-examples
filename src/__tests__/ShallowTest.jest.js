import React from 'react';
import { render, cleanup } from '@testing-library/react';
import DefaultComponent, { ComponentTwo, ComponentThree, nonComponentFunc } from '../ShallowTest';
import { getProps } from './test-utils';

jest.mock('../ShallowTest', () => {
  const realExports = jest.requireActual('../ShallowTest');

  return {
    __esModule: true,
    default: jest.fn(realExports.default),
    ComponentTwo: jest.fn(realExports.ComponentTwo),
    ComponentThree: jest.fn(realExports.ComponentThree),
  };
});

const TestDefault = () => (
  <div>
    <DefaultComponent greeting="Hey" />
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
    <DefaultComponent greeting="Hey" />
    <ComponentTwo greeting="Hello" />
    <ComponentThree greeting="Hi" />
  </div>
);

afterEach(cleanup);

describe('Named and default variations', () => {
  it('default export', () => {
    const { queryByText } = render(<TestDefault />);
    expect(queryByText('Hey')).toBeTruthy();
    expect(getProps(DefaultComponent).greeting).toBe('Hey');
  });

  it('single named export', () => {
    const { queryByText } = render(<TestNamedSingle />);
    expect(queryByText('Hello')).toBeTruthy();
    expect(getProps(ComponentTwo).greeting).toBe('Hello');
  });

  it('multiple named exports', () => {
    const { queryByText } = render(<TestNamedMultiple />);
    expect(queryByText('Hello')).toBeTruthy();
    expect(queryByText('Hi, you!')).toBeTruthy();
    expect(getProps(ComponentTwo).greeting).toBe('Hello');
    expect(getProps(ComponentThree).greeting).toBe('Hi');
  });

  it('default and named exports', () => {
    const { queryByText } = render(<TestDefaultAndNamed />);
    expect(queryByText('Hey')).toBeTruthy();
    expect(queryByText('Hello')).toBeTruthy();
    expect(getProps(DefaultComponent).greeting).toBe('Hey');
    expect(getProps(ComponentTwo).greeting).toBe('Hello');
    expect(getProps(ComponentThree).greeting).toBe('Hi');
  });
});

describe('Spies have all functionality', () => {
  xit('includes static properties', () => {
    const { queryByText } = render(<TestDefault />);
    expect(queryByText('Hey')).toBeTruthy();
    expect(DefaultComponent.someStatic).toBe('test');
  });

  it('works with multiple props', () => {
    const { queryByText } = render(<ComponentThree greeting="Hullo" name="Joe" />);
    expect(queryByText('Hullo, Joe!')).toBeTruthy();
    expect(getProps(ComponentThree).greeting).toBe('Hullo');
    expect(getProps(ComponentThree).name).toBe('Joe');
  });

  xit('also mocks non-component exports', () => {
    expect(nonComponentFunc('Oh hay')).toBe('Oh hay I work too');
    expect(nonComponentFunc).toBeCalledWith('Oh hay');
  });
});
