"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadPasswordError = void 0;
class BadPasswordError extends Error {
    constructor(message) {
        super(message);
        this.name = 'BadPasswordError';
        this.message = message || BadPasswordError.message;
    }
}
exports.BadPasswordError = BadPasswordError;
BadPasswordError.message = 'Bad password';
BadPasswordError.code = 'BAD_PASSWORD_ERROR';
//# sourceMappingURL=bad-password.error.js.map