export class UserNotFoundError extends Error {
  static message = 'User not found';

  static code = 'USER_NOT_FOUND_ERROR';

  constructor(message?: string) {
    super(message);
    this.name = 'UserNotFoundError';
    this.message = message || UserNotFoundError.message;
  }
}
