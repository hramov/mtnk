"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReferenceOperation = void 0;
const BaseEntity_1 = require("../../../Shared/src/BaseEntity");
class ReferenceOperation extends BaseEntity_1.BaseEntity {
    set blockId(value) {
        this._blockId = value;
    }
    set docNum(value) {
        this._docNum = value;
    }
    set sourceId(value) {
        this._sourceId = value;
    }
    set unitId(value) {
        this._unitId = value;
    }
    set duration(value) {
        this._duration = value;
    }
    set title(value) {
        this._title = value;
    }
}
exports.ReferenceOperation = ReferenceOperation;
//# sourceMappingURL=ReferenceOperation.js.map