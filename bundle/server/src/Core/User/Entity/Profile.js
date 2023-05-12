"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Profile = void 0;
const BaseEntity_1 = require("../../../Shared/src/BaseEntity");
class Profile extends BaseEntity_1.BaseEntity {
    setRole(role) {
        this.role = role;
    }
    getParsedRole() {
        return this.role.parse();
    }
}
exports.Profile = Profile;
//# sourceMappingURL=Profile.js.map