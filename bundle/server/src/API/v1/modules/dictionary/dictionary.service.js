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
exports.DictionaryService = void 0;
const common_1 = require("@nestjs/common");
const repository_constants_1 = require("../../common/persistent/repository/repository.constants");
const Process_1 = require("../../../../Core/Tnk/Entity/Process");
const Subprocess_1 = require("../../../../Core/Tnk/Entity/Subprocess");
const ReferenceOperation_1 = require("../../../../Core/Tnk/Entity/ReferenceOperation");
let DictionaryService = class DictionaryService {
    constructor(logger, repository) {
        this.logger = logger;
        this.repository = repository;
    }
    async getActiveRoles() {
        return this.repository.getActiveRoles();
    }
    async getAllDictItems() {
        return this.repository.getAllDictItems();
    }
    async getEditableDictTypes() {
        return this.repository.getEditableDictTypes();
    }
    async importDictionaries(params, account_id) {
        let result;
        const rows = params.rows.split('\n');
        const operations = [];
        const processes = [];
        const subprocesses = [];
        for (const row of rows) {
            const cols = row.split(';').map((item, idx) => idx === 0 ? item.trim() : item);
            switch (params.type) {
                case 2:
                    const operation = new ReferenceOperation_1.ReferenceOperation();
                    operation.title = cols[0];
                    operation.duration = Number(cols[1]);
                    operation.unitId = Number(cols[2]);
                    operation.sourceId = Number(cols[3]);
                    operation.blockId = Number(cols[4]);
                    operation.docNum = Number(cols[5]);
                    operations.push(operation);
                case 0:
                    const process = new Process_1.Process();
                    process.title = cols[0];
                    process.code = cols[1];
                case 1:
                    const subprocess = new Subprocess_1.Subprocess();
                    subprocess.title = cols[0];
                    subprocess.title = cols[0];
                    subprocess.title = cols[0];
                    subprocess.title = cols[0];
            }
        }
        switch (params.type) {
            case 2:
                result = await this.repository.addOperations(operations);
            case 0:
                result = await this.repository.addProcesses(processes);
            case 1:
                result = await this.repository.addSubprocesses(subprocesses);
        }
        return result;
    }
};
DictionaryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('CustomLogger')),
    __param(1, (0, common_1.Inject)(repository_constants_1.DICTIONARY_REPOSITORY)),
    __metadata("design:paramtypes", [Object, Object])
], DictionaryService);
exports.DictionaryService = DictionaryService;
//# sourceMappingURL=dictionary.service.js.map