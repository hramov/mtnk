"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DictionaryRepository = void 0;
const Database_error_1 = require("../../../error/Database.error");
class DictionaryRepository {
    constructor(logger, storage) {
        this.logger = logger;
        this.storage = storage;
    }
    getActiveRoles() {
        return Promise.resolve([]);
    }
    getAllDictItems() {
        return Promise.resolve([]);
    }
    getEditableDictTypes() {
        return Promise.resolve([]);
    }
    async addOperations(operations) {
        const sql = `insert into tnk.operations (title, duration, unit_id, source_id, block_id, doc_num) values ($1, $2, $3, $4, $5, $6, $7)`;
        for (const operation of operations) {
            const params = [
                operation.title,
                operation.duration,
                operation.unitId,
                operation.sourceId,
                operation.blockId,
                operation.docNum,
            ];
            const result = await this.storage.query(sql, params);
            if (result instanceof Database_error_1.DatabaseError) {
                return result;
            }
        }
        return Promise.resolve(undefined);
    }
    addProcesses(processes) {
        return Promise.resolve(undefined);
    }
    addSubprocesses(subprocesses) {
        return Promise.resolve(undefined);
    }
    getProcess(processId) {
        return Promise.resolve(undefined);
    }
    getSubprocess(subprocessId) {
        return Promise.resolve(undefined);
    }
}
exports.DictionaryRepository = DictionaryRepository;
//# sourceMappingURL=disctionary.repository.js.map