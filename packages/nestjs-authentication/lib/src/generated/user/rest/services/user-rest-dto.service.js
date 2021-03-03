"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRestDtoService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
let UserRestDtoService = class UserRestDtoService {
    formatCreateDto(bodyDto) {
        const { name, email, password, role, banned } = bodyDto;
        const data = {
            name,
            email,
            password,
            role,
            banned,
        };
        return { data };
    }
    formatCountDto(queryDto) {
        const { name, email, role, banned } = queryDto;
        const where = {
            name,
            email,
            role,
            banned,
        };
        return { where };
    }
    formatFindUniqueDtos(paramsDto) {
        return {
            where: Object.assign({}, paramsDto),
        };
    }
    formatFindManyDto(queryDto) {
        const { name, email, role, banned, sort, order, take, skip } = queryDto;
        const where = {
            name,
            email,
            role,
            banned,
        };
        const orderBy = { [sort]: order };
        return {
            where,
            take,
            skip,
            orderBy,
        };
    }
    formatUpdateDtos(paramsDto, bodyDto) {
        const { name, email, password, role, banned } = bodyDto;
        const data = {
            name,
            email,
            password,
            role,
            banned,
        };
        return { data, where: Object.assign({}, paramsDto) };
    }
    formatUpsertDtos(paramsDto, bodyDto) {
        const { name, email, password, role, banned } = bodyDto;
        const create = {
            name,
            email,
            password,
            role,
            banned,
        };
        const update = Object.assign({}, create);
        return {
            create,
            update,
            where: Object.assign({}, paramsDto),
        };
    }
    formatDeleteDto(paramsDto) {
        return { where: Object.assign({}, paramsDto) };
    }
};
UserRestDtoService = __decorate([
    common_1.Injectable()
], UserRestDtoService);
exports.UserRestDtoService = UserRestDtoService;
//# sourceMappingURL=user-rest-dto.service.js.map