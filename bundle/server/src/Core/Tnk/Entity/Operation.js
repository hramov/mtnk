"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Operation = void 0;
const BaseEntity_1 = require("../../../Shared/src/BaseEntity");
class Operation extends BaseEntity_1.BaseEntity {
    get tnkId() {
        return this._tnkId;
    }
    set tnkId(value) {
        this._tnkId = value;
    }
    get referenceOperation() {
        return this._referenceOperation;
    }
    set referenceOperation(value) {
        this._referenceOperation = value;
    }
    get amount() {
        return this._amount;
    }
    set amount(value) {
        this._amount = value;
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
    get sortOrder() {
        return this._sortOrder;
    }
    set sortOrder(value) {
        this._sortOrder = value;
    }
    get assignee() {
        return this._assignee;
    }
    set assignee(value) {
        this._assignee = value;
    }
}
exports.Operation = Operation;
//# sourceMappingURL=Operation.js.map