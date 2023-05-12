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
const user_controller_1 = require("./user.controller");
const logger_module_1 = require("../../common/logger/logger.module");
const repository_module_1 = require("../../common/persistent/repository/repository.module");
const jwt_1 = require("@nestjs/jwt");
const core_1 = require("@nestjs/core");
const user_guard_1 = require("./user.guard");
const user_service_1 = require("./user.service");
let UserModule = class UserModule {
};
UserModule = __decorate([
    (0, common_1.Module)({
        imports: [logger_module_1.LoggerModule, repository_module_1.RepositoryModule,
            jwt_1.JwtModule.register({
                global: true,
                secret: process.env.TOKEN_KEY,
                signOptions: { expiresIn: '2h' },
            })],
        controllers: [user_controller_1.UserController],
        providers: [
            user_service_1.UserService,
            {
                provide: core_1.APP_GUARD,
                useClass: user_guard_1.AuthGuard,
            },
        ],
    })
], UserModule);
exports.UserModule = UserModule;
//# sourceMappingURL=user.module.js.map