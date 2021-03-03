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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDatabaseService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const hapify_plugin_nestjs_database_1 = require("@tractr/hapify-plugin-nestjs-database");
let UserDatabaseService = class UserDatabaseService {
    constructor(databaseService) {
        this.databaseService = databaseService;
    }
    findUnique(params) {
        return this.databaseService.user.findUnique(params);
    }
    findFirst(params) {
        return this.databaseService.user.findFirst(params);
    }
    findMany(params) {
        return this.databaseService.user.findMany(params);
    }
    create(params) {
        return this.databaseService.user.create(params);
    }
    update(params) {
        return this.databaseService.user.update(params);
    }
    updateMany(params) {
        return this.databaseService.user.updateMany(params);
    }
    upsert(params) {
        return this.databaseService.user.upsert(params);
    }
    delete(params) {
        return this.databaseService.user.delete(params);
    }
    deleteMany(params) {
        return this.databaseService.user.deleteMany(params);
    }
    count(params) {
        return this.databaseService.user.count(params);
    }
    aggregate(params) {
        return this.databaseService.user.aggregate(params);
    }
};
UserDatabaseService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [typeof (_a = typeof hapify_plugin_nestjs_database_1.DatabaseService !== "undefined" && hapify_plugin_nestjs_database_1.DatabaseService) === "function" ? _a : Object])
], UserDatabaseService);
exports.UserDatabaseService = UserDatabaseService;
//# sourceMappingURL=user-database.service.js.map