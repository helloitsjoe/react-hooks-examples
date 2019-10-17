import { moduleSpy } from './__tests__/test-utils';

global.moduleSpy = moduleSpy;

const silenceActWarnings = log => (message, ...args) => {
  if (/act(...)/.test(message)) return;
  return log(message, ...args);
};

console.error = silenceActWarnings(console.error);
