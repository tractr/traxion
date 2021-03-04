"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRestModule = void 0;
const common_1 = require("@nestjs/common");
const nestjs_core_1 = require("@tractr/nestjs-core");
const common_2 = require("../common");
const controllers_1 = require("./controllers");
const services_1 = require("./services");
const user_rest_constant_1 = require("./user-rest.constant");
const providers = [
    {
        provide: user_rest_constant_1.USER_REST_DTO_SERVICE,
        useClass: services_1.UserRestDtoService,
    },
];
let UserRestModule = class UserRestModule extends nestjs_core_1.ModuleOverride {
};
UserRestModule.controllers = [
    {
        provide: user_rest_constant_1.USER_CONTROLLER,
        useClass: controllers_1.UserController,
    },
];
UserRestModule.dependencies = [common_2.UserModelModule];
UserRestModule = __decorate([
    common_1.Module({
        exports: providers,
        providers,
    })
], UserRestModule);
exports.UserRestModule = UserRestModule;
//# sourceMappingURL=user-rest.module.js.map