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
exports.JwtStrategy = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const client_1 = require("@prisma/client");
const passport_jwt_1 = require("passport-jwt");
const user_1 = require("../../generated/user");
const user_model_constant_1 = require("../../generated/user/common/user-model.constant");
const services_1 = require("../services");
let JwtStrategy = class JwtStrategy extends passport_1.PassportStrategy(passport_jwt_1.Strategy) {
    constructor(userService, strategyOptionsService) {
        super(strategyOptionsService.createJwtStrategyOptions());
        this.userService = userService;
        this.strategyOptionsService = strategyOptionsService;
    }
    async validate(payload) {
        const user = await this.userService.findUnique({
            where: { id: payload.sub },
        });
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    }
};
JwtStrategy = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject(user_model_constant_1.USER_SERVICE)),
    __metadata("design:paramtypes", [user_1.UserService,
        services_1.StrategyOptionsService])
], JwtStrategy);
exports.JwtStrategy = JwtStrategy;
//# sourceMappingURL=jwt.strategy.js.map