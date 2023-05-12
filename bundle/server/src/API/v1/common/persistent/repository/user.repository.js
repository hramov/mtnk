"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const Database_error_1 = require("../../../error/Database.error");
class UserRepository {
    constructor(logger, storage) {
        this.logger = logger;
        this.storage = storage;
    }
    async getUserByUsername(username) {
        this.logger.log('Got request to fetch data', 'UserRepository', {
            method: 'getUserByUsername'
        });
        const sql = `select id, username, password from auth.account where username = $1 and is_active = true`;
        const params = [username];
        const fetched = await this.storage.queryOne(sql, params);
        if (fetched instanceof Error) {
            this.logger.error('Cannot fetch data: ' + fetched.message, 'UserRepository', fetched.stack, {
                method: 'getUserByUsername'
            });
            return new Database_error_1.DatabaseError();
        }
        return fetched;
    }
    getProfileById(profileId) {
        return Promise.resolve(undefined);
    }
    getUserById(userId) {
        return Promise.resolve(undefined);
    }
    create(user) {
        return Promise.resolve(undefined);
    }
    find(searchParams) {
        return Promise.resolve(undefined);
    }
    update(user) {
        return Promise.resolve(undefined);
    }
}
exports.UserRepository = UserRepository;
//# sourceMappingURL=user.repository.js.map