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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var CustomLoggerService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomLoggerService = void 0;
const common_1 = require("@nestjs/common");
const async_hooks_1 = require("async_hooks");
const constants_1 = require("../constants");
const Logger_1 = require("../../../../Infrastructure/Logger/Logger");
let CustomLoggerService = CustomLoggerService_1 = class CustomLoggerService {
    constructor(asyncStorage) {
        this.asyncStorage = asyncStorage;
        this.logger = new Logger_1.Logger(CustomLoggerService_1.name);
    }
    debug(msg, context, opts) {
        var _a;
        const traceId = (_a = this.asyncStorage.getStore()) === null || _a === void 0 ? void 0 : _a.get('traceId');
        this.logger.log(msg, context, {
            traceId,
        });
    }
    log(msg, context, opts) {
        var _a;
        const traceId = (_a = this.asyncStorage.getStore()) === null || _a === void 0 ? void 0 : _a.get('traceId');
        this.logger.log(msg, context, {
            traceId,
        });
    }
    warn(msg, context, opts) {
        var _a;
        const traceId = (_a = this.asyncStorage.getStore()) === null || _a === void 0 ? void 0 : _a.get('traceId');
        this.logger.warn(msg, context, {
            traceId,
        });
    }
    error(msg, context, stack, opts) {
        var _a;
        const traceId = (_a = this.asyncStorage.getStore()) === null || _a === void 0 ? void 0 : _a.get('traceId');
        this.logger.error(msg, context, stack, {
            traceId,
        });
    }
};
CustomLoggerService = CustomLoggerService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(constants_1.ASYNC_STORAGE)),
    __metadata("design:paramtypes", [async_hooks_1.AsyncLocalStorage])
], CustomLoggerService);
exports.CustomLoggerService = CustomLoggerService;
//# sourceMappingURL=custom-logger.service.js.map