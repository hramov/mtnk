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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const LoginOrPasswordIncorrectHttp_error_1 = require("./error/LoginOrPasswordIncorrectHttp.error");
const LoginOrPasswordIncorrect_error_1 = require("../../../../Core/User/Error/LoginOrPasswordIncorrect.error");
const user_service_1 = require("./user.service");
const Candidate_1 = require("../../../../Core/User/ValueObject/Candidate");
const user_decorator_1 = require("./user.decorator");
const TokenData_1 = require("../../../../Core/User/ValueObject/TokenData");
const public_decorator_1 = require("./public.decorator");
const Database_error_1 = require("../../error/Database.error");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async login(dto) {
        const result = await this.userService.login(dto);
        if (result instanceof Database_error_1.DatabaseError) {
            throw common_1.InternalServerErrorException;
        }
        else if (result instanceof LoginOrPasswordIncorrect_error_1.LoginOrPasswordIncorrectError) {
            throw (0, LoginOrPasswordIncorrectHttp_error_1.LoginOrPasswordIncorrectException)(result);
        }
        return result;
    }
    async info(user) {
        return this.userService.getUserInfo(user.userId);
    }
};
__decorate([
    (0, common_1.Post)('login'),
    (0, public_decorator_1.Public)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Candidate_1.Candidate]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "login", null);
__decorate([
    (0, common_1.Get)('info'),
    __param(0, (0, user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [TokenData_1.TokenData]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "info", null);
UserController = __decorate([
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map