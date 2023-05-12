"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValueObject = void 0;
const crypto_1 = require("crypto");
class ValueObject {
    equals(obj) {
        const thisEqualityGenerator = this.getEqualityComponents();
        const objEqualityGenerator = obj.getEqualityComponents();
        while (true) {
            const thisValue = thisEqualityGenerator.next();
            const objValue = objEqualityGenerator.next();
            if (thisValue.done)
                return true;
            if (thisValue.value !== objValue.value)
                return false;
        }
    }
    getHashCode() {
        return String((0, crypto_1.createHash)('sha256'));
    }
}
exports.ValueObject = ValueObject;
//# sourceMappingURL=ValueObject.js.map