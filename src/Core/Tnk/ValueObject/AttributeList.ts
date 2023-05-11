import {ValueObject} from "../../../Shared/src/ValueObject/ValueObject";

export class AttributeList extends ValueObject {
    protected getEqualityComponents(): IterableIterator<Object> {
        return undefined;
    }

}