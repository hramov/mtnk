import { ILogger } from "../../Core/ICore";
export interface ILoggerWriter {
    write(msg: string, stack?: any): Promise<boolean | Error>;
}
export declare enum LogLevel {
    DEBUG = "debug",
    INFO = "info",
    WARN = "warn",
    ERROR = "error"
}
export declare class Logger implements ILogger {
    private readonly context;
    private readonly consoleLogger;
    private readonly fileLogger;
    constructor(context: string);
    debug(msg: string, context?: string, opts?: any): void;
    log(msg: string, context?: string, opts?: any): void;
    warn(msg: string, context?: string, opts?: any): void;
    error(msg: string, context?: string, stack?: any, opts?: any): void;
    private outputFactory;
    private createLogMessage;
}
