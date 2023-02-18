import { BadResetCodeError } from './bad-reset-code.error';

describe('BadResetCodeError', () => {
  it('should be a function', () => {
    expect(typeof BadResetCodeError).toBe('function');
  });
  it('should be an instanceof BadResetCodeError', () => {
    const error = new BadResetCodeError();
    expect(error).toBeInstanceOf(BadResetCodeError);
  });
  it('should be an instanceof Error', () => {
    const error = new BadResetCodeError();
    expect(error).toBeInstanceOf(Error);
  });
  it('should have a default message and a code property', () => {
    const error = new BadResetCodeError();
    expect(error.message).toBe('Bad reset code');
    expect(BadResetCodeError.code).toBe('BAD_RESET_CODE_ERROR');
  });
  it('should set a message', () => {
    const error = new BadResetCodeError('foo');
    expect(error.message).toBe('foo');
  });
});
