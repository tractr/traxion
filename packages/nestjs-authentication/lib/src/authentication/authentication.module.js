"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var AuthenticationModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
const nestjs_core_1 = require("@tractr/nestjs-core");
const nestjs_database_1 = require("@tractr/nestjs-database");
const user_1 = require("../generated/user");
const config_1 = require("./config");
const constants_1 = require("./constants");
const controllers_1 = require("./controllers");
const services_1 = require("./services");
const strategies_1 = require("./strategies");
let AuthenticationModule = AuthenticationModule_1 = class AuthenticationModule extends nestjs_core_1.ModuleOptionsHelper() {
    static register(options = config_1.AUTHENTICATION_OPTIONS, overrides = {}) {
        const moduleOptions = Object.assign(Object.assign({}, config_1.AUTHENTICATION_OPTIONS), options);
        const authenticationOptionsModule = super.register(moduleOptions);
        return this.createAuthenticationModuleFromOptions(authenticationOptionsModule, overrides);
    }
    static registerAsync(options = {
        useClass: config_1.AuthenticationModuleOptionsFactory,
    }, overrides = {}) {
        const authenticationOptionsModule = super.registerAsync(options);
        return this.createAuthenticationModuleFromOptions(authenticationOptionsModule, overrides);
    }
    static createAuthenticationModuleFromOptions(authenticationOptionsModule, overrides) {
        var _a, _b, _c;
        return {
            module: AuthenticationModule_1,
            imports: [
                ...((_a = authenticationOptionsModule.imports) !== null && _a !== void 0 ? _a : []),
                nestjs_database_1.DatabaseModule,
                nestjs_core_1.CoreModule,
                jwt_1.JwtModule.registerAsync({
                    imports: [authenticationOptionsModule],
                    useFactory: (authenticationOptions) => authenticationOptions.jwtModuleOptions,
                    inject: [constants_1.AUTHENTICATION_MODULE_OPTIONS],
                }),
                passport_1.PassportModule.registerAsync({
                    imports: [authenticationOptionsModule],
                    useFactory: (authenticationOptions) => authenticationOptions.passportModuleOptions,
                    inject: [constants_1.AUTHENTICATION_MODULE_OPTIONS],
                }),
                user_1.UserModelModule.register(overrides),
            ],
            exports: [
                ...((_b = authenticationOptionsModule.exports) !== null && _b !== void 0 ? _b : []),
                services_1.AuthenticationService,
                strategies_1.JwtStrategy,
                strategies_1.LocalStrategy,
            ],
            providers: [
                ...((_c = authenticationOptionsModule.providers) !== null && _c !== void 0 ? _c : []),
                services_1.AuthenticationService,
                services_1.StrategyOptionsService,
                strategies_1.JwtStrategy,
                strategies_1.LocalStrategy,
            ],
            controllers: [controllers_1.LoginController],
        };
    }
};
AuthenticationModule.moduleOptionsProvide = constants_1.AUTHENTICATION_MODULE_OPTIONS;
AuthenticationModule = AuthenticationModule_1 = __decorate([
    common_1.Module({})
], AuthenticationModule);
exports.AuthenticationModule = AuthenticationModule;
//# sourceMappingURL=authentication.module.js.map