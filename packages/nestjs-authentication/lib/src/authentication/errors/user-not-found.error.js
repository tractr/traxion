"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserNotFoundError = void 0;
class UserNotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = 'UserNotFoundError';
        this.message = message || UserNotFoundError.message;
    }
}
exports.UserNotFoundError = UserNotFoundError;
UserNotFoundError.message = 'User not found';
UserNotFoundError.code = 'USER_NOT_FOUND_ERROR';
//# sourceMappingURL=user-not-found.error.js.map