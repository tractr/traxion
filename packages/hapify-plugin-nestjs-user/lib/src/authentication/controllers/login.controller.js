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
exports.LoginController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const constants_1 = require("../constants");
const decorators_1 = require("../decorators");
const guards_1 = require("../guards");
const services_1 = require("../services");
let LoginController = class LoginController {
    constructor(authenticationOptions, authenticationService) {
        this.authenticationOptions = authenticationOptions;
        this.authenticationService = authenticationService;
    }
    async login(req, res) {
        const token = await this.authenticationService.login(req.user);
        res.cookie(this.authenticationOptions.cookies.cookieName, token.accessToken);
        return token;
    }
    getProfile(user) {
        return user;
    }
};
__decorate([
    common_1.UseGuards(guards_1.LocalAuthGuard),
    common_1.Post('login'),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, common_1.Req()),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], LoginController.prototype, "login", null);
__decorate([
    common_1.Get('me'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, decorators_1.CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], LoginController.prototype, "getProfile", null);
LoginController = __decorate([
    common_1.Controller(),
    __param(0, common_1.Inject(constants_1.AUTHENTICATION_MODULE_OPTIONS)),
    __metadata("design:paramtypes", [Object, services_1.AuthenticationService])
], LoginController);
exports.LoginController = LoginController;
//# sourceMappingURL=login.controller.js.map