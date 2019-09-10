import assert from 'assert';
import expect from 'expect';
import ENV from '../env';

describe('Authentication Route :REGISTER', () => {
  test('Should return false indicating that the current environment is not production', () => {
    expect(ENV.isProduction()).toBeFalsy();
  });
  test('Should return confirm the application\'s URL', () => {
    assert.ok(typeof ENV.appUrl() === 'string');
  });
});
