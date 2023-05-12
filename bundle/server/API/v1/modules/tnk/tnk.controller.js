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
exports.TnkController = void 0;
const common_1 = require("@nestjs/common");
const tnk_service_1 = require("./tnk.service");
const TokenData_1 = require("../../../../Core/User/ValueObject/TokenData");
const user_decorator_1 = require("../user/user.decorator");
const ApproveData_1 = require("../../../../Core/Tnk/ValueObject/ApproveData");
let TnkController = class TnkController {
    constructor(tnkService) {
        this.tnkService = tnkService;
    }
    async approve(user, dto) {
        return this.tnkService.approve(user, dto);
    }
    async getTnkToApprove(user) {
        return this.tnkService.getTnkToApprove(user);
    }
};
__decorate([
    (0, common_1.Post)('/approve'),
    __param(0, (0, user_decorator_1.GetUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [TokenData_1.TokenData, ApproveData_1.ApproveData]),
    __metadata("design:returntype", Promise)
], TnkController.prototype, "approve", null);
__decorate([
    (0, common_1.Get)('/to-approve'),
    __param(0, (0, user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [TokenData_1.TokenData]),
    __metadata("design:returntype", Promise)
], TnkController.prototype, "getTnkToApprove", null);
TnkController = __decorate([
    (0, common_1.Controller)('tnk'),
    __metadata("design:paramtypes", [tnk_service_1.TnkService])
], TnkController);
exports.TnkController = TnkController;
//# sourceMappingURL=tnk.controller.js.map