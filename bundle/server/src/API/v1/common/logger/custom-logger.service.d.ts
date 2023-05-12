/// <reference types="node" />
import { AsyncLocalStorage } from 'async_hooks';
import { ILogger } from "../../../../Core/ICore";
export declare class CustomLoggerService implements ILogger {
    private readonly asyncStorage;
    private readonly logger;
    constructor(asyncStorage: AsyncLocalStorage<Map<string, string>>);
    debug(msg: string, context?: string, opts?: any): void;
    log(msg: string, context?: string, opts?: any): any;
    warn(msg: string, context?: string, opts?: any): void;
    error(msg: string, context?: string, stack?: any, opts?: any): void;
}
