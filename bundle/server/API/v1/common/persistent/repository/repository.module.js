"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepositoryModule = void 0;
const common_1 = require("@nestjs/common");
const repository_constants_1 = require("./repository.constants");
const user_repository_1 = require("./user.repository");
const constants_1 = require("../../constants");
const postgres_module_1 = require("../postgres/postgres.module");
const logger_module_1 = require("../../logger/logger.module");
const disctionary_repository_1 = require("./disctionary.repository");
let RepositoryModule = class RepositoryModule {
};
RepositoryModule = __decorate([
    (0, common_1.Module)({
        imports: [postgres_module_1.PostgresModule, logger_module_1.LoggerModule],
        providers: [
            {
                provide: repository_constants_1.USER_REPOSITORY,
                useFactory: (logger, storage) => {
                    return new user_repository_1.UserRepository(logger, storage);
                },
                inject: ['CustomLogger', constants_1.POSTGRES_STORAGE],
            },
            {
                provide: repository_constants_1.TNK_REPOSITORY,
                useFactory: (logger, storage) => {
                    return new user_repository_1.UserRepository(logger, storage);
                },
                inject: ['CustomLogger', constants_1.POSTGRES_STORAGE],
            },
            {
                provide: repository_constants_1.DICTIONARY_REPOSITORY,
                useFactory: (logger, storage) => {
                    return new disctionary_repository_1.DictionaryRepository(logger, storage);
                },
                inject: ['CustomLogger', constants_1.POSTGRES_STORAGE],
            },
        ],
        exports: [repository_constants_1.USER_REPOSITORY, repository_constants_1.TNK_REPOSITORY, repository_constants_1.DICTIONARY_REPOSITORY],
    })
], RepositoryModule);
exports.RepositoryModule = RepositoryModule;
//# sourceMappingURL=repository.module.js.map