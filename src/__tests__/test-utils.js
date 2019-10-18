export function getProps(spy) {
  const lastCallIndex = spy.mock.calls.length - 1;
  const [props] = spy.mock.calls[lastCallIndex];
  return props;
}

function isClass(maybe) {
  return typeof maybe === 'function' && maybe.toString().includes('class');
}

// Note: this is not actually needed. See ShallowTest.jest.js
export function moduleSpy(pathFromTestFile) {
  const module = jest.requireActual(pathFromTestFile);

  // Create a new exports object (including default) that spies on all exports
  return Object.entries(module).reduce(
    (spies, [realName, realValue]) => {
      // Create a spy for each export, transfering static properties
      const spyWithStatics = Object.entries(realValue).reduce(
        (spy, [staticKey, staticValue]) => {
          spy[staticKey] = staticValue;
          return spy;
        },
        // TODO: How to spyOn classes?
        jest.fn(realValue)
      );

      spies[realName] = spyWithStatics;
      return spies;
    },
    { __esModule: true }
  );
}
