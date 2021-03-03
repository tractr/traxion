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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserFindManyQueryDto = void 0;
const openapi = require("@nestjs/swagger");
const client_1 = require("@prisma/client");
const class_validator_1 = require("class-validator");
class UserFindManyQueryDto {
    constructor() {
        this.sort = 'id';
        this.order = 'asc';
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: false, type: () => String }, email: { required: false, type: () => String }, role: { required: false, type: () => String }, banned: { required: false, type: () => Boolean }, sort: { required: true, type: () => Object, default: 'id' }, order: { required: true, type: () => Object, default: 'asc' }, take: { required: true, type: () => Number, minimum: 1 }, skip: { required: true, type: () => Number, minimum: 0 } };
    }
    static _GRAPHQL_METADATA_FACTORY() {
        return { name: { nullable: true, type: () => String }, email: { nullable: true, type: () => String }, role: { nullable: true, type: () => String }, banned: { nullable: true, type: () => Boolean }, sort: { nullable: false, type: () => Object }, order: { nullable: false, type: () => Object }, take: { nullable: false, type: () => Number }, skip: { nullable: false, type: () => Number } };
    }
}
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], UserFindManyQueryDto.prototype, "name", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsEmail({}),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], UserFindManyQueryDto.prototype, "email", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], UserFindManyQueryDto.prototype, "role", void 0);
__decorate([
    class_validator_1.IsBoolean(),
    class_validator_1.IsOptional(),
    __metadata("design:type", Boolean)
], UserFindManyQueryDto.prototype, "banned", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    class_validator_1.IsIn(['name', 'email']),
    __metadata("design:type", Object)
], UserFindManyQueryDto.prototype, "sort", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsIn(Object.values(client_1.Prisma.SortOrder)),
    __metadata("design:type", String)
], UserFindManyQueryDto.prototype, "order", void 0);
__decorate([
    class_validator_1.IsNumber(),
    class_validator_1.IsInt(),
    class_validator_1.Min(1),
    __metadata("design:type", Number)
], UserFindManyQueryDto.prototype, "take", void 0);
__decorate([
    class_validator_1.IsNumber(),
    class_validator_1.IsInt(),
    class_validator_1.Min(0),
    __metadata("design:type", Number)
], UserFindManyQueryDto.prototype, "skip", void 0);
exports.UserFindManyQueryDto = UserFindManyQueryDto;
//# sourceMappingURL=user-find-many-query.dto.js.map