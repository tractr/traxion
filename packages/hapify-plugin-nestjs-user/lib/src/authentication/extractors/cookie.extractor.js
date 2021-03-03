"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fromHttpOnlySignedAndSecureCookies = void 0;
const hapify_plugin_nestjs_core_1 = require("@tractr/hapify-plugin-nestjs-core");
function fromHttpOnlySignedAndSecureCookies(cookieName) {
    const searchCookieFromKey = hapify_plugin_nestjs_core_1.isDevelopment() ? 'cookies' : 'signedCookies';
    return (req) => {
        if (req &&
            req[searchCookieFromKey] &&
            req[searchCookieFromKey][cookieName]) {
            return req[searchCookieFromKey][cookieName].token;
        }
        return null;
    };
}
exports.fromHttpOnlySignedAndSecureCookies = fromHttpOnlySignedAndSecureCookies;
//# sourceMappingURL=cookie.extractor.js.map