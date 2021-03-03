"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationModuleOptionsFactory = exports.AUTHENTICATION_OPTIONS = exports.AUTHENTICATION_QUERY_PARAM_NAME = exports.AUTHENTICATION_COOKIE_NAME = void 0;
const common_1 = require("@nestjs/common");
const hapify_plugin_nestjs_core_1 = require("@tractr/hapify-plugin-nestjs-core");
const passport_jwt_1 = require("passport-jwt");
const extractors_1 = require("../extractors");
const { TRACTR_AUTH_STRATEGY_JWT_SECRET } = process.env;
exports.AUTHENTICATION_COOKIE_NAME = 'authCookie';
exports.AUTHENTICATION_QUERY_PARAM_NAME = 'authToken';
exports.AUTHENTICATION_OPTIONS = {
    login: {
        saltRounds: 20,
    },
    cookies: {
        cookieName: exports.AUTHENTICATION_COOKIE_NAME,
        queryParamName: 'authToken',
    },
    strategy: {
        jwt: {
            ignoreExpiration: false,
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromExtractors([
                extractors_1.fromHttpOnlySignedAndSecureCookies(exports.AUTHENTICATION_COOKIE_NAME),
                passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
                passport_jwt_1.ExtractJwt.fromUrlQueryParameter(exports.AUTHENTICATION_QUERY_PARAM_NAME),
            ]),
        },
        local: {
            passReqToCallback: true,
            usernameField: 'email',
            passwordField: 'password',
        },
    },
    jwtModuleOptions: {
        secret: (TRACTR_AUTH_STRATEGY_JWT_SECRET !== null && TRACTR_AUTH_STRATEGY_JWT_SECRET !== void 0 ? TRACTR_AUTH_STRATEGY_JWT_SECRET : hapify_plugin_nestjs_core_1.isDevelopment()) ? 'secret' : undefined,
    },
    passportModuleOptions: {
        defaultStrategy: 'jwt',
    },
};
let AuthenticationModuleOptionsFactory = class AuthenticationModuleOptionsFactory {
    createOptions() {
        return exports.AUTHENTICATION_OPTIONS;
    }
};
AuthenticationModuleOptionsFactory = __decorate([
    common_1.Injectable()
], AuthenticationModuleOptionsFactory);
exports.AuthenticationModuleOptionsFactory = AuthenticationModuleOptionsFactory;
//# sourceMappingURL=authentication.config.js.map