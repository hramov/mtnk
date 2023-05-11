export interface ILogger {
    debug: (msg: string, context?: string, opts?: any) => void;
    log: (msg: string, context?: string, opts?: any) => void;
    warn: (msg: string, context?: string, opts?: any) => void;
    error: (msg: string, context?: string, stack?: any, opts?: any) => void;
}

export const enum LoggerOutput {
    CONSOLE = 'console',
    FILE = 'file',
    PERSISTENT = 'persistent',
    NONE = 'none',
}


export interface IFileSystem {}

export interface ICryptoService{}

export interface IJwtService{}