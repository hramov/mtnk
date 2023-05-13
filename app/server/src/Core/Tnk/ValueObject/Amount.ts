import {ValueObject} from "../../../Shared/src/ValueObject/ValueObject";

export class Amount extends ValueObject {
    protected getEqualityComponents(): IterableIterator<Object> {
        return undefined;
    }

}