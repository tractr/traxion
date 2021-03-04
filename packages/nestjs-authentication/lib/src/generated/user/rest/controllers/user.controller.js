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
exports.UserController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const common_2 = require("../../common");
const user_model_constant_1 = require("../../common/user-model.constant");
const user_rest_constant_1 = require("../user-rest.constant");
const dtos_1 = require("../dtos");
const services_1 = require("../services");
let UserController = class UserController {
    constructor(userService, userRestDtoService) {
        this.userService = userService;
        this.userRestDtoService = userRestDtoService;
    }
    async create(bodyDto) {
        const formatedParams = this.userRestDtoService.formatCreateDto(bodyDto);
        return this.userService.create(formatedParams);
    }
    async findUnique(paramsDto) {
        const formatedParams = this.userRestDtoService.formatFindUniqueDtos(paramsDto);
        return this.userService.findUnique(formatedParams);
    }
    async findMany(queryDto) {
        const formatedParams = this.userRestDtoService.formatFindManyDto(queryDto);
        return this.userService.findMany(formatedParams);
    }
    async count(queryDto) {
        const formatedParams = this.userRestDtoService.formatCountDto(queryDto);
        return this.userService.count(formatedParams);
    }
    async update(paramsDto, bodyDto) {
        const formatedParams = this.userRestDtoService.formatUpdateDtos(paramsDto, bodyDto);
        return this.userService.update(formatedParams);
    }
    async upsert(paramsDto, bodyDto) {
        const formatedParams = this.userRestDtoService.formatUpsertDtos(paramsDto, bodyDto);
        return this.userService.upsert(formatedParams);
    }
    async delete(paramsDto) {
        const formatedParams = this.userRestDtoService.formatDeleteDto(paramsDto);
        return this.userService.delete(formatedParams);
    }
};
__decorate([
    openapi.ApiOperation({ description: "Create a new User" }),
    common_1.Post(),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos_1.UserCreateBodyDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "create", null);
__decorate([
    openapi.ApiOperation({ description: "Find zero or one User that matches the filter" }),
    common_1.Get(':id'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos_1.UserFindUniqueParamsDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findUnique", null);
__decorate([
    openapi.ApiOperation({ description: "Find zero or more User entities that matches the filter" }),
    common_1.Get(),
    openapi.ApiResponse({ status: 200, type: [Object] }),
    __param(0, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos_1.UserFindManyQueryDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findMany", null);
__decorate([
    openapi.ApiOperation({ description: "Count the number of User entities that matches the filter" }),
    common_1.Get('count'),
    openapi.ApiResponse({ status: 200, type: Number }),
    __param(0, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos_1.UserCountQueryDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "count", null);
__decorate([
    openapi.ApiOperation({ description: "Update one User\n\n\n\nPartial updates are allowed with this method" }),
    common_1.Patch(':id'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, common_1.Param()),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos_1.UserUpdateParamsDto,
        dtos_1.UserUpdateBodyDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "update", null);
__decorate([
    openapi.ApiOperation({ description: "Update or create one User\n\n\n\nPartial updates are forbidden with this method. It will\nfully replace the matched entity" }),
    common_1.Put(':id'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, common_1.Param()),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos_1.UserUpsertParamsDto,
        dtos_1.UserUpsertBodyDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "upsert", null);
__decorate([
    openapi.ApiOperation({ description: "Delete one User" }),
    common_1.Delete(':id'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos_1.UserDeleteParamsDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "delete", null);
UserController = __decorate([
    common_1.Controller(['user']),
    __param(0, common_1.Inject(user_model_constant_1.USER_SERVICE)),
    __param(1, common_1.Inject(user_rest_constant_1.USER_REST_DTO_SERVICE)),
    __metadata("design:paramtypes", [common_2.UserService,
        services_1.UserRestDtoService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map