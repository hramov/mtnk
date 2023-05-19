import {Uuid} from "../../../Shared/src/ValueObject/Objects/Uuid";
import { ValueObject } from '../../../Shared/src/ValueObject/ValueObject';

export class Candidate extends ValueObject {
    public userId: string;
    public username: string;
    public plainPassword: string;
    public hashedPassword: string;
    public isRemember: boolean;

    protected *getEqualityComponents(): IterableIterator<Object> {
        yield this.userId;
        yield this.username;
        yield this.plainPassword;
        yield this.hashedPassword;
        yield this.isRemember;
    }
}