"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TnkModule = void 0;
const common_1 = require("@nestjs/common");
const tnk_service_1 = require("./tnk.service");
const tnk_controller_1 = require("./tnk.controller");
const logger_module_1 = require("../../common/logger/logger.module");
const repository_module_1 = require("../../common/persistent/repository/repository.module");
let TnkModule = class TnkModule {
};
TnkModule = __decorate([
    (0, common_1.Module)({
        imports: [logger_module_1.LoggerModule, repository_module_1.RepositoryModule],
        providers: [tnk_service_1.TnkService],
        controllers: [tnk_controller_1.TnkController]
    })
], TnkModule);
exports.TnkModule = TnkModule;
//# sourceMappingURL=tnk.module.js.map