"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tnk = void 0;
const BaseEntity_1 = require("../../Shared/src/BaseEntity");
class Tnk extends BaseEntity_1.BaseEntity {
    get configItems() {
        return this._configItems;
    }
    set configItems(value) {
        this._configItems = value;
    }
    get workGroups() {
        return this._workGroups;
    }
    set workGroups(value) {
        this._workGroups = value;
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
    get process() {
        return this._process;
    }
    set process(value) {
        this._process = value;
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
    get subprocess() {
        return this._subprocess;
    }
    set subprocess(value) {
        this._subprocess = value;
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
    constructor(tnk) {
        super();
        this.title = tnk.title;
        this.process = tnk.process;
        this.subprocess = tnk.subprocess;
        this.isActive = tnk.isActive;
        this.isDigital = tnk.isDigital;
        this.isAutomated = tnk.isAutomated;
        this.statusId = tnk.statusId;
        this.type = tnk.type;
    }
    async addConfigurationItem(configItem) {
        return null;
    }
    async addWorkGroup(workGroup) {
        return null;
    }
    async addOperation(operation) {
        return null;
    }
    async addAttribute(attribute) {
        return null;
    }
    async approve(user, dto) {
        return null;
    }
    async getTnkToApprove(user) {
        return null;
    }
}
exports.Tnk = Tnk;
//# sourceMappingURL=Tnk.js.map