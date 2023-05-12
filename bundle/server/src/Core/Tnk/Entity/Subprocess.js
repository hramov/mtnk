"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Subprocess = void 0;
const BaseEntity_1 = require("../../../Shared/src/BaseEntity");
class Subprocess extends BaseEntity_1.BaseEntity {
    set process(value) {
        this._process = value;
    }
    set esppObject(value) {
        this._esppObject = value;
    }
    set code(value) {
        this._code = value;
    }
    set title(value) {
        this._title = value;
    }
}
exports.Subprocess = Subprocess;
//# sourceMappingURL=Subprocess.js.map