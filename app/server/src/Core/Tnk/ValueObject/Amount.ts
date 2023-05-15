import {ValueObject} from "../../../Shared/src/ValueObject/ValueObject";

export class Amount extends ValueObject {

    private readonly amount: number;

    constructor(amount: number) {
        super();
        this.amount = amount;
    }

    protected *getEqualityComponents(): IterableIterator<Object> {
        yield this.amount;
    }
}