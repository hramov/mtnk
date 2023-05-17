import {ValueObject} from "../../../Shared/src/ValueObject/ValueObject";

export class WorkGroup extends ValueObject {
    public tnkId: string;
    public title: string;

    constructor(tnkId: string, title: string) {
        super()
        this.tnkId = tnkId;
        this.title = title;
    }

    protected *getEqualityComponents(): IterableIterator<Object> {
        yield this.tnkId;
        yield this.title;
    }
}