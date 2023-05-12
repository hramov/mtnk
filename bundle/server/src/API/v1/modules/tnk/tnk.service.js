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
exports.TnkService = void 0;
const common_1 = require("@nestjs/common");
const repository_constants_1 = require("../../common/persistent/repository/repository.constants");
const ConfigItem_1 = require("../../../../Core/Tnk/Entity/ConfigItem");
const Tnk_1 = require("../../../../Core/Tnk/Tnk");
const Database_error_1 = require("../../error/Database.error");
const Workgroup_1 = require("../../../../Core/Tnk/Entity/Workgroup");
const Operation_1 = require("../../../../Core/Tnk/Entity/Operation");
const SearchTnkSpecification_1 = require("../../../../Core/Tnk/Specification/SearchTnkSpecification");
const Subprocess_1 = require("../../../../Core/Tnk/Entity/Subprocess");
const Process_1 = require("../../../../Core/Tnk/Entity/Process");
let TnkService = class TnkService {
    constructor(tnkRepository, dictRepository) {
        this.tnkRepository = tnkRepository;
        this.dictRepository = dictRepository;
    }
    async create(dto) {
        const tnk = new Tnk_1.Tnk();
        tnk.title = dto.title;
        tnk.type = dto.type;
        tnk.isActive = dto.isActive;
        tnk.isDigital = dto.isDigital;
        tnk.isAutomated = dto.isAutomated;
        tnk.statusId = dto.statusId;
        const subprocess = await this.dictRepository.getSubprocess(dto.subprocessId);
        if (subprocess instanceof Database_error_1.DatabaseError) {
            tnk.subprocess = new Subprocess_1.Subprocess();
        }
        else {
            tnk.subprocess = subprocess;
        }
        const process = await this.dictRepository.getProcess(dto.processId);
        if (process instanceof Database_error_1.DatabaseError) {
            tnk.process = new Process_1.Process();
        }
        else {
            tnk.process = process;
        }
        return this.tnkRepository.create(tnk);
    }
    async update(dto, id) {
        const tnk = await this.tnkRepository.findOne(id);
        if (tnk instanceof Database_error_1.DatabaseError) {
            return tnk;
        }
        tnk.title = dto.title;
        tnk.type = dto.type;
        tnk.isActive = dto.isActive;
        tnk.isDigital = dto.isDigital;
        tnk.isAutomated = dto.isAutomated;
        tnk.statusId = dto.statusId;
        const subprocess = await this.dictRepository.getSubprocess(dto.subprocessId);
        if (subprocess instanceof Database_error_1.DatabaseError) {
            tnk.subprocess = new Subprocess_1.Subprocess();
        }
        else {
            tnk.subprocess = subprocess;
        }
        const process = await this.dictRepository.getProcess(dto.processId);
        if (process instanceof Database_error_1.DatabaseError) {
            tnk.process = new Process_1.Process();
        }
        else {
            tnk.process = process;
        }
        return this.tnkRepository.update(tnk);
    }
    async addConfigItem(title, tnkId) {
        const configItem = new ConfigItem_1.ConfigItem();
        configItem.tnkId = tnkId;
        configItem.title = title;
        configItem.isActive = true;
        const tnk = await this.tnkRepository.findOne(tnkId);
        if (tnk instanceof Database_error_1.DatabaseError) {
            return tnk;
        }
        tnk.configItems = [...tnk.configItems, configItem];
        return this.tnkRepository.update(tnk);
    }
    async addWorkGroup(title, tnkId) {
        const workGroup = new Workgroup_1.WorkGroup();
        workGroup.tnkId = tnkId;
        workGroup.title = title;
        workGroup.isActive = true;
        const tnk = await this.tnkRepository.findOne(tnkId);
        if (tnk instanceof Database_error_1.DatabaseError) {
            return tnk;
        }
        tnk.workGroups = [...tnk.workGroups, workGroup];
        return this.tnkRepository.update(tnk);
    }
    async addOperation(title, tnkId) {
        const operation = new Operation_1.Operation();
        operation.tnkId = tnkId;
        operation.title = title;
        operation.isActive = true;
        const tnk = await this.tnkRepository.findOne(tnkId);
        if (tnk instanceof Database_error_1.DatabaseError) {
            return tnk;
        }
        tnk.operations = [...tnk.operations, operation];
        return this.tnkRepository.update(tnk);
    }
    async search(searchParams) {
        const searchTnkSpecification = new SearchTnkSpecification_1.SearchTnkSpecification(searchParams);
        return this.tnkRepository.find(searchTnkSpecification);
    }
    async show(tnkId) {
        return this.tnkRepository.findOne(tnkId);
    }
    async approve(user, dto) {
        return null;
    }
    async getTnkToApprove(user) {
        return null;
    }
};
TnkService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(repository_constants_1.TNK_REPOSITORY)),
    __param(1, (0, common_1.Inject)(repository_constants_1.DICTIONARY_REPOSITORY)),
    __metadata("design:paramtypes", [Object, Object])
], TnkService);
exports.TnkService = TnkService;
//# sourceMappingURL=tnk.service.js.map