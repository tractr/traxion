export class BadPasswordError extends Error {
  static message = 'Bad password';

  static code = 'BAD_PASSWORD_ERROR';

  constructor(message?: string) {
    super(message);
    this.name = 'BadPasswordError';
    this.message = message || BadPasswordError.message;
  }
}
