/// <reference types="node" />
import { FileHandle } from 'fs/promises';
import { IFileSystem } from "../../Core/ICore";
export declare class FileHelper implements IFileSystem {
    private readonly basePath;
    private readonly logsBasePath;
    constructor();
    checkDirs(dir?: string): Promise<void>;
    open(filename: string): Promise<FileHandle | Error>;
    read(filename: string): Promise<string | Error>;
    write(filename: string, data: string): Promise<void | Error>;
    append(filename: string, data: string): Promise<void | Error>;
}
