"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AsyncLocalStorageModule = void 0;
const common_1 = require("@nestjs/common");
const async_hooks_1 = require("async_hooks");
const constants_1 = require("../constants");
let AsyncLocalStorageModule = class AsyncLocalStorageModule {
};
AsyncLocalStorageModule = __decorate([
    (0, common_1.Module)({
        providers: [
            {
                provide: constants_1.ASYNC_STORAGE,
                useValue: new async_hooks_1.AsyncLocalStorage(),
            },
        ],
        exports: [constants_1.ASYNC_STORAGE],
    })
], AsyncLocalStorageModule);
exports.AsyncLocalStorageModule = AsyncLocalStorageModule;
//# sourceMappingURL=asyncLocalStorage.module.js.map