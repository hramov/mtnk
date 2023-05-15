import {ValueObject} from "../../../Shared/src/ValueObject/ValueObject";

export class WorkGroup extends ValueObject {
    private readonly tnkId: number;
    private readonly title: string;

    constructor(tnkId: number, title: string) {
        super()
        this.tnkId = tnkId;
        this.title = title;
    }

    protected *getEqualityComponents(): IterableIterator<Object> {
        yield this.tnkId;
        yield this.title;
    }
}