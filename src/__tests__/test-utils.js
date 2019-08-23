import React from 'react';

export function getProps(spy) {
  const lastCallIndex = spy.mock.calls.length - 1;
  const [props] = spy.mock.calls[lastCallIndex];
  return props;
}

export function componentSpy(pathFromTestsFolder, namedOrDefault = 'default') {
  const module = jest.requireActual(pathFromTestsFolder);

  // Coerce to array
  const moduleExports = [].concat(namedOrDefault);

  const mockComponents = moduleExports.reduce((mocks, exportName) => {
    const RealComponent = module[exportName];
    const MockComponent = jest.fn(props => <RealComponent {...props} />);

    // Add statics to MockComponent
    Object.entries(RealComponent).forEach(([key, value]) => {
      MockComponent[key] = value;
    });

    // eslint-disable-next-line no-param-reassign
    mocks[exportName] = MockComponent;

    return mocks;
  }, {});

  // TODO: Handle named and default in the same file
  const isNamed = namedOrDefault !== 'default';
  return isNamed ? { ...module, ...mockComponents } : mockComponents.default;
}
