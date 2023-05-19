import {Role} from "./Role";
import { ValueObject } from '../../../Shared/src/ValueObject/ValueObject';

export class TokenData extends ValueObject {
    public userId: string;
    public username: string;
    public role: Role

    protected *getEqualityComponents(): IterableIterator<Object> {
        yield this.userId;
        yield this.username;
        yield this.role;
    }
}