"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Role = void 0;
const BaseEntity_1 = require("../../../Shared/src/BaseEntity");
class Role extends BaseEntity_1.BaseEntity {
    setRole(rawRole) {
        this.role = rawRole;
    }
    parse() {
        return this.role;
    }
}
exports.Role = Role;
//# sourceMappingURL=Role.js.map