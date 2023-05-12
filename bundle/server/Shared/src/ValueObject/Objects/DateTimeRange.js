"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateTimeRange = void 0;
const moment = require("moment");
const ValueObject_1 = require("../ValueObject");
const DateTimeDuration_1 = require("./DateTimeDuration");
class DateTimeRange extends ValueObject_1.ValueObject {
    constructor(start, end, duration) {
        super();
        this.start = start;
        if (end)
            this.end = end;
        if (!end && duration) {
            this.duration = new DateTimeDuration_1.DateTimeDuration(duration);
            this.end = this.endFromStartAndDuration(this.start, this.duration);
        }
    }
    *getEqualityComponents() {
        yield this.start;
        yield this.end;
    }
    durationInMinutes() {
        return moment
            .duration(moment(this.end).diff(moment(this.start)))
            .asMinutes();
    }
    endFromStartAndDuration(start, duration) {
        return null;
    }
    newDuration(newDuration) {
        return new DateTimeRange(this.start, null, newDuration);
    }
    newEnd(newEnd) {
        return new DateTimeRange(this.start, newEnd);
    }
    newStart(newStart) {
        return new DateTimeRange(newStart, this.end);
    }
    static createOneDayRange(day) {
        const newDay = new Date(day);
        return new DateTimeRange(day, new Date(newDay.setDate(day.getDate() + 1)));
    }
    static createOneWeekRange(day) {
        const newDay = new Date(day);
        return new DateTimeRange(day, new Date(newDay.setDate(day.getDate() + 7)));
    }
    overlaps(dateTimeRange) {
        return this.start < dateTimeRange.end && this.end > dateTimeRange.start;
    }
}
exports.DateTimeRange = DateTimeRange;
//# sourceMappingURL=DateTimeRange.js.map