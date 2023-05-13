import {ValueObject} from "../../../Shared/src/ValueObject/ValueObject";

export class ApproveData extends ValueObject {

    public tnkId: number;

    protected *getEqualityComponents(): IterableIterator<Object> {
        return undefined;
    }

}