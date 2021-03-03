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
exports.UserUpdateBodyDto = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class UserUpdateBodyDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: false, type: () => String }, email: { required: false, type: () => String }, password: { required: false, type: () => String }, role: { required: false, type: () => String }, banned: { required: false, type: () => Boolean } };
    }
    static _GRAPHQL_METADATA_FACTORY() {
        return { name: { nullable: true, type: () => String }, email: { nullable: true, type: () => String }, password: { nullable: true, type: () => String }, role: { nullable: true, type: () => String }, banned: { nullable: true, type: () => Boolean } };
    }
}
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], UserUpdateBodyDto.prototype, "name", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsEmail({}),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], UserUpdateBodyDto.prototype, "email", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], UserUpdateBodyDto.prototype, "password", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], UserUpdateBodyDto.prototype, "role", void 0);
__decorate([
    class_validator_1.IsBoolean(),
    class_validator_1.IsOptional(),
    __metadata("design:type", Boolean)
], UserUpdateBodyDto.prototype, "banned", void 0);
exports.UserUpdateBodyDto = UserUpdateBodyDto;
//# sourceMappingURL=user-update-body.dto.js.map