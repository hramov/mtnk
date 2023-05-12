"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Password = void 0;
const ValueObject_1 = require("../ValueObject");
class Password extends ValueObject_1.ValueObject {
    constructor(password) {
        super();
        this.password = password;
    }
    *getEqualityComponents() {
        yield this.password;
    }
    toString() {
        return this.password;
    }
}
exports.Password = Password;
//# sourceMappingURL=Password.js.map