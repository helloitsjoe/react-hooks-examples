import { componentSpy } from './__tests__/test-utils';

global.componentSpy = componentSpy;

const silenceActWarnings = log => (message, ...args) => {
  if (/act(...)/.test(message)) return;
  return log(message, ...args);
};

console.error = silenceActWarnings(console.error);
