"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryStorage = void 0;
class InMemoryStorage {
    constructor() {
        this.state = new Map();
    }
    set(key, value) {
        this.state.set(key, value);
    }
    get(key) {
        return this.state.get(key);
    }
}
exports.InMemoryStorage = InMemoryStorage;
//# sourceMappingURL=InMemory.storage.js.map