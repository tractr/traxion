"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModelModule = void 0;
const common_1 = require("@nestjs/common");
const hapify_plugin_nestjs_core_1 = require("@tractr/hapify-plugin-nestjs-core");
const services_1 = require("./services");
const user_model_constant_1 = require("./user-model.constant");
const providers = [
    {
        provide: user_model_constant_1.USER_SERVICE,
        useClass: services_1.UserService,
    },
    {
        provide: user_model_constant_1.USER_DATABASE_SERVICE,
        useClass: services_1.UserDatabaseService,
    },
];
let UserModelModule = class UserModelModule extends hapify_plugin_nestjs_core_1.ModuleOverride {
};
UserModelModule = __decorate([
    common_1.Module({
        exports: providers,
        providers,
    })
], UserModelModule);
exports.UserModelModule = UserModelModule;
//# sourceMappingURL=user-model.module.js.map