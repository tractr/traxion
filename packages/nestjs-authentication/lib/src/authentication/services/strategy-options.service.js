"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StrategyOptionsService = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("../constants");
let StrategyOptionsService = class StrategyOptionsService {
    constructor(authenticationOptions) {
        this.authenticationOptions = authenticationOptions;
    }
    createLocalStrategyOptions() {
        return this.authenticationOptions.strategy.local;
    }
    createJwtStrategyOptions() {
        const { verifyOptions, secret, secretOrKeyProvider, } = this.authenticationOptions.jwtModuleOptions;
        const { algorithm, audience, issuer } = this.authenticationOptions.jwtModuleOptions.signOptions || {};
        const passportJwtStrategyOptions = this.authenticationOptions.strategy.jwt;
        return Object.assign({ algorithms: algorithm ? [algorithm] : undefined, audience: Array.isArray(audience) ? audience.join(',') : audience, issuer, jsonWebTokenOptions: verifyOptions, secretOrKey: secret, secretOrKeyProvider: secretOrKeyProvider }, passportJwtStrategyOptions);
    }
};
StrategyOptionsService = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject(constants_1.AUTHENTICATION_MODULE_OPTIONS)),
    __metadata("design:paramtypes", [Object])
], StrategyOptionsService);
exports.StrategyOptionsService = StrategyOptionsService;
//# sourceMappingURL=strategy-options.service.js.map