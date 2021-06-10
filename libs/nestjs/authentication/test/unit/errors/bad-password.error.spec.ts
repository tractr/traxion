import { BadPasswordError } from '../../../src/errors/bad-password.error';

describe('BadPasswordError', () => {
  it('should be a function', () => {
    expect(typeof BadPasswordError).toBe('function');
  });
  it('should be an instanceof BadPasswordError', () => {
    const error = new BadPasswordError();
    expect(error).toBeInstanceOf(BadPasswordError);
  });
  it('should be an instanceof Error', () => {
    const error = new BadPasswordError();
    expect(error).toBeInstanceOf(Error);
  });
  it('should have a default message and a code property', () => {
    const error = new BadPasswordError();
    expect(error.message).toBe('Bad password');
    expect(BadPasswordError.code).toBe('BAD_PASSWORD_ERROR');
  });
  it('should set a message', () => {
    const error = new BadPasswordError('foo');
    expect(error.message).toBe('foo');
  });
});
