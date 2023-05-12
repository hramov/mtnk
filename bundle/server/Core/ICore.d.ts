export interface ILoggerOptions {
    method: string;
}
export interface ILogger {
    debug: (msg: string, context?: string, opts?: ILoggerOptions) => void;
    log: (msg: string, context?: string, opts?: ILoggerOptions) => void;
    warn: (msg: string, context?: string, opts?: ILoggerOptions) => void;
    error: (msg: string, context?: string, stack?: any, opts?: ILoggerOptions) => void;
}
export declare const enum LoggerOutput {
    CONSOLE = "console",
    FILE = "file",
    PERSISTENT = "persistent",
    NONE = "none"
}
export interface IFileSystem {
}
export interface ICryptoService {
}
export interface IJwtService {
}
