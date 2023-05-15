import {ValueObject} from "../../../Shared/src/ValueObject/ValueObject";

export const enum DurationUnits {
    Minutes
}

export class Duration extends ValueObject {
    private readonly value: number;
    private readonly unit: DurationUnits;

    constructor(value: number, unit: DurationUnits) {
        super();
        this.value = value;
        this.unit = unit;
    }

    protected *getEqualityComponents(): IterableIterator<Object> {
        yield this.value;
        yield this.unit;
    }

}