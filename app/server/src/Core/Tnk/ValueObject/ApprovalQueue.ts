import {ValueObject} from "../../../Shared/src/ValueObject/ValueObject";

export class ApprovalQueue extends ValueObject {
    private tnkId: number;
    private currentGroup: number;

    protected *getEqualityComponents(): IterableIterator<Object> {
        yield this.tnkId;
    }

}