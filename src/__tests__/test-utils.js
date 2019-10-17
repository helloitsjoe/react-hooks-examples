export function getProps(spy) {
  const lastCallIndex = spy.mock.calls.length - 1;
  const [props] = spy.mock.calls[lastCallIndex];
  return props;
}

export function moduleSpy(pathFromTestFile) {
  const module = jest.requireActual(pathFromTestFile);

  // Create a new exports object (including default) that spies on all exports
  const moduleExportSpies = Object.entries(module).reduce(
    (exportSpies, [exportName, exportValue]) => {
      // Create a spy for each export, transfering static properties
      const exportSpyWithStatics = Object.entries(exportValue).reduce(
        (exportSpy, [staticKey, staticValue]) => {
          exportSpy[staticKey] = staticValue;
          return exportSpy;
        },
        jest.fn().mockImplementation(exportValue)
      );

      // eslint-disable-next-line no-param-reassign
      exportSpies[exportName] = exportSpyWithStatics;

      return exportSpies;
    },
    {}
  );

  return { __esModule: true, ...moduleExportSpies };
}
