"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Uuid = void 0;
const uuid_1 = require("uuid");
const ValueObject_1 = require("../ValueObject");
class Uuid extends ValueObject_1.ValueObject {
    constructor() {
        super();
        this.value = (0, uuid_1.v4)();
    }
    toString() {
        return String(this.value);
    }
    getNil() {
        return uuid_1.NIL;
    }
    isNil() {
        return this.value === uuid_1.NIL;
    }
    *getEqualityComponents() {
        yield this.value;
    }
}
exports.Uuid = Uuid;
//# sourceMappingURL=Uuid.js.map