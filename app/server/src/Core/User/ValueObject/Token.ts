import { ValueObject } from '../../../Shared/src/ValueObject/ValueObject';

export class Token extends ValueObject {
    public accessToken: string;
    public refreshToken: string;

    protected *getEqualityComponents(): IterableIterator<Object> {
        yield this.accessToken;
        yield this.refreshToken;
    }
}