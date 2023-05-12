import { ValueObject } from '../ValueObject';
export declare const enum DateTimeDurationUnit {
    MILLISECOND = "ms",
    SECOND = "s",
    MINUTE = "m",
    HOUR = "h",
    DAY = "d",
    MONTH = "mo",
    YEAR = "y"
}
export declare class DateTimeDuration extends ValueObject {
    private readonly durationString;
    duration: number;
    unit: DateTimeDurationUnit;
    constructor(durationString: string);
    private parseDurationString;
    protected getEqualityComponents(): IterableIterator<Object>;
}
