"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostgresStorage = void 0;
const pgPromise = require("pg-promise");
class PostgresStorage {
    constructor(connOptions) {
        this.conn = pgPromise()(connOptions);
    }
    async query(sql, values, options) {
        try {
            return await this.conn.many(sql, values);
        }
        catch (err) {
            return err;
        }
    }
    async queryOne(sql, values, options) {
        try {
            return await this.conn.one(sql, values);
        }
        catch (err) {
            return err;
        }
    }
}
exports.PostgresStorage = PostgresStorage;
//# sourceMappingURL=Postgres.storage.js.map