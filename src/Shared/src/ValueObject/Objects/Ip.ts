import {ValueObject} from "../ValueObject";

export class Ip extends ValueObject {
    protected *getEqualityComponents(): IterableIterator<Object> {
        return undefined;
    }

}