export declare class InMemoryStorage {
    private state;
    set<T>(key: string, value: T): void;
    get(key: string): any;
}
