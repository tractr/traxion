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
exports.UserCreateBodyDto = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class UserCreateBodyDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String }, email: { required: true, type: () => String }, password: { required: true, type: () => String }, role: { required: true, type: () => String }, banned: { required: true, type: () => Boolean } };
    }
    static _GRAPHQL_METADATA_FACTORY() {
        return { name: { nullable: false, type: () => String }, email: { nullable: false, type: () => String }, password: { nullable: false, type: () => String }, role: { nullable: false, type: () => String }, banned: { nullable: false, type: () => Boolean } };
    }
}
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], UserCreateBodyDto.prototype, "name", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsEmail({}),
    __metadata("design:type", String)
], UserCreateBodyDto.prototype, "email", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/),
    __metadata("design:type", String)
], UserCreateBodyDto.prototype, "password", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], UserCreateBodyDto.prototype, "role", void 0);
__decorate([
    class_validator_1.IsBoolean(),
    __metadata("design:type", Boolean)
], UserCreateBodyDto.prototype, "banned", void 0);
exports.UserCreateBodyDto = UserCreateBodyDto;
//# sourceMappingURL=user-create-body.dto.js.map