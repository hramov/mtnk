import { ILoggerWriter } from './Logger';
export declare class ConsoleLogger implements ILoggerWriter {
    write(msg: string, stack?: any): Promise<boolean | Error>;
}
