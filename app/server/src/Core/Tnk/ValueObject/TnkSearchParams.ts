import {ValueObject} from "../../../Shared/src/ValueObject/ValueObject";

export class TnkSearchParams extends ValueObject {

    public limit: number;
    public offset: number;

    protected *getEqualityComponents(): IterableIterator<Object> {
        return undefined;
    }

}