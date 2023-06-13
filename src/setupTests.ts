// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import google from '../mock/google-maps-mock';
// Mock the matchMedia function
Object.defineProperty(window, 'matchMedia', {
    value: () => ({
      matches: false,
      addListener: () => {},
      removeListener: () => {},
    }),
  });
//   jest.mock('google-maps-api', () => google);