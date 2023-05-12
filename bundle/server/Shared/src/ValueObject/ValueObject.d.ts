export declare abstract class ValueObject {
    protected abstract getEqualityComponents(): IterableIterator<Object>;
    equals<T extends ValueObject>(obj: T): boolean;
    getHashCode(): string;
}
