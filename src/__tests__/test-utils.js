export function getProps(spy, selector = 0) {
  // const lastCallIndex = spy.mock.calls.length - 1;
  if (typeof selector === 'number') {
    const [props] = spy.mock.calls[selector];
    return props;
  }

  const matchingCall = spy.mock.calls.find(call => {
    const [key, value] =
      typeof selector === 'string'
        ? selector.replace(/[[\]"]/g, '').split('=')
        : Object.entries(selector)[0];
    return call[0][key] === value;
  });

  if (!matchingCall) return;

  const [props] = matchingCall;
  return props;
}

function isClass(Component) {
  return !!new Component({}).isReactComponent;
}

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
        // TODO: This works to spy on class components, but feels janky. Is there a better way?
        isClass(realValue) ? jest.fn(() => new realValue()) : jest.fn(realValue)
      );
      spies[realName] = spyWithStatics;
      return spies;
    },
    { __esModule: true }
  );
}
