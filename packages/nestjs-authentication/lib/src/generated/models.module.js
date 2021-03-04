"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModelsModule = void 0;
const common_1 = require("@nestjs/common");
const nestjs_core_1 = require("@tractr/nestjs-core");
const user_1 = require("./user");
let ModelsModule = class ModelsModule extends nestjs_core_1.ModuleOverride {
};
ModelsModule.dependencies = [user_1.UserModule];
ModelsModule = __decorate([
    common_1.Module({})
], ModelsModule);
exports.ModelsModule = ModelsModule;
//# sourceMappingURL=models.module.js.map