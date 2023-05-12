"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TnkRepository = void 0;
const Database_error_1 = require("../../../error/Database.error");
const Tnk_1 = require("../../../../../Core/Tnk/Tnk");
class TnkRepository {
    constructor(logger, storage) {
        this.logger = logger;
        this.storage = storage;
    }
    async create(dto) {
        return Promise.resolve(undefined);
    }
    async find(searchParams) {
        return Promise.resolve(undefined);
    }
    async findOne(tnkId) {
        const tnk = await this.storage.queryOne('select * from tnk.tnk where id = $1', [tnkId]);
        if (tnk instanceof Database_error_1.DatabaseError) {
            this.logger.error(`Cannot fetch tnk: ${tnk}`, 'TnkRepository', tnk.stack, {
                method: 'findOne'
            });
            return tnk;
        }
        const configItems = await this.storage.query('select * from tnk.tnk_to_ci where tnk_id = $1 and is_active = true', [tnkId]);
        if (configItems instanceof Database_error_1.DatabaseError) {
            this.logger.error(`Cannot fetch config items: ${configItems}`, 'TnkRepository', configItems.stack, {
                method: 'findOne'
            });
            return configItems;
        }
        const workGroups = await this.storage.query('select * from tnk.tnk_to_wg where tnk_id = $1 and is_active = true', [tnkId]);
        if (workGroups instanceof Database_error_1.DatabaseError) {
            this.logger.error(`Cannot fetch config items: ${workGroups}`, 'TnkRepository', workGroups.stack, {
                method: 'findOne'
            });
            return workGroups;
        }
        const operations = await this.storage.query('select * from tnk.tnk_to_operation where tnk_id = $1 and is_active = true', [tnkId]);
        if (operations instanceof Database_error_1.DatabaseError) {
            this.logger.error(`Cannot fetch config items: ${operations}`, 'TnkRepository', operations.stack, {
                method: 'findOne'
            });
            return operations;
        }
        const approvalQueue = await this.storage.query('select * from tnk.approval_queue where tnk_id = $1 and is_active = true', [tnkId]);
        if (approvalQueue instanceof Database_error_1.DatabaseError) {
            this.logger.error(`Cannot fetch config items: ${approvalQueue}`, 'TnkRepository', approvalQueue.stack, {
                method: 'findOne'
            });
            return approvalQueue;
        }
        const history = await this.storage.query('', [tnkId]);
        if (history instanceof Database_error_1.DatabaseError) {
            this.logger.error(`Cannot fetch config items: ${history}`, 'TnkRepository', history.stack, {
                method: 'findOne'
            });
            return history;
        }
        if (tnk instanceof Tnk_1.Tnk) {
            tnk.configItems = configItems;
            tnk.workGroups = workGroups;
            tnk.operations = operations;
            tnk.approvalQueue = approvalQueue;
            tnk.history = history;
        }
        return tnk;
    }
    async update(tnk) {
        return Promise.resolve(undefined);
    }
}
exports.TnkRepository = TnkRepository;
//# sourceMappingURL=tnk.repository.js.map