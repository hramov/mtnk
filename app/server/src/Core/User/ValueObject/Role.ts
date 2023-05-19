import { ValueObject } from '../../../Shared/src/ValueObject/ValueObject';

export class Role extends ValueObject {
    private role: string;

    public parse() {
        return this.role;
    }

    protected *getEqualityComponents(): IterableIterator<Object> {
        yield this.role;
    }
}