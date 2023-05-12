import { ValueObject } from '../ValueObject';
export declare class Uuid extends ValueObject {
    private readonly value;
    constructor();
    toString(): string;
    getNil(): any;
    isNil(): boolean;
    protected getEqualityComponents(): IterableIterator<Object>;
}
