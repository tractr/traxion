export class BadResetCodeError extends Error {
  static message = 'Bad reset code';

  static code = 'BAD_RESET_CODE_ERROR';

  constructor(message?: string) {
    super(message);
    this.name = 'BadResetCodeError';
    this.message = message || BadResetCodeError.message;
  }
}
