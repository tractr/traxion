"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const common_1 = require("@nestjs/common");
const hapify_plugin_nestjs_core_1 = require("@tractr/hapify-plugin-nestjs-core");
const common_2 = require("./common");
const rest_1 = require("./rest");
let UserModule = class UserModule extends hapify_plugin_nestjs_core_1.ModuleOverride {
};
UserModule.dependencies = [
    rest_1.UserRestModule,
    common_2.UserModelModule,
];
UserModule = __decorate([
    common_1.Module({})
], UserModule);
exports.UserModule = UserModule;
//# sourceMappingURL=user.module.js.map