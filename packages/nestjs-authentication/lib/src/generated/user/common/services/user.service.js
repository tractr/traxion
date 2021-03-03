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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const user_model_constant_1 = require("../user-model.constant");
const user_database_service_1 = require("./user-database.service");
let UserService = class UserService {
    constructor(userDatabaseService) {
        this.userDatabaseService = userDatabaseService;
    }
    async create(params) {
        return this.userDatabaseService.create(params);
    }
    async findUnique(params) {
        return this.userDatabaseService.findUnique(params);
    }
    async findMany(params) {
        return this.userDatabaseService.findMany(params);
    }
    async count(params) {
        return this.userDatabaseService.count(params);
    }
    async update(params) {
        return this.userDatabaseService.update(params);
    }
    async upsert(params) {
        return this.userDatabaseService.upsert(params);
    }
    async delete(params) {
        return this.userDatabaseService.delete(params);
    }
};
UserService = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject(user_model_constant_1.USER_DATABASE_SERVICE)),
    __metadata("design:paramtypes", [user_database_service_1.UserDatabaseService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map