"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateTimeDuration = void 0;
const ValueObject_1 = require("../ValueObject");
class DateTimeDuration extends ValueObject_1.ValueObject {
    constructor(durationString) {
        super();
        this.durationString = durationString;
        this.parseDurationString();
    }
    parseDurationString() {
        this.duration = 0;
        this.unit = "d";
    }
    *getEqualityComponents() {
        throw new Error('Method not implemented.');
    }
}
exports.DateTimeDuration = DateTimeDuration;
//# sourceMappingURL=DateTimeDuration.js.map