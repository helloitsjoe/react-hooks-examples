import React from 'react';
import { render, cleanup } from '@testing-library/react';
import DefaultComponent, {
  ComponentTwo,
  ComponentThree,
  ClassComponent,
  nonComponentFunc,
} from '../ShallowTest';
import { getProps } from './test-utils';

jest.mock('../ShallowTest', () => global.moduleSpy('../ShallowTest'));

// jest.mock('../ShallowTest', () => {
//   const realExports = jest.requireActual('../ShallowTest');

//   return {
//     __esModule: true,
//     default: jest.fn(realExports.default),
//     ComponentTwo: jest.fn(realExports.ComponentTwo),
//     ComponentThree: jest.fn(realExports.ComponentThree),
//     nonComponentFunc: jest.fn(realExports.nonComponentFunc)
//   };
// });

const TestDefault = () => (
  <div>
    <DefaultComponent greeting="Hey" />
  </div>
);
const TestDouble = () => (
  <div>
    <DefaultComponent data-testid="first" greeting="Hey" />
    <DefaultComponent data-testid="second" greeting="Hiya" />
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
const TestClass = () => (
  <div>
    <ClassComponent greeting="Aloha" />
  </div>
);

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

describe('getProps', () => {
  it('gets prop for a single function component', () => {
    const { queryByText } = render(<TestDefault />);
    expect(getProps(DefaultComponent).greeting).toBe('Hey');
  });

  it('gets prop for multiple of the same function component', () => {
    const { queryByText } = render(<TestDouble />);
    expect(getProps(DefaultComponent, 0).greeting).toBe('Hey');
    expect(getProps(DefaultComponent, 1).greeting).toBe('Hiya');
  });

  it('finds by testid', () => {
    const { queryByText } = render(<TestDouble />);
    const firstProps = getProps(DefaultComponent, { 'data-testid': 'first' });
    const secondProps = getProps(DefaultComponent, { 'data-testid': 'second' });
    expect(firstProps.greeting).toBe('Hey');
    expect(secondProps.greeting).toBe('Hiya');
  });
});

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
  it('includes static properties', () => {
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

  it('also mocks non-component exports', () => {
    expect(nonComponentFunc('Oh hay')).toBe('Oh hay I work too');
    expect(nonComponentFunc).toBeCalledWith('Oh hay');
  });

  xit('works with classes', () => {
    const { queryByText } = render(<TestClass />);
    expect(queryByText('Aloha')).toBeTruthy();
    expect(getProps(ClassComponent).greeting).toBe('Hey');
  });
});
