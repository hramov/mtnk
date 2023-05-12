"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutoTnk = void 0;
const BaseEntity_1 = require("../../Shared/src/BaseEntity");
class AutoTnk extends BaseEntity_1.BaseEntity {
    get attributes() {
        return this._attributes;
    }
    set attributes(value) {
        this._attributes = value;
    }
    get operations() {
        return this._operations;
    }
    set operations(value) {
        this._operations = value;
    }
    get history() {
        return this._history;
    }
    set history(value) {
        this._history = value;
    }
    get approvalQueue() {
        return this._approvalQueue;
    }
    set approvalQueue(value) {
        this._approvalQueue = value;
    }
    get processId() {
        return this._processId;
    }
    set processId(value) {
        this._processId = value;
    }
    get isDigital() {
        return this._isDigital;
    }
    set isDigital(value) {
        this._isDigital = value;
    }
    get isActive() {
        return this._isActive;
    }
    set isActive(value) {
        this._isActive = value;
    }
    get subprocessId() {
        return this._subprocessId;
    }
    set subprocessId(value) {
        this._subprocessId = value;
    }
    get title() {
        return this._title;
    }
    set title(value) {
        this._title = value;
    }
    get isAutomated() {
        return this._isAutomated;
    }
    set isAutomated(value) {
        this._isAutomated = value;
    }
    get statusId() {
        return this._statusId;
    }
    set statusId(value) {
        this._statusId = value;
    }
    get type() {
        return this._type;
    }
    set type(value) {
        this._type = value;
    }
}
exports.AutoTnk = AutoTnk;
//# sourceMappingURL=AutoTnk.js.map