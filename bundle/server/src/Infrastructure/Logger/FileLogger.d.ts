import { ILoggerWriter } from './Logger';
export declare class FileLogger implements ILoggerWriter {
    private readonly fileHelper;
    private readonly logsPath;
    private createLogsFileName;
    write(msg: string, stack?: any): Promise<boolean | Error>;
}
