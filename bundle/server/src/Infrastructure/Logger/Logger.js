"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = exports.LogLevel = void 0;
const ConsoleLogger_1 = require("./ConsoleLogger");
const FileLogger_1 = require("./FileLogger");
var LogLevel;
(function (LogLevel) {
    LogLevel["DEBUG"] = "debug";
    LogLevel["INFO"] = "info";
    LogLevel["WARN"] = "warn";
    LogLevel["ERROR"] = "error";
})(LogLevel = exports.LogLevel || (exports.LogLevel = {}));
class Logger {
    constructor(context) {
        this.context = context;
        this.consoleLogger = new ConsoleLogger_1.ConsoleLogger();
        this.fileLogger = new FileLogger_1.FileLogger();
    }
    debug(msg, context, opts) {
        const message = this.createLogMessage('debug', msg, context, opts);
        const outputs = this.outputFactory(LogLevel.DEBUG);
        for (const output of outputs) {
            output.write(message);
        }
    }
    log(msg, context, opts) {
        const message = this.createLogMessage('info', msg, context, opts);
        const outputs = this.outputFactory(LogLevel.INFO);
        for (const output of outputs) {
            output.write(message);
        }
    }
    warn(msg, context, opts) {
        const message = this.createLogMessage('warn', msg, context, opts);
        const outputs = this.outputFactory(LogLevel.WARN);
        for (const output of outputs) {
            output.write(message);
        }
    }
    error(msg, context, stack, opts) {
        const message = this.createLogMessage('error', msg, context, opts);
        const outputs = this.outputFactory(LogLevel.ERROR);
        for (const output of outputs) {
            output.write(message);
        }
    }
    outputFactory(level) {
        return [this.consoleLogger];
    }
    createLogMessage(type, message, context, opts) {
        return JSON.stringify(Object.assign({ ts: new Date().toISOString(), type: type, context: context || this.context, message: message }, opts));
    }
}
exports.Logger = Logger;
//# sourceMappingURL=Logger.js.map