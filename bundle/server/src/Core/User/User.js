"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const Password_1 = require("../../Shared/src/ValueObject/Objects/Password");
const BaseEntity_1 = require("../../Shared/src/BaseEntity");
class User extends BaseEntity_1.BaseEntity {
    setId(id) {
        this.id = id;
        return this;
    }
    setUsername(username) {
        this.username = username;
        return this;
    }
    setPassword(password) {
        this.password = new Password_1.Password(password);
        return this;
    }
    load(user) {
        this.username = user.username;
        this.fio = user.fio;
        this.email = user.email;
        this.isActive = user.isActive;
        this.profile = user.profile;
        this.password = user.password;
        this.dateCreated = user.dateCreated;
        this.lastUpdated = user.lastUpdated;
        this.lastUpdatedBy = user.lastUpdatedBy;
    }
    getUserInfo() {
        return Object.assign(Object.assign({}, this), { password: '' });
    }
    getUserForLogin() {
        return {
            id: this.id,
            username: this.username,
            password: this.password,
            role: this.profile.getParsedRole(),
        };
    }
    setProfile(profile) {
        this.profile = profile;
    }
}
exports.User = User;
//# sourceMappingURL=User.js.map