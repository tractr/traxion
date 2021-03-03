"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const client_1 = require("@prisma/client");
const bcrypt = __importStar(require("bcrypt"));
const user_1 = require("../../generated/user");
const user_model_constant_1 = require("../../generated/user/common/user-model.constant");
const constants_1 = require("../constants");
const errors_1 = require("../errors");
let AuthenticationService = class AuthenticationService {
    constructor(authenticationOptions, userService, jwtService) {
        this.authenticationOptions = authenticationOptions;
        this.userService = userService;
        this.jwtService = jwtService;
    }
    async validateUser(login, password) {
        try {
            return await this.authenticateLoginCredentials(login, password);
        }
        catch (_a) {
            return null;
        }
    }
    async authenticateLoginCredentials(login, password) {
        var _a;
        const loginField = (_a = this.authenticationOptions.strategy.local.usernameField) !== null && _a !== void 0 ? _a : 'email';
        if (!loginField)
            throw new Error('loginField is not defined');
        const findOneWhere = {
            [loginField]: login,
        };
        const user = await this.userService.findUnique({
            where: findOneWhere,
            select: { password: true },
        });
        if (!user)
            throw new errors_1.UserNotFoundError();
        if (await this.verifyPassword(user.password, password)) {
            return this.userService.findUnique({ where: findOneWhere });
        }
        throw new errors_1.BadPasswordError();
    }
    async hashPassword(password) {
        var _a;
        const salt = await bcrypt.genSalt((_a = this.authenticationOptions.login.saltRounds) !== null && _a !== void 0 ? _a : 20);
        return bcrypt.hash(password, salt);
    }
    async verifyPassword(password, hash) {
        return bcrypt.compare(password, hash);
    }
    async createUserJWT(user) {
        return this.jwtService.signAsync({ sub: user.id });
    }
    async login(user) {
        return {
            accessToken: await this.createUserJWT(user),
        };
    }
};
AuthenticationService = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject(constants_1.AUTHENTICATION_MODULE_OPTIONS)),
    __param(1, common_1.Inject(user_model_constant_1.USER_SERVICE)),
    __metadata("design:paramtypes", [Object, user_1.UserService,
        jwt_1.JwtService])
], AuthenticationService);
exports.AuthenticationService = AuthenticationService;
//# sourceMappingURL=authentication.service.js.map