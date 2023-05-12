import { ValueObject } from "../ValueObject";
export declare class Password extends ValueObject {
    private readonly password;
    constructor(password: string);
    protected getEqualityComponents(): IterableIterator<Object>;
    toString(): string;
}
