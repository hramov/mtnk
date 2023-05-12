import { ValueObject } from '../ValueObject';
import { DateTimeDuration } from './DateTimeDuration';
export declare class DateTimeRange extends ValueObject {
    start: Date;
    end: Date;
    duration: DateTimeDuration;
    constructor(start: Date, end?: Date, duration?: string);
    protected getEqualityComponents(): IterableIterator<Object>;
    durationInMinutes(): number;
    private endFromStartAndDuration;
    newDuration(newDuration: string): DateTimeRange;
    newEnd(newEnd: Date): DateTimeRange;
    newStart(newStart: Date): DateTimeRange;
    static createOneDayRange(day: Date): DateTimeRange;
    static createOneWeekRange(day: Date): DateTimeRange;
    overlaps(dateTimeRange: DateTimeRange): boolean;
}
