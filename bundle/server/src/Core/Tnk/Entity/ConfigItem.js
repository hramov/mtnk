"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigItem = void 0;
const BaseEntity_1 = require("../../../Shared/src/BaseEntity");
class ConfigItem extends BaseEntity_1.BaseEntity {
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
exports.ConfigItem = ConfigItem;
//# sourceMappingURL=ConfigItem.js.map