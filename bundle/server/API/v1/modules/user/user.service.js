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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const LoginOrPasswordIncorrect_error_1 = require("../../../../Core/User/Error/LoginOrPasswordIncorrect.error");
const bcrypt_1 = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
const Token_1 = require("../../../../Core/User/Entity/Token");
const GenerateToken_error_1 = require("../../../../Core/User/Error/GenerateToken.error");
const repository_constants_1 = require("../../common/persistent/repository/repository.constants");
const Database_error_1 = require("../../error/Database.error");
let UserService = class UserService {
    constructor(jwtService, logger, repository) {
        this.jwtService = jwtService;
        this.logger = logger;
        this.repository = repository;
    }
    async login(dto) {
        const user = await this.repository.getUserByUsername(dto.username);
        if (user instanceof Database_error_1.DatabaseError) {
            return user;
        }
        const loginData = user.getUserForLogin();
        const passwordsEqual = await (0, bcrypt_1.compare)(dto.plainPassword, loginData.password.toString());
        if (!passwordsEqual) {
            this.logger.log(`Login for user ${dto.username} declined`, 'UserService', {
                method: 'login',
            });
            return new LoginOrPasswordIncorrect_error_1.LoginOrPasswordIncorrectError();
        }
        const token = new Token_1.Token();
        try {
            token.accessToken = await this.jwtService.signAsync({
                userId: loginData.id,
                username: loginData.username,
                role: loginData.role,
            });
        }
        catch (err) {
            this.logger.log(`Error while generating token: ${err}`, 'UserService', {
                method: 'login',
            });
            return new GenerateToken_error_1.GenerateTokenError();
        }
        this.logger.log(`User ${dto.username} has successfully logged in`, 'UserService', {
            method: 'login',
        });
        return token;
    }
    async getUserInfo(userId) {
        const user = await this.repository.getUserById(userId);
        if (user instanceof Error) {
            return user;
        }
        return user.getUserInfo();
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)('CustomLogger')),
    __param(2, (0, common_1.Inject)(repository_constants_1.USER_REPOSITORY)),
    __metadata("design:paramtypes", [jwt_1.JwtService, Object, Object])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map