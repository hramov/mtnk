"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventBus = void 0;
const stream_1 = require("stream");
class EventBus extends stream_1.EventEmitter {
    constructor() {
        super();
    }
}
exports.EventBus = EventBus;
//# sourceMappingURL=EventBus.js.map