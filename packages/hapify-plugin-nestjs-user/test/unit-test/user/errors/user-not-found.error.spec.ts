import { UserNotFoundError } from '../../../../src/user/common/errors/user-not-found.error';

describe('UserNotFoundError', () => {
  it('should be a function', () => {
    expect(typeof UserNotFoundError).toBe('function');
  });
  it('should be an instanceof UserNotFoundError', () => {
    const error = new UserNotFoundError();
    expect(error).toBeInstanceOf(UserNotFoundError);
  });
  it('should be an instanceof Error', () => {
    const error = new UserNotFoundError();
    expect(error).toBeInstanceOf(Error);
  });
  it('should have a default message and a code property', () => {
    const error = new UserNotFoundError();
    expect(error.message).toBe('User not found');
    expect(UserNotFoundError.code).toBe('USER_NOT_FOUND_ERROR');
  });
  it('should set a message', () => {
    const error = new UserNotFoundError('foo');
    expect(error.message).toBe('foo');
  });
});
