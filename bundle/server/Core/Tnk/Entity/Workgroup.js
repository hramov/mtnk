"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkGroup = void 0;
const BaseEntity_1 = require("../../../Shared/src/BaseEntity");
class WorkGroup extends BaseEntity_1.BaseEntity {
    get tnkId() {
        return this._tnkId;
    }
    set tnkId(value) {
        this._tnkId = value;
    }
    get title() {
        return this._title;
    }
    set title(value) {
        this._title = value;
    }
    get isActive() {
        return this._isActive;
    }
    set isActive(value) {
        this._isActive = value;
    }
}
exports.WorkGroup = WorkGroup;
//# sourceMappingURL=Workgroup.js.map