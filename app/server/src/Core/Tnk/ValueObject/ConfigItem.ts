import {ValueObject} from "../../../Shared/src/ValueObject/ValueObject";

export class ConfigItem extends ValueObject {
    private readonly tnkId: string;
    private readonly title: string;

    constructor(tnkId: string, title: string) {
        super();
        this.tnkId = tnkId;
        this.title = title;
    }

    protected *getEqualityComponents(): IterableIterator<Object> {
        yield this.tnkId;
        yield this.title;
    }
}