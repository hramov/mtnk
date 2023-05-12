"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlainSQLUnitOfWork = void 0;
class PlainSQLUnitOfWork {
    constructor(connection) {
        this.connection = connection;
        if (!connection)
            throw new Error('Connection is undefined');
    }
    async query(query, params, opts) {
        let result;
        try {
            this.connection.query(query, params);
        }
        catch (_err) {
            result = _err;
        }
        return result;
    }
}
exports.PlainSQLUnitOfWork = PlainSQLUnitOfWork;
//# sourceMappingURL=PlainSQLUnitOfWork.js.map